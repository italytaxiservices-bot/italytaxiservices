-- Advisor: 3 tables got overlapping permissive policies for the same
-- action from this batch. Same fix pattern as Task 2 — split `for all`
-- into insert/update/delete so select has exactly one policy, and merge
-- the two expenses UPDATE policies into one combined USING clause.

drop policy if exists role_permissions_write on public.role_permissions;
create policy role_permissions_insert on public.role_permissions for insert to authenticated
  with check (public.current_user_role() = 'SUPER_ADMIN');
create policy role_permissions_update on public.role_permissions for update to authenticated
  using (public.current_user_role() = 'SUPER_ADMIN') with check (public.current_user_role() = 'SUPER_ADMIN');
create policy role_permissions_delete on public.role_permissions for delete to authenticated
  using (public.current_user_role() = 'SUPER_ADMIN');

drop policy if exists customer_segment_overrides_write on public.customer_segment_overrides;
create policy customer_segment_overrides_insert on public.customer_segment_overrides for insert to authenticated
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));
create policy customer_segment_overrides_update on public.customer_segment_overrides for update to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]))
  with check (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));
create policy customer_segment_overrides_delete on public.customer_segment_overrides for delete to authenticated
  using (public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS']::public.user_role[]));

drop policy if exists expenses_update on public.expenses;
drop policy if exists expenses_submit on public.expenses;
create policy expenses_update on public.expenses for update to authenticated
  using (
    public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[])
    or (status = 'DRAFT' and public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]))
  )
  with check (
    public.is_staff_role(array['SUPER_ADMIN','ADMIN','FINANCE']::public.user_role[])
    or (status in ('DRAFT','SUBMITTED') and public.is_staff_role(array['SUPER_ADMIN','ADMIN','OPERATIONS','DISPATCHER']::public.user_role[]))
  );
