-- Executa-ho tot al SQL Editor de Supabase (una sola vegada).
-- Les taules porten el prefix pp_ perquè es poden compartir projecte amb altres webs (p. ex. el fantasy).

create table public.pp_config (
  id int primary key default 1 check (id = 1),
  name_a text not null check (char_length(name_a) between 1 and 24),
  name_b text not null check (char_length(name_b) between 1 and 24)
);

create table public.pp_moments (
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

create table public.pp_rewards (
  player text not null check (player in ('a','b')),
  level int not null check (level >= 1),
  text text not null check (char_length(text) between 2 and 140),
  ts timestamptz not null default now(),
  by_user uuid default auth.uid(),
  primary key (player, level)
);

-- Llista de correus que poden entrar (només vosaltres dos).
create table public.pp_allowed (email text primary key);
alter table public.pp_allowed enable row level security;   -- sense polítiques: ningú la llegeix des de la web

-- >>> CANVIA ELS DOS CORREUS PELS VOSTRES (els mateixos amb què creeu els usuaris) <<<
insert into public.pp_allowed (email) values ('correu1@exemple.com'), ('correu2@exemple.com');

create or replace function public.pp_is_member() returns boolean
language sql security definer set search_path = public stable as $$
  select exists (select 1 from public.pp_allowed where lower(email) = lower(auth.jwt() ->> 'email'))
$$;

alter table public.pp_config  enable row level security;
alter table public.pp_moments enable row level security;
alter table public.pp_rewards enable row level security;

create policy "pp config"  on public.pp_config  for all to authenticated using (public.pp_is_member()) with check (public.pp_is_member());
create policy "pp moments" on public.pp_moments for all to authenticated using (public.pp_is_member()) with check (public.pp_is_member());
create policy "pp rewards" on public.pp_rewards for all to authenticated using (public.pp_is_member()) with check (public.pp_is_member());

-- Actualitzacions en temps real
alter publication supabase_realtime add table public.pp_config, public.pp_moments, public.pp_rewards;
