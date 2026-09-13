"use client";

import { useActionState } from "react";
import { login } from "@/lib/auth/actions";

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="space-y-4">
      {next ? <input type="hidden" name="next" value={next} /> : null}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-admin-ink-soft mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="input-luxe"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-admin-ink-soft mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="input-luxe"
        />
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
        {pending ? "Signing in…" : "Sign in"}
      </button>

      <div className="text-center pt-2">
        <a href="/admin/forgot-password" className="text-xs text-admin-stone hover:text-admin-gold">
          Forgot your password?
        </a>
      </div>
    </form>
  );
}
