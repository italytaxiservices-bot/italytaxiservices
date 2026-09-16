import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/admin/auth/ForgotPasswordForm";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="font-display text-xl text-admin-ink mb-2">Reset your password</h1>
      <p className="text-sm text-admin-stone mb-6">Enter your admin email and we&apos;ll send you a reset link.</p>
      <ForgotPasswordForm />
    </div>
  );
}
