import type { Metadata } from "next";
import { getCurrentProfile } from "@/lib/auth/dal";
import { logout } from "@/lib/auth/actions";

export const metadata: Metadata = { title: "Pending activation" };

export default async function PendingActivationPage() {
  const profile = await getCurrentProfile();

  return (
    <div className="text-center">
      <h1 className="font-display text-xl text-admin-ink mb-2">Account pending activation</h1>
      <p className="text-sm text-admin-stone mb-6">
        {profile
          ? `Your account (${profile.email}) has been created but a Super Admin hasn't activated it yet. Ask them to assign you a role in Settings → Users.`
          : "Your account hasn't been activated yet."}
      </p>
      <form action={logout}>
        <button type="submit" className="text-sm text-admin-gold hover:underline">
          Sign out
        </button>
      </form>
    </div>
  );
}
