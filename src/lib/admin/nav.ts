import {
  LayoutDashboard,
  Target,
  Users,
  FileText,
  CalendarClock,
  Calendar,
  Radio,
  UserRound,
  Car,
  Truck,
  Receipt,
  Wallet,
  FileCheck2,
  ReceiptText,
  Bell,
  FolderOpen,
  BarChart3,
  Settings,
  Zap,
  MessageSquare,
  Star,
  TrendingUp,
  Activity,
  Landmark,
  Banknote,
  Briefcase,
  ListChecks,
  AlertTriangle,
  CheckSquare,
  ShieldCheck,
  LineChart,
  Download,
  type LucideIcon,
} from "lucide-react";
import type { UserRole } from "@/lib/auth/roles";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles?: UserRole[]; // omitted = visible to every active role
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Target, roles: ["SUPER_ADMIN", "ADMIN", "OPERATIONS", "FINANCE", "VIEWER"] },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/quotations", label: "Quotations", icon: FileText, roles: ["SUPER_ADMIN", "ADMIN", "OPERATIONS", "FINANCE", "VIEWER"] },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarClock },
  { href: "/admin/calendar", label: "Calendar", icon: Calendar },
  { href: "/admin/dispatch", label: "Dispatch", icon: Radio, roles: ["SUPER_ADMIN", "ADMIN", "OPERATIONS", "DISPATCHER", "VIEWER"] },
  { href: "/admin/drivers", label: "Drivers", icon: UserRound, roles: ["SUPER_ADMIN", "ADMIN", "OPERATIONS", "DISPATCHER", "VIEWER"] },
  { href: "/admin/vehicles", label: "Vehicles", icon: Car, roles: ["SUPER_ADMIN", "ADMIN", "OPERATIONS", "DISPATCHER", "VIEWER"] },
  { href: "/admin/fleet", label: "Fleet", icon: Truck, roles: ["SUPER_ADMIN", "ADMIN", "OPERATIONS", "DISPATCHER"] },
  { href: "/admin/driver-payouts", label: "Driver payouts", icon: Banknote, roles: ["SUPER_ADMIN", "ADMIN", "FINANCE"] },
  { href: "/admin/invoices", label: "Invoices", icon: Receipt, roles: ["SUPER_ADMIN", "ADMIN", "FINANCE", "OPERATIONS", "VIEWER"] },
  { href: "/admin/payments", label: "Payments", icon: Wallet, roles: ["SUPER_ADMIN", "ADMIN", "FINANCE", "OPERATIONS", "VIEWER"] },
  { href: "/admin/receipts", label: "Receipts", icon: FileCheck2, roles: ["SUPER_ADMIN", "ADMIN", "FINANCE", "OPERATIONS", "VIEWER"] },
  { href: "/admin/expenses", label: "Expenses", icon: ReceiptText, roles: ["SUPER_ADMIN", "ADMIN", "FINANCE", "OPERATIONS", "VIEWER"] },
  { href: "/admin/finance", label: "Finance", icon: Landmark, roles: ["SUPER_ADMIN", "ADMIN", "FINANCE"] },
  { href: "/admin/services", label: "Services", icon: Briefcase, roles: ["SUPER_ADMIN", "ADMIN", "OPERATIONS"] },
  { href: "/admin/follow-ups", label: "Follow-ups", icon: Bell },
  { href: "/admin/tasks", label: "Tasks", icon: ListChecks },
  { href: "/admin/alerts", label: "Alerts", icon: AlertTriangle, roles: ["SUPER_ADMIN", "ADMIN", "OPERATIONS", "DISPATCHER", "FINANCE"] },
  { href: "/admin/approvals", label: "Approvals", icon: CheckSquare, roles: ["SUPER_ADMIN", "ADMIN", "FINANCE"] },
  { href: "/admin/communications", label: "Communications", icon: MessageSquare, roles: ["SUPER_ADMIN", "ADMIN", "OPERATIONS"] },
  { href: "/admin/reviews", label: "Reviews", icon: Star, roles: ["SUPER_ADMIN", "ADMIN", "OPERATIONS"] },
  { href: "/admin/documents", label: "Documents", icon: FolderOpen },
  { href: "/admin/reports", label: "Reports", icon: BarChart3, roles: ["SUPER_ADMIN", "ADMIN", "FINANCE", "OPERATIONS", "VIEWER"] },
  { href: "/admin/exports", label: "Export center", icon: Download, roles: ["SUPER_ADMIN", "ADMIN", "FINANCE"] },
  { href: "/admin/insights", label: "Insights", icon: TrendingUp, roles: ["SUPER_ADMIN", "ADMIN", "FINANCE", "OPERATIONS"] },
  { href: "/admin/executive", label: "Executive", icon: LineChart, roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/admin/data-quality", label: "Data quality", icon: ShieldCheck, roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/admin/automations", label: "Automations", icon: Zap, roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/admin/system", label: "System health", icon: Activity, roles: ["SUPER_ADMIN", "ADMIN"] },
  { href: "/admin/settings", label: "Settings", icon: Settings, roles: ["SUPER_ADMIN", "ADMIN"] },
];

export function navItemsForRole(role: UserRole): NavItem[] {
  return NAV_ITEMS.filter((item) => !item.roles || item.roles.includes(role));
}
