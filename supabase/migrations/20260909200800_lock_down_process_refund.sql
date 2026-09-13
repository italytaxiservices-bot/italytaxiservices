revoke execute on function public.process_refund() from public, anon, authenticated;
grant execute on function public.process_refund() to service_role;
