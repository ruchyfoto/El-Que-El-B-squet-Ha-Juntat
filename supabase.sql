-- Executa-ho tot al SQL Editor de Supabase (una sola vegada).

create table public.config (
  id int primary key default 1 check (id = 1),
  name_a text not null check (char_length(name_a) between 1 and 24),
  name_b text not null check (char_length(name_b) between 1 and 24)
);

create table public.moments (
  id uuid primary key default gen_random_uuid(),
  speaker text not null check (speaker in ('a','b')),
  cat text not null,
  pts int not null check (pts between 1 and 10),
  text text not null check (char_length(text) between 3 and 400),
  ts timestamptz not null default now(),
  day text not null,
  wk text not null,
  by_user uuid default auth.uid()
);

create table public.rewards (
  player text not null check (player in ('a','b')),
  level int not null check (level >= 1),
  text text not null check (char_length(text) between 2 and 140),
  ts timestamptz not null default now(),
  by_user uuid default auth.uid(),
  primary key (player, level)
);

-- Només poden entrar usuaris amb sessió iniciada (vosaltres dos).
alter table public.config  enable row level security;
alter table public.moments enable row level security;
alter table public.rewards enable row level security;

create policy "parella config"  on public.config  for all to authenticated using (true) with check (true);
create policy "parella moments" on public.moments for all to authenticated using (true) with check (true);
create policy "parella rewards" on public.rewards for all to authenticated using (true) with check (true);

-- Actualitzacions en temps real
alter publication supabase_realtime add table public.config, public.moments, public.rewards;
