-- Found during the Task 2 end-to-end idempotency test: re-confirming a
-- booking that already has an invoice correctly created zero duplicate
-- invoices, but the automation run was never logged at all in that case
-- (the log_automation_run call sat inside the "a new invoice was created"
-- branch only) — so /admin/automations couldn't show "ran, no-op" attempts,
-- only "ran, created". Logging both outcomes now.
create or replace function public.create_invoice_for_confirmed_booking()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_auto_invoice boolean;
  v_due_days int := 7;
  v_invoice_id uuid;
begin
  if new.status = 'CONFIRMED' and (tg_op = 'INSERT' or old.status is distinct from new.status) then
    if not public.automation_is_enabled('auto_invoice_on_confirm') then
      perform public.log_automation_run('auto_invoice_on_confirm', 'SKIPPED_DISABLED', 0, null, 'TRIGGER', jsonb_build_object('booking_id', new.id));
      return new;
    end if;

    select coalesce(auto_generate_invoice_on_confirm, true) into v_auto_invoice
      from public.company_settings limit 1;

    if coalesce(v_auto_invoice, true) then
      insert into public.invoices (
        booking_id, customer_id, subtotal, discount, tax_amount, total,
        currency, due_date, status, created_by
      )
      values (
        new.id, new.customer_id, new.price, new.discount, new.tax_amount, new.total,
        new.currency, current_date + v_due_days, 'DRAFT', new.created_by
      )
      on conflict (booking_id) where booking_id is not null do nothing
      returning id into v_invoice_id;

      if v_invoice_id is not null then
        insert into public.invoice_items (invoice_id, description, quantity, unit_price, amount, sort_order)
        values (v_invoice_id, 'Trip: ' || new.pickup || ' → ' || new.dropoff || ' (' || new.booking_reference || ')', 1, new.price, new.price, 0);
        perform public.log_automation_run('auto_invoice_on_confirm', 'SUCCESS', 1, null, 'TRIGGER', jsonb_build_object('booking_id', new.id, 'invoice_id', v_invoice_id));
      else
        perform public.log_automation_run('auto_invoice_on_confirm', 'SUCCESS', 0, null, 'TRIGGER', jsonb_build_object('booking_id', new.id, 'note', 'invoice already existed'));
      end if;
    end if;
  end if;
  return new;
end;
$$;
