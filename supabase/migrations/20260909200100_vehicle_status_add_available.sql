-- Split into its own migration: ALTER TYPE ... ADD VALUE cannot be used in
-- the same transaction that also references the new value.
alter type public.vehicle_status add value if not exists 'AVAILABLE';
