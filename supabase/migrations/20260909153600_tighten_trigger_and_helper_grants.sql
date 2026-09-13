-- Advisor caught: revoking EXECUTE from PUBLIC alone doesn't remove grants
-- Supabase's default privileges already made directly to anon/authenticated
-- at function-creation time — those need an explicit revoke too. Also
-- tightening two internal-only helpers that never need a direct caller.

revoke execute on function public.guard_booking_terminal_state() from anon, authenticated;
revoke execute on function public.stamp_booking_lifecycle_timestamps() from anon, authenticated;

-- Called only from inside other SECURITY DEFINER functions (which execute
-- as the definer/owner regardless of the original caller's grants) — no
-- legitimate direct caller exists for either.
revoke execute on function public.automation_is_enabled(text) from authenticated;
revoke execute on function public.log_automation_run(text, text, int, text, text, jsonb) from authenticated;
