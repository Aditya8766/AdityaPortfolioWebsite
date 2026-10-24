create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null check (char_length(btrim(client_name)) between 2 and 80),
  company_role text not null check (char_length(btrim(company_role)) between 2 and 120),
  rating smallint not null check (rating between 1 and 5),
  message text not null check (char_length(btrim(message)) between 20 and 2000),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index testimonials_public_order
  on public.testimonials (created_at desc, id desc)
  where status = 'approved';

alter table public.testimonials enable row level security;
revoke all on public.testimonials from anon, authenticated;
grant select (id, client_name, company_role, rating, message, created_at)
  on public.testimonials to anon, authenticated;
grant all on public.testimonials to service_role;

create policy "Visitors can read approved reviews only"
  on public.testimonials for select to anon, authenticated
  using (status = 'approved');

create table public.review_submission_limits (
  ip_hash text not null,
  window_start timestamptz not null,
  request_count integer not null default 0,
  primary key (ip_hash, window_start)
);

alter table public.review_submission_limits enable row level security;
revoke all on public.review_submission_limits from anon, authenticated;
grant all on public.review_submission_limits to service_role;
create index review_submission_limits_expiry
  on public.review_submission_limits (window_start);

create or replace function public.consume_review_submission_limit(p_ip_hash text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_count integer;
  current_window timestamptz := date_trunc('hour', now());
begin
  delete from public.review_submission_limits
  where window_start < current_window - interval '24 hours';

  insert into public.review_submission_limits (ip_hash, window_start, request_count)
  values (p_ip_hash, current_window, 1)
  on conflict (ip_hash, window_start)
  do update set request_count = public.review_submission_limits.request_count + 1
  returning request_count into current_count;

  return current_count <= 5;
end;
$$;

revoke all on function public.consume_review_submission_limit(text) from public, anon, authenticated;
grant execute on function public.consume_review_submission_limit(text) to service_role;
