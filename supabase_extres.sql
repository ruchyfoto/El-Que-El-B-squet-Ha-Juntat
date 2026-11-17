-- Retrobada, hora de l'altre i càpsules del temps. Executa-ho una sola vegada al SQL Editor
-- (després de supabase_cartes.sql). Es pot repetir sense problema.

-- 1) Data de la propera retrobada (compartida)
create table if not exists public.pp_extra (
  id int primary key default 1 check (id = 1),
  meet_date date,
  ts timestamptz not null default now()
);
insert into public.pp_extra (id) values (1) on conflict (id) do nothing;
alter table public.pp_extra enable row level security;
drop policy if exists "pp extra" on public.pp_extra;
create policy "pp extra" on public.pp_extra for all to authenticated
  using (public.pp_is_member()) with check (public.pp_is_member());
do $$
begin
  alter publication supabase_realtime add table public.pp_extra;
exception when others then
  raise notice 'Realtime no activat per a pp_extra (potser ja ho estava): %', sqlerrm;
end $$;

-- 2) Fus horari de cada ubicació (per saber quina hora és allà)
alter table public.pp_places add column if not exists tz text;
alter table public.pp_places drop constraint if exists pp_places_tz_len;
alter table public.pp_places add constraint pp_places_tz_len check (tz is null or char_length(tz) between 1 and 60);

-- 3) Càpsules del temps: una carta que s'obre el dia que tries
alter table public.pp_letters add column if not exists open_at timestamptz;

do $$
declare c record;
begin
  for c in select conname from pg_constraint
           where conrelid = 'public.pp_letters'::regclass and contype = 'c'
             and (pg_get_constraintdef(oid) ilike '%transport%' or pg_get_constraintdef(oid) ilike '%duration_min%')
  loop
    execute format('alter table public.pp_letters drop constraint %I', c.conname);
  end loop;
end $$;
alter table public.pp_letters add constraint pp_letters_transport_ck
  check (transport in ('colom','cotxe','vaixell','avio','capsula'));
alter table public.pp_letters add constraint pp_letters_duration_ck
  check (duration_min between 1 and 3000000);

create or replace function public.pp_letters_set() returns trigger
language plpgsql as $$
begin
  new.sent_at := now();
  if new.transport = 'capsula' then
    if new.open_at is null or new.open_at < now() + interval '1 minute' or new.open_at > now() + interval '5 years' then
      raise exception 'Data d''obertura no valida';
    end if;
    new.arrive_at := new.open_at;
    new.duration_min := greatest(1, ceil(extract(epoch from (new.open_at - now())) / 60))::int;
  else
    new.open_at := null;
    new.arrive_at := now() + make_interval(mins => new.duration_min);
  end if;
  new.notified := false;
  new.read_at := null;
  return new;
end $$;
