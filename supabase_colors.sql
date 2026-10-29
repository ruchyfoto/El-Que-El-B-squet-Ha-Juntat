-- Colors personals. Executa-ho al SQL Editor una sola vegada (després de supabase.sql).

create table public.pp_prefs (
  player text primary key check (player in ('a','b')),
  color text not null check (color ~ '^#[0-9a-fA-F]{6}$'),
  ts timestamptz not null default now(),
  by_user uuid default auth.uid()
);

alter table public.pp_prefs enable row level security;

create policy "pp prefs" on public.pp_prefs for all to authenticated
  using (public.pp_is_member()) with check (public.pp_is_member());

alter publication supabase_realtime add table public.pp_prefs;
