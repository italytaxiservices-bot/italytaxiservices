import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/auth/LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

  return (
    <div>
      <h1 className="font-display text-xl text-admin-ink mb-6">Sign in</h1>
      {error === "invalid-reset-link" ? (
        <p className="mb-4 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-sm px-3 py-2">
          That link has expired or was already used. Request a new one below.
        </p>
      ) : null}
      <LoginForm next={next} />
    </div>
  );
}
