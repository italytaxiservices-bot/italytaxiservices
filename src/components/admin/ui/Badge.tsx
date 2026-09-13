const TONE_CLASSES: Record<string, string> = {
  neutral: "bg-admin-stone/10 text-admin-stone",
  info: "bg-blue-50 text-blue-700",
  warning: "bg-amber-50 text-amber-800",
  success: "bg-emerald-50 text-emerald-700",
  danger: "bg-red-50 text-red-700",
  gold: "bg-admin-gold-pale/40 text-admin-gold",
};

// Every status enum in the schema, mapped to a tone. Unlisted values fall
// back to "neutral" so a new/unmapped status never crashes the UI.
const STATUS_TONE: Record<string, keyof typeof TONE_CLASSES> = {
  // leads
  NEW: "info",
  CONTACTED: "info",
  QUOTED: "gold",
  NEGOTIATING: "gold",
  WON: "success",
  LOST: "danger",
  // quotations
  DRAFT: "neutral",
  SENT: "info",
  VIEWED: "gold",
  ACCEPTED: "success",
  REJECTED: "danger",
  EXPIRED: "danger",
  CONVERTED: "success",
  // bookings
  PENDING: "warning",
  CONFIRMED: "info",
  ASSIGNED: "gold",
  DRIVER_EN_ROUTE: "gold",
  PASSENGER_PICKED_UP: "gold",
  IN_PROGRESS: "gold",
  COMPLETED: "success",
  CANCELLED: "danger",
  NO_SHOW: "danger",
  // payment status
  UNPAID: "warning",
  PARTIALLY_PAID: "gold",
  PAID: "success",
  REFUNDED: "neutral",
  // invoices
  OVERDUE: "danger",
  VOID: "neutral",
  // vehicles
  ACTIVE: "success",
  MAINTENANCE: "warning",
  INACTIVE: "neutral",
  // drivers
  AVAILABLE: "success",
  ON_TRIP: "gold",
  OFF_DUTY: "neutral",
  // automation runs
  SUCCESS: "success",
  FAILURE: "danger",
  SKIPPED_DISABLED: "neutral",
  // expense / refund / discount / payout lifecycles
  SUBMITTED: "info",
  APPROVED: "success",
  PROCESSED: "success",
  AUTO_APPROVED: "success",
  // tasks
  TODO: "warning",
  // alerts
  OPEN: "warning",
  ACKNOWLEDGED: "info",
  RESOLVED: "success",
  SNOOZED: "neutral",
  // reconciliation
  UNMATCHED: "warning",
  MATCHED: "success",
  PARTIALLY_MATCHED: "gold",
  DISPUTED: "danger",
  // reviews / receivables
  CURRENT: "success",
  DUE_SOON: "gold",
  // customer segments
  VIP: "gold",
  HIGH_FREQUENCY: "success",
  CORPORATE: "info",
};

export function StatusBadge({ status }: { status: string }) {
  const tone = STATUS_TONE[status] ?? "neutral";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${TONE_CLASSES[tone]}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
