-- Calendari d'advent SECRET. Executa-ho una sola vegada al SQL Editor (després de supabase_push.sql).
-- Es pot repetir sense problema.
-- El secret el garanteix la base de dades: fins a les 00:00 (Madrid) de cada dia, la fila NO existeix
-- per a qui la rep (ni a l'app, ni a l'API, ni a Realtime). Només qui l'ha escrita la pot veure abans.
create table if not exists public.pp_advent (
  id uuid primary key default gen_random_uuid(),
  year int not null default 2026,
  day int not null check (day between 1 and 25),
  to_player text not null check (to_player in ('a','b')),
  kind text not null default 'missatge' check (kind in ('missatge','pla','repte','record','regal')),
  title text not null check (char_length(title) between 1 and 80),
  body text not null check (char_length(body) between 1 and 1500),
  unlock_at timestamptz not null default now(),
  opened_at timestamptz,
  by_user uuid not null default auth.uid(),
  ts timestamptz not null default now(),
  unique (year, day)
);

-- L'hora d'obertura la calcula sempre el servidor: 00:00 de Madrid del dia 'day' de desembre.
create or replace function public.pp_advent_fix() returns trigger
language plpgsql as $$
begin
  new.unlock_at := make_timestamptz(new.year, 12, new.day, 0, 0, 0, 'Europe/Madrid');
  if tg_op = 'UPDATE' and current_user in ('authenticated', 'anon') then
    new.opened_at := old.opened_at;   -- des de la web no es pot tocar; només ho fa la funció d'obrir
    new.by_user := old.by_user;
  end if;
  return new;
end $$;
drop trigger if exists pp_advent_fix on public.pp_advent;
create trigger pp_advent_fix before insert or update on public.pp_advent
  for each row execute function public.pp_advent_fix();

alter table public.pp_advent enable row level security;
drop policy if exists "advent select" on public.pp_advent;
drop policy if exists "advent insert" on public.pp_advent;
drop policy if exists "advent update" on public.pp_advent;
drop policy if exists "advent delete" on public.pp_advent;
create policy "advent select" on public.pp_advent for select to authenticated
  using (public.pp_is_member() and (by_user = auth.uid() or unlock_at <= now()));
create policy "advent insert" on public.pp_advent for insert to authenticated
  with check (public.pp_is_member() and by_user = auth.uid());
create policy "advent update" on public.pp_advent for update to authenticated
  using (public.pp_is_member() and by_user = auth.uid())
  with check (public.pp_is_member() and by_user = auth.uid());
create policy "advent delete" on public.pp_advent for delete to authenticated
  using (public.pp_is_member() and by_user = auth.uid());

-- Qui la rep marca la casella com a oberta (només si ja és l'hora).
create or replace function public.pp_advent_open(p_id uuid) returns void
language sql security definer set search_path = public as $$
  update public.pp_advent set opened_at = now()
  where id = p_id and opened_at is null and unlock_at <= now()
    and by_user is distinct from auth.uid() and public.pp_is_member();
$$;
revoke all on function public.pp_advent_open(uuid) from public, anon;
grant execute on function public.pp_advent_open(uuid) to authenticated;

-- Avís a qui l'ha preparat quan ella obre una casella. NO hi ha cap avís en desar (secret).
drop trigger if exists pp_push_advent on public.pp_advent;
create trigger pp_push_advent after update on public.pp_advent
  for each row when (old.opened_at is null and new.opened_at is not null)
  execute function public.pp_notify();

do $$
begin
  alter publication supabase_realtime add table public.pp_advent;
exception when others then
  raise notice 'Realtime: potser ja estava activat: %', sqlerrm;
end $$;
