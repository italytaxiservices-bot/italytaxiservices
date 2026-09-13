-- Seed the singleton company_settings row and the document number counters.
-- Idempotent: safe to re-run.

insert into public.company_settings (company_name, email, currency_default)
select 'Italy Limo Service', 'info@italylimoservice.com', 'EUR'
where not exists (select 1 from public.company_settings);

insert into public.document_sequences (doc_type, next_number)
values
  ('lead', 1),
  ('quotation', 1),
  ('booking', 1),
  ('invoice', 1),
  ('receipt', 1)
on conflict (doc_type) do nothing;
