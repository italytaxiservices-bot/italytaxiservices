-- Only moves current_mileage forward — a maintenance record logged with an
-- earlier/lower mileage (e.g. backfilling history) must never regress the
-- vehicle's current reading.
create or replace function public.bump_vehicle_mileage(p_vehicle_id uuid, p_mileage int)
returns void
language sql
security definer
set search_path = public
as $$
  update public.vehicles set current_mileage = p_mileage
  where id = p_vehicle_id and (current_mileage is null or current_mileage < p_mileage);
$$;

revoke execute on function public.bump_vehicle_mileage(uuid, int) from public, anon;
grant execute on function public.bump_vehicle_mileage(uuid, int) to authenticated;
