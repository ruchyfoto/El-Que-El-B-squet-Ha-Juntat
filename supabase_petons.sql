-- Petons (com les abraçades, però amb un màxim de 3 al dia per persona).
-- Executa-ho una sola vegada al SQL Editor (després de supabase_dates.sql). Es pot repetir.
create table if not exists public.pp_kisses (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('give','ask')),
  from_player text not null check (from_player in ('a','b')),
  status text not null check (status in ('done','pending','returned')),
  day text not null,
  ts timestamptz not null default now(),
  ret_day text,
  ret_ts timestamptz,
  by_user uuid default auth.uid(),
  check ((kind = 'give' and status = 'done') or (kind = 'ask' and status in ('pending','returned')))
);

-- Límit: com a màxim 3 petons iniciats (donats o demanats) per persona i dia.
-- Tornar un petó que t'han demanat no compta. El "dia" és el de cada persona (el del seu mòbil).
create or replace function public.pp_kisses_limit() returns trigger
language plpgsql as $$
declare n int;
begin
  if new.day !~ '^\d{4}-\d{2}-\d{2}$' or new.day::date < current_date - 2 or new.day::date > current_date + 2 then
    raise exception 'Dia no valid';
  end if;
  select count(*) into n from public.pp_kisses where from_player = new.from_player and day = new.day;
  if n >= 3 then
    raise exception 'Limit de 3 petons al dia';
  end if;
  return new;
end $$;
drop trigger if exists pp_kisses_limit on public.pp_kisses;
create trigger pp_kisses_limit before insert on public.pp_kisses for each row execute function public.pp_kisses_limit();

alter table public.pp_kisses enable row level security;
drop policy if exists "pp kisses" on public.pp_kisses;
create policy "pp kisses" on public.pp_kisses for all to authenticated
  using (public.pp_is_member()) with check (public.pp_is_member());

do $$
begin
  alter publication supabase_realtime add table public.pp_kisses;
exception when others then
  raise notice 'Realtime: potser ja estava activat: %', sqlerrm;
end $$;

-- Avisos (necessiten la funció pp_notify de les notificacions)
do $$
begin
  drop trigger if exists pp_push_kisses_ins on public.pp_kisses;
  drop trigger if exists pp_push_kisses_upd on public.pp_kisses;
  create trigger pp_push_kisses_ins after insert on public.pp_kisses for each row execute function public.pp_notify();
  create trigger pp_push_kisses_upd after update on public.pp_kisses for each row execute function public.pp_notify();
exception when others then
  raise notice 'No he pogut activar els avisos (falta pp_notify?): %', sqlerrm;
end $$;
