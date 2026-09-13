-- Role-aware helpers. These reference tables created in earlier migrations,
-- so they must run after 20260909120200_core_tables.sql and
-- 20260909120600_crm_ops.sql.

-- Resolves the calling user's role, bypassing RLS (security definer) so
-- policies on profiles itself don't recurse.
create or replace function public.current_user_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.current_user_active()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select active from public.profiles where id = auth.uid()), false);
$$;

-- True when the caller is active and holds one of the given roles.
create or replace function public.is_staff_role(roles public.user_role[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_active()
    and public.current_user_role() = any(roles);
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_active()
    and public.current_user_role() in ('SUPER_ADMIN', 'ADMIN');
$$;

-- Records an audit trail entry. SECURITY DEFINER so this is the sole write
-- path into activity_logs (no direct INSERT policy is granted), guaranteeing
-- actor_id always matches the authenticated caller.
create or replace function public.log_activity(
  p_action text,
  p_entity_type text,
  p_entity_id uuid,
  p_metadata jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  insert into public.activity_logs (actor_id, action, entity_type, entity_id, metadata)
  values (auth.uid(), p_action, p_entity_type, p_entity_id, p_metadata)
  returning id into v_id;
  return v_id;
end;
$$;

-- Atomically issues the next formatted document number for a series
-- (bookings, quotations, invoices, receipts, leads), e.g. ILS-2026-000123.
-- Prefixes are read from company_settings so Settings stays the single
-- source of truth for them.
create or replace function public.next_document_number(p_doc_type text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_prefix text;
  v_number int;
  v_year text := to_char(now(), 'YYYY');
begin
  select case p_doc_type
    when 'lead' then lead_prefix
    when 'quotation' then quotation_prefix
    when 'booking' then booking_prefix
    when 'invoice' then invoice_prefix
    when 'receipt' then receipt_prefix
    else null
  end into v_prefix
  from public.company_settings
  limit 1;

  if v_prefix is null then
    raise exception 'Unknown document sequence or missing company_settings row: %', p_doc_type;
  end if;

  update public.document_sequences
    set next_number = next_number + 1
    where doc_type = p_doc_type
    returning next_number - 1 into v_number;

  if not found then
    raise exception 'Unknown document sequence: %', p_doc_type;
  end if;

  return v_prefix || '-' || v_year || '-' || lpad(v_number::text, 6, '0');
end;
$$;
