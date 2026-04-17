-- Supabase SQL Schema for Articles CMS
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- 1. Create the articles table
create table if not exists articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  cover_url text,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Enable Row Level Security
alter table articles enable row level security;

-- 3. Public can read published articles
create policy "Public can read published articles"
  on articles for select
  using (published = true);

-- 4. Authenticated users have full access
create policy "Authenticated users have full access"
  on articles for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 5. Auto-update updated_at on changes
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger articles_updated_at
  before update on articles
  for each row
  execute function update_updated_at();
