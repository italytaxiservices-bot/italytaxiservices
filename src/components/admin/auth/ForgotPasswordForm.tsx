"use client";

import { useActionState } from "react";
import { requestPasswordReset } from "@/lib/auth/actions";

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, undefined);

  if (state?.success) {
    return (
      <p className="text-sm text-admin-ink-soft">
        If that email has an admin account, we&apos;ve sent a password reset link to it. Check your inbox.
      </p>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-admin-ink-soft mb-1">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className="input-luxe" />
      </div>

      {state?.error ? (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-3 py-2">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-admin-navy text-admin-ivory text-sm font-semibold py-2.5 rounded-sm hover:bg-admin-navy-deep transition-colors disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send reset link"}
      </button>

      <div className="text-center pt-2">
        <a href="/admin/login" className="text-xs text-admin-stone hover:text-admin-gold">
          Back to sign in
        </a>
      </div>
    </form>
  );
}
