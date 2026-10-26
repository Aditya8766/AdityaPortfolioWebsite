-- Run once in the Supabase SQL Editor for project grikvmdrrqvyzunrjhsb.
begin;
create table if not exists public.portfolio_reviews (
  id uuid primary key default gen_random_uuid(),
  client_name text not null check (char_length(btrim(client_name)) between 2 and 80),
  company_role text not null check (char_length(btrim(company_role)) between 2 and 120),
  message text not null check (char_length(btrim(message)) between 20 and 2000),
  rating integer not null check (rating between 1 and 5),
  created_at timestamptz not null default now()
);
create index if not exists portfolio_reviews_newest
  on public.portfolio_reviews (created_at desc, id desc);
alter table public.portfolio_reviews enable row level security;
revoke all on public.portfolio_reviews from public, anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select on public.portfolio_reviews to anon, authenticated;
-- Visitors cannot supply IDs/timestamps, or edit/delete other people's reviews.
grant insert (client_name, company_role, message, rating)
  on public.portfolio_reviews to anon, authenticated;
drop policy if exists "Visitors can read reviews" on public.portfolio_reviews;
create policy "Visitors can read reviews" on public.portfolio_reviews
  for select to anon, authenticated using (true);
drop policy if exists "Visitors can submit reviews" on public.portfolio_reviews;
create policy "Visitors can submit reviews" on public.portfolio_reviews
  for insert to anon, authenticated with check (true);
commit;
