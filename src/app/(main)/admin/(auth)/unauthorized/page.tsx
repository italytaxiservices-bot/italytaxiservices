import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not authorized" };

export default function UnauthorizedPage() {
  return (
    <div className="text-center">
      <h1 className="font-display text-xl text-admin-ink mb-2">Not authorized</h1>
      <p className="text-sm text-admin-stone mb-6">Your role doesn&apos;t have access to that section.</p>
      <Link href="/admin" className="text-sm text-admin-gold hover:underline">
        Back to dashboard
      </Link>
    </div>
  );
}
