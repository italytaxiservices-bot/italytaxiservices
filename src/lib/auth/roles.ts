export const USER_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "OPERATIONS",
  "FINANCE",
  "DISPATCHER",
  "VIEWER",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  OPERATIONS: "Operations",
  FINANCE: "Finance",
  DISPATCHER: "Dispatcher",
  VIEWER: "Viewer",
};

// Mirrors the role groups baked into RLS policies
// (supabase/migrations/20260909120900_rls.sql). Used for UI gating and as a
// first-line server action check — the database is the real boundary.
export const MANAGE_CRM: UserRole[] = ["SUPER_ADMIN", "ADMIN", "OPERATIONS"];
export const MANAGE_OPS: UserRole[] = ["SUPER_ADMIN", "ADMIN", "OPERATIONS", "DISPATCHER"];
export const MANAGE_FINANCE: UserRole[] = ["SUPER_ADMIN", "ADMIN", "FINANCE"];
export const VIEW_FINANCE: UserRole[] = ["SUPER_ADMIN", "ADMIN", "FINANCE", "OPERATIONS", "VIEWER"];
export const ADMIN_ONLY: UserRole[] = ["SUPER_ADMIN", "ADMIN"];
export const ALL_ROLES: UserRole[] = [...USER_ROLES];

export function canManageCrm(role: UserRole) {
  return MANAGE_CRM.includes(role);
}
export function canManageOps(role: UserRole) {
  return MANAGE_OPS.includes(role);
}
export function canManageFinance(role: UserRole) {
  return MANAGE_FINANCE.includes(role);
}
export function canViewFinance(role: UserRole) {
  return VIEW_FINANCE.includes(role);
}
export function isAdminRole(role: UserRole) {
  return ADMIN_ONLY.includes(role);
}
