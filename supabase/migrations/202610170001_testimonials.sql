create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null check (char_length(btrim(client_name)) between 2 and 80),
  company_role text not null check (char_length(btrim(company_role)) between 2 and 120),
  rating smallint not null check (rating between 1 and 5),
  message text not null check (char_length(btrim(message)) between 20 and 2000),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index testimonials_public_order on public.testimonials (created_at desc, id desc) where status = 'approved';
alter table public.testimonials enable row level security;
revoke all on public.testimonials from anon, authenticated;
grant select on public.testimonials to anon, authenticated;
grant all on public.testimonials to service_role;
create policy "Visitors can read approved reviews only"
  on public.testimonials for select to anon, authenticated
  using (status = 'approved');
-- No visitor insert/update/delete policies. Only the Edge Function writes;
-- moderation is performed by the owner in Supabase Dashboard.
