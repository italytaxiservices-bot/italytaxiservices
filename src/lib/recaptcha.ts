const DEFAULT_MIN_SCORE = 0.5;

interface AssessmentResponse {
  tokenProperties?: {
    valid: boolean;
    action?: string;
    invalidReason?: string;
  };
  riskAnalysis?: {
    score: number;
    reasons?: string[];
  };
  error?: { message?: string };
}

/**
 * Verifies a reCAPTCHA Enterprise token server-side via the
 * projects.assessments.create REST API (plain API key auth — no service
 * account/client library needed, which keeps this simple to run on
 * Vercel). Returns true when:
 * - RECAPTCHA_PROJECT_ID or RECAPTCHA_API_KEY isn't configured (feature not
 *   activated — lets the booking form keep working unmodified).
 * - Or Google confirms the token is valid, the action matches what the
 *   client requested, and the risk score clears the configured/default
 *   threshold.
 *
 * Never trust a token's presence alone — always call this before accepting
 * the submission it's attached to.
 */
export async function verifyRecaptcha(
  token: string | undefined,
  expectedAction: string,
  context?: { userAgent?: string; userIpAddress?: string }
): Promise<boolean> {
  const projectId = process.env.RECAPTCHA_PROJECT_ID;
  const apiKey = process.env.RECAPTCHA_API_KEY;
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!projectId || !apiKey || !siteKey) return true;

  if (!token) {
    console.error("reCAPTCHA verification failed: no token provided");
    return false;
  }

  const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`;

  let result: AssessmentResponse;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: {
          token,
          siteKey,
          expectedAction,
          userAgent: context?.userAgent,
          userIpAddress: context?.userIpAddress,
        },
      }),
    });
    result = await res.json();
  } catch (err) {
    console.error("reCAPTCHA assessment request failed", err);
    return false;
  }

  if (result.error) {
    console.error("reCAPTCHA assessment API error", result.error.message);
    return false;
  }
  if (!result.tokenProperties?.valid) {
    console.error("reCAPTCHA token invalid", result.tokenProperties?.invalidReason);
    return false;
  }
  if (result.tokenProperties.action !== expectedAction) {
    console.error(`reCAPTCHA action mismatch: expected "${expectedAction}", got "${result.tokenProperties.action}"`);
    return false;
  }

  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE) || DEFAULT_MIN_SCORE;
  const score = result.riskAnalysis?.score;
  if (typeof score === "number" && score < minScore) {
    console.error(`reCAPTCHA score too low: ${score} < ${minScore}`, result.riskAnalysis?.reasons);
    return false;
  }

  return true;
}
