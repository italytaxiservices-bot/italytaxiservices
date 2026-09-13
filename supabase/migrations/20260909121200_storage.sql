-- Private storage bucket for generated/uploaded business documents
-- (quotation/invoice/receipt PDFs kept for records, driver & vehicle
-- documents, etc). Not public — every read/write goes through RLS on
-- storage.objects, scoped to active staff only.

insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

create policy documents_bucket_select on storage.objects for select to authenticated
  using (bucket_id = 'documents' and public.current_user_active());

create policy documents_bucket_insert on storage.objects for insert to authenticated
  with check (
    bucket_id = 'documents'
    and public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','FINANCE']::public.user_role[])
  );

create policy documents_bucket_delete on storage.objects for delete to authenticated
  using (bucket_id = 'documents' and public.is_admin());
