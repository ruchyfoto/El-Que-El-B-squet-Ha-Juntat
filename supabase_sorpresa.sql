-- Sorpreses (pluja de cors amb un missatge gran). Executa-ho una sola vegada al SQL Editor
-- (després de supabase_petons.sql). Es pot repetir sense problema.
-- Expressament NO envia cap notificació: la sorpresa surt la propera vegada que l'altra persona obre la web.
create table if not exists public.pp_surprises (
  id uuid primary key default gen_random_uuid(),
  from_player text not null check (from_player in ('a','b')),
  to_player text not null check (to_player in ('a','b')),
  message text not null check (char_length(message) between 1 and 80),
  ts timestamptz not null default now(),
  seen_at timestamptz,
  by_user uuid default auth.uid(),
  check (from_player <> to_player)
);

alter table public.pp_surprises enable row level security;
drop policy if exists "pp surprises" on public.pp_surprises;
create policy "pp surprises" on public.pp_surprises for all to authenticated
  using (public.pp_is_member()) with check (public.pp_is_member());

do $$
begin
  alter publication supabase_realtime add table public.pp_surprises;
exception when others then
  raise notice 'Realtime: potser ja estava activat: %', sqlerrm;
end $$;
