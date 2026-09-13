/** Only the fields that actually differ between before/after — noisy
 * columns like updated_at are excluded since they change on every save
 * regardless. Shared between /admin/activity and any per-entity change
 * history view (e.g. a booking's own change log). */
export function changedFields(before: unknown, after: unknown): { field: string; from: unknown; to: unknown }[] {
  if (!before || !after || typeof before !== "object" || typeof after !== "object") return [];
  const b = before as Record<string, unknown>;
  const a = after as Record<string, unknown>;
  const skip = new Set(["updated_at", "created_at"]);
  const fields = new Set([...Object.keys(b), ...Object.keys(a)]);
  const diffs: { field: string; from: unknown; to: unknown }[] = [];
  for (const field of fields) {
    if (skip.has(field)) continue;
    if (JSON.stringify(b[field]) !== JSON.stringify(a[field])) diffs.push({ field, from: b[field], to: a[field] });
  }
  return diffs;
}

export function formatDiffValue(v: unknown): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}
