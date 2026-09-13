"use client";

import { USER_ROLES, ROLE_LABELS, type UserRole } from "@/lib/auth/roles";
import { setUserRoleFromForm } from "@/lib/admin/actions/users";

export function RoleSelect({ userId, currentRole }: { userId: string; currentRole: UserRole }) {
  return (
    <form action={setUserRoleFromForm.bind(null, userId)}>
      <select
        name="role"
        defaultValue={currentRole}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="input-luxe py-1 text-xs"
      >
        {USER_ROLES.map((r) => (
          <option key={r} value={r}>
            {ROLE_LABELS[r]}
          </option>
        ))}
      </select>
    </form>
  );
}
