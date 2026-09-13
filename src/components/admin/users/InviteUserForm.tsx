"use client";

import { useActionState } from "react";
import { USER_ROLES, ROLE_LABELS } from "@/lib/auth/roles";
import { inviteUser } from "@/lib/admin/actions/users";

export function InviteUserForm() {
  const [state, formAction, pending] = useActionState(inviteUser, undefined);

  return (
    <form action={formAction} className="p-4 space-y-3">
      <div>
        <label className="block text-xs text-admin-stone mb-1">Full name</label>
        <input name="full_name" required className="input-luxe" />
      </div>
      <div>
        <label className="block text-xs text-admin-stone mb-1">Email</label>
        <input name="email" type="email" required className="input-luxe" />
      </div>
      <div>
        <label className="block text-xs text-admin-stone mb-1">Role</label>
        <select name="role" className="input-luxe" defaultValue="VIEWER">
          {USER_ROLES.map((r) => (
            <option key={r} value={r}>
              {ROLE_LABELS[r]}
            </option>
          ))}
        </select>
      </div>

      {state?.error ? (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-3 py-2">
          {state.error}
        </p>
      ) : null}
      {state?.success ? <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-sm px-3 py-2">Invite sent.</p> : null}

      <button type="submit" disabled={pending} className="w-full text-sm bg-admin-navy text-admin-ivory px-3 py-2 rounded-sm hover:bg-admin-navy-deep disabled:opacity-60">
        {pending ? "Sending…" : "Send invite"}
      </button>
      <p className="text-xs text-admin-stone">Sends a Supabase Auth email invite so they can set their own password.</p>
    </form>
  );
}
