-- Cosmetic follow-up to 20260909170000_configurable_follow_up_rules.sql —
-- the seed descriptions for these 3 automations still said "3 days" / "1
-- day" as if hardcoded; now that the delay is admin-configurable, the
-- description shouldn't bake in a specific number that can drift from the
-- real configured value.
update public.automation_definitions set description = 'Creates a follow-up task after a quotation is sent — delay configurable below.' where key = 'quotation_follow_up';
update public.automation_definitions set description = 'Creates a follow-up task after a booking is marked COMPLETED — delay configurable below.' where key = 'post_trip_follow_up';
update public.automation_definitions set description = 'Daily cron: opens a follow-up task for trips happening soon — lookahead configurable below.' where key = 'upcoming_trip_reminders';
