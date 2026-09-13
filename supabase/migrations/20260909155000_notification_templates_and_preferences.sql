-- Task 2: template builder (DB-editable email templates, falling back to the
-- code-defined defaults when no override exists) + a minimal notification
-- preference a customer can control (marketing-adjacent sends only —
-- transactional emails like booking confirmations/invoices/receipts are
-- never gated by this, they're business records, not marketing).

create table public.notification_templates (
  key text primary key,
  label text not null,
  subject_template text not null,
  body_template text not null,
  is_customized boolean not null default false,
  updated_by uuid references public.profiles (id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.notification_templates enable row level security;

create policy notification_templates_select on public.notification_templates for select to authenticated
  using (public.current_user_active());
create policy notification_templates_update on public.notification_templates for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

create trigger set_updated_at before update on public.notification_templates
  for each row execute function public.set_updated_at();

insert into public.notification_templates (key, label, subject_template, body_template) values
  ('quotation_sent', 'Quotation sent', 'Your quotation {{quotation_number}} from ' || (select company_name from public.company_settings limit 1),
    E'Dear {{customer_name}},\n\nThank you for your interest — please find your quotation {{quotation_number}} for {{pickup}} → {{dropoff}} on {{date}} at {{time}}.\n\nTotal: {{total}}. This quotation is valid until {{valid_until}}.\n\nReply to this email or contact us to confirm.'),
  ('quotation_reminder', 'Quotation follow-up', 'Following up on your quotation',
    E'Dear {{customer_name}},\n\nJust checking in about quotation {{quotation_number}} (total {{total}}) — let us know if you''d like to go ahead or have any questions.'),
  ('booking_confirmation', 'Booking confirmed', 'Booking confirmed — {{booking_reference}}',
    E'Dear {{customer_name}},\n\nYour booking {{booking_reference}} is confirmed.\n\nPickup: {{pickup}}\nDrop-off: {{dropoff}}\nDate: {{date}} at {{time}}\nVehicle: {{vehicle}}\n\nTotal: {{total}}.'),
  ('driver_assignment', 'Driver assigned', 'Your driver is confirmed — {{booking_reference}}',
    E'Dear {{customer_name}},\n\nYour driver for booking {{booking_reference}} has been assigned.\n\nDriver: {{driver_name}}\nVehicle: {{vehicle}}'),
  ('invoice_created', 'Invoice created', 'Invoice {{invoice_number}}',
    E'Dear {{customer_name}},\n\nPlease find invoice {{invoice_number}} for {{total}}, due {{due_date}}.'),
  ('payment_confirmation', 'Payment received', 'Payment received — {{invoice_number}}',
    E'Dear {{customer_name}},\n\nWe''ve received your payment of {{amount_paid}} against invoice {{invoice_number}}.\n\nRemaining balance: {{balance_due}}.\n\nReceipt {{receipt_number}} is attached to your account — contact us if you''d like a copy.'),
  ('receipt', 'Receipt', 'Receipt {{receipt_number}}',
    E'Dear {{customer_name}},\n\nReceipt {{receipt_number}} for {{amount_paid}} paid on {{date}}.'),
  ('upcoming_trip_reminder', 'Upcoming trip reminder', 'Reminder: your trip on {{date}}',
    E'Dear {{customer_name}},\n\nA reminder that your trip {{booking_reference}} is coming up on {{date}} at {{time}}.\n\nPickup: {{pickup}}\nDrop-off: {{dropoff}}'),
  ('trip_completed', 'Trip completed', 'Thank you for travelling with us',
    E'Dear {{customer_name}},\n\nThank you for choosing us for your trip {{booking_reference}}. We hope it was a great experience.'),
  ('review_request', 'Review request', 'How was your trip?',
    E'Dear {{customer_name}},\n\nWe''d love to hear your feedback on trip {{booking_reference}} — it helps us improve.'),
  ('payment_overdue', 'Payment overdue', 'Payment overdue — {{invoice_number}}',
    E'Dear {{customer_name}},\n\nInvoice {{invoice_number}} for {{balance_due}} was due on {{due_date}} and remains unpaid. Please arrange payment at your earliest convenience.')
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- Notification preferences (marketing-adjacent only)
-- ---------------------------------------------------------------------------
alter table public.customers add column if not exists opt_out_marketing boolean not null default false;

create or replace function public.update_my_notification_preferences(p_opt_out_marketing boolean)
returns void
language plpgsql security definer set search_path = public
as $$
begin
  if public.current_customer_id() is null then
    raise exception 'No linked customer account.';
  end if;
  update public.customers set opt_out_marketing = p_opt_out_marketing where id = public.current_customer_id();
end;
$$;

revoke execute on function public.update_my_notification_preferences(boolean) from public, anon;
grant execute on function public.update_my_notification_preferences(boolean) to authenticated;

-- get_my_customer_profile needs to surface the current preference too; the
-- return row type is changing (new column) so it must be dropped first.
drop function if exists public.get_my_customer_profile();

create function public.get_my_customer_profile()
returns table (id uuid, full_name text, email text, phone text, whatsapp text, country text, billing_address text, opt_out_marketing boolean)
language sql stable security definer set search_path = public
as $$
  select c.id, c.full_name, c.email, c.phone, c.whatsapp, c.country, c.billing_address, c.opt_out_marketing
  from public.customers c
  where c.id = public.current_customer_id() and public.current_customer_id() is not null;
$$;

revoke execute on function public.get_my_customer_profile() from public, anon;
grant execute on function public.get_my_customer_profile() to authenticated;
