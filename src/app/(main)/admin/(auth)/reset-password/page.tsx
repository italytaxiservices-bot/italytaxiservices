import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/admin/auth/ResetPasswordForm";

export const metadata: Metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <div>
      <h1 className="font-display text-xl text-admin-ink mb-2">Choose a new password</h1>
      <p className="text-sm text-admin-stone mb-6">Must be at least 8 characters.</p>
      <ResetPasswordForm />
    </div>
  );
}
