-- Botiga de cupons + Quatre en ratlla. Executa-ho una sola vegada al SQL Editor
-- (després de supabase_extres.sql). Es pot repetir sense problema.

-- 1) Cupons que ofereix cadascú
create table if not exists public.pp_offers (
  id uuid primary key default gen_random_uuid(),
  from_player text not null check (from_player in ('a','b')),
  title text not null check (char_length(title) between 2 and 80),
  cost int not null check (cost between 1 and 1000),
  ts timestamptz not null default now(),
  by_user uuid default auth.uid()
);

-- 2) Cupons canviats (guarden el text i el preu tal com eren)
create table if not exists public.pp_redeems (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid,
  offerer text not null check (offerer in ('a','b')),
  buyer text not null check (buyer in ('a','b')),
  title text not null check (char_length(title) between 2 and 80),
  cost int not null check (cost between 1 and 1000),
  status text not null default 'pending' check (status in ('pending','done')),
  ts timestamptz not null default now(),
  done_at timestamptz,
  by_user uuid default auth.uid(),
  check (offerer <> buyer)
);

-- 3) Quatre en ratlla (el tauler són 42 caràcters: . buit, a o b)
create table if not exists public.pp_c4 (
  id uuid primary key default gen_random_uuid(),
  starter text not null check (starter in ('a','b')),
  board text not null check (board ~ '^[.ab]{42}$'),
  turn text not null check (turn in ('a','b')),
  status text not null default 'playing' check (status in ('playing','won','draw')),
  winner text check (winner in ('a','b')),
  last_by text check (last_by in ('a','b')),
  moves int not null default 0 check (moves between 0 and 42),
  ts timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  by_user uuid default auth.uid()
);
-- Només pot haver-hi una partida en joc alhora
create unique index if not exists pp_c4_one_playing on public.pp_c4 ((true)) where status = 'playing';

create or replace function public.pp_c4_touch() returns trigger
language plpgsql as $$
begin new.updated_at := now(); return new; end $$;
drop trigger if exists pp_c4_touch on public.pp_c4;
create trigger pp_c4_touch before update on public.pp_c4 for each row execute function public.pp_c4_touch();

alter table public.pp_offers  enable row level security;
alter table public.pp_redeems enable row level security;
alter table public.pp_c4      enable row level security;
drop policy if exists "pp offers"  on public.pp_offers;
drop policy if exists "pp redeems" on public.pp_redeems;
drop policy if exists "pp c4"      on public.pp_c4;
create policy "pp offers"  on public.pp_offers  for all to authenticated using (public.pp_is_member()) with check (public.pp_is_member());
create policy "pp redeems" on public.pp_redeems for all to authenticated using (public.pp_is_member()) with check (public.pp_is_member());
create policy "pp c4"      on public.pp_c4      for all to authenticated using (public.pp_is_member()) with check (public.pp_is_member());

do $$
begin
  alter publication supabase_realtime add table public.pp_offers, public.pp_redeems, public.pp_c4;
exception when others then
  raise notice 'Realtime: potser ja estava activat: %', sqlerrm;
end $$;

-- 4) Avisos (necessiten la funció pp_notify de les notificacions)
do $$
begin
  drop trigger if exists pp_push_offers  on public.pp_offers;
  drop trigger if exists pp_push_redeems_i on public.pp_redeems;
  drop trigger if exists pp_push_redeems_u on public.pp_redeems;
  drop trigger if exists pp_push_c4_i on public.pp_c4;
  drop trigger if exists pp_push_c4_u on public.pp_c4;
  create trigger pp_push_offers   after insert on public.pp_offers  for each row execute function public.pp_notify();
  create trigger pp_push_redeems_i after insert on public.pp_redeems for each row execute function public.pp_notify();
  create trigger pp_push_redeems_u after update on public.pp_redeems for each row execute function public.pp_notify();
  create trigger pp_push_c4_i     after insert on public.pp_c4      for each row execute function public.pp_notify();
  create trigger pp_push_c4_u     after update on public.pp_c4      for each row execute function public.pp_notify();
exception when others then
  raise notice 'No he pogut activar els avisos (falta pp_notify?): %', sqlerrm;
end $$;
