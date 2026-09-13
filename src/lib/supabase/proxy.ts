import "server-only";

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/lib/supabase/types";
import { supabasePublishableKey, supabaseUrl } from "@/lib/supabase/env";

// Accessible whether signed in or not. /admin/reset-password and
// /admin/auth/confirm are visited *as part of* signing in (a Supabase
// recovery session), so they must never bounce an authenticated visitor away;
// pending-activation/unauthorized are themselves the landing spot for an
// authenticated user who doesn't (yet) qualify for the dashboard.
const ALWAYS_PUBLIC_ROUTES = [
  "/admin/reset-password",
  "/admin/auth/confirm",
  "/admin/pending-activation",
  "/admin/unauthorized",
  "/my-auth/confirm",
];

// Customer-portal pages that require a signed-in customer session — a
// separate identity from /admin's staff session (see lib/auth/customer-dal.ts).
const CUSTOMER_PROTECTED_ROUTES = ["/my-bookings", "/my-invoices", "/my-profile"];

/**
 * Optimistic auth check + session-cookie refresh, run on every request to
 * /admin/*. This is NOT the security boundary — it only prevents obviously
 * unauthenticated requests from reaching admin pages and keeps the Supabase
 * session cookie fresh. Every server action / route handler / RLS policy
 * underneath still performs its own authorization check against the database.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(supabaseUrl(), supabasePublishableKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        supabaseResponse = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          supabaseResponse.cookies.set(name, value, options);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isAdminGuestOnly = pathname.startsWith("/admin/login") || pathname.startsWith("/admin/forgot-password");
  const isCustomerGuestOnly = pathname.startsWith("/my-login");
  const isAlwaysPublic = ALWAYS_PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  const isCustomerProtected = CUSTOMER_PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  if (!user && pathname.startsWith("/admin") && !isAdminGuestOnly && !isAlwaysPublic) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!user && isCustomerProtected) {
    return NextResponse.redirect(new URL("/my-login", request.url));
  }

  // A signed-in user's *kind* of session determines where "already signed
  // in" bounces them — staff and customers are different identities
  // (profiles vs customer_accounts), so a customer hitting /admin/login
  // must not be redirected to /admin (they have no profile there, which
  // would just bounce them straight back and loop), and likewise a staff
  // member hitting /my-login must not be sent to /my-bookings.
  if (user && (isAdminGuestOnly || isCustomerGuestOnly)) {
    if (isAdminGuestOnly) {
      const { data: profile } = await supabase.from("profiles").select("id").eq("id", user.id).maybeSingle();
      if (profile) return NextResponse.redirect(new URL("/admin", request.url));
    } else {
      const { data: account } = await supabase.from("customer_accounts").select("id").eq("id", user.id).maybeSingle();
      if (account) return NextResponse.redirect(new URL("/my-bookings", request.url));
    }
  }

  return supabaseResponse;
}
