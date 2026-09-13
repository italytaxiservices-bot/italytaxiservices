-- Task 2: proper multi-bucket storage usage. `documents` stays private
-- (driver/vehicle paperwork, generated PDFs kept for records — staff only).
-- A second, public-read bucket is for genuinely public marketing assets
-- (vehicle photos, company logo) that the public site and customer portal
-- render directly — those never needed RLS-gated access in the first place,
-- and lumping them into `documents` would have meant either exposing
-- private paperwork or building a signed-URL relay for public images.
insert into storage.buckets (id, name, public)
values ('public-assets', 'public-assets', true)
on conflict (id) do nothing;

create policy public_assets_bucket_select on storage.objects for select to public
  using (bucket_id = 'public-assets');

create policy public_assets_bucket_insert on storage.objects for insert to authenticated
  with check (
    bucket_id = 'public-assets'
    and public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[])
  );

create policy public_assets_bucket_update on storage.objects for update to authenticated
  using (bucket_id = 'public-assets' and public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]))
  with check (bucket_id = 'public-assets' and public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));

create policy public_assets_bucket_delete on storage.objects for delete to authenticated
  using (bucket_id = 'public-assets' and public.is_admin());
