-- Cartes amb temps de viatge. Executa-ho al SQL Editor una sola vegada (després de supabase.sql).
-- Si ja tens les notificacions (supabase_push.sql), també s'activen els avisos d'enviament i d'arribada.

-- 1) On és cadascú (només el nom del lloc i la posició aproximada)
create table if not exists public.pp_places (
  player text primary key check (player in ('a','b')),
  name text not null check (char_length(name) between 1 and 80),
  lat double precision not null check (lat between -90 and 90),
  lon double precision not null check (lon between -180 and 180),
  ts timestamptz not null default now(),
  by_user uuid default auth.uid()
);

-- 2) Les cartes
create table if not exists public.pp_letters (
  id uuid primary key default gen_random_uuid(),
  from_player text not null check (from_player in ('a','b')),
  to_player text not null check (to_player in ('a','b')),
  transport text not null check (transport in ('colom','cotxe','vaixell','avio')),
  distance_km int not null check (distance_km between 0 and 25000),
  duration_min int not null check (duration_min between 1 and 100000),
  body text not null check (char_length(body) between 2 and 2000),
  sent_at timestamptz not null default now(),
  arrive_at timestamptz not null default now(),
  notified boolean not null default false,
  read_at timestamptz,
  by_user uuid default auth.uid(),
  check (from_player <> to_player)
);

-- L'hora d'arribada la fixa el servidor (no depèn del rellotge del mòbil)
create or replace function public.pp_letters_set() returns trigger
language plpgsql as $$
begin
  new.sent_at := now();
  new.arrive_at := now() + make_interval(mins => new.duration_min);
  new.notified := false;
  new.read_at := null;
  return new;
end $$;

drop trigger if exists pp_letters_before on public.pp_letters;
create trigger pp_letters_before before insert on public.pp_letters
  for each row execute function public.pp_letters_set();

alter table public.pp_places  enable row level security;
alter table public.pp_letters enable row level security;
drop policy if exists "pp places"  on public.pp_places;
drop policy if exists "pp letters" on public.pp_letters;
create policy "pp places"  on public.pp_places  for all to authenticated using (public.pp_is_member()) with check (public.pp_is_member());
create policy "pp letters" on public.pp_letters for all to authenticated using (public.pp_is_member()) with check (public.pp_is_member());

do $$
begin
  alter publication supabase_realtime add table public.pp_places, public.pp_letters;
exception when others then
  raise notice 'Realtime no activat per a cartes (potser ja ho estava): %', sqlerrm;
end $$;

-- 3) Avís en enviar una carta (necessita la funció pp_notify de les notificacions)
drop trigger if exists pp_push_letters on public.pp_letters;
create trigger pp_push_letters after insert on public.pp_letters for each row execute function public.pp_notify();

-- 4) Avís en arribar: cada minut mira si hi ha cartes que acaben d'arribar
create or replace function public.pp_letters_tick() returns void
language plpgsql security definer set search_path = public, extensions as $$
declare c record; r record;
begin
  begin
    select * into c from public.pp_push_cfg where id = 1;
  exception when others then
    return;
  end;
  if c.url is null then return; end if;
  for r in select * from public.pp_letters where arrive_at <= now() and not notified order by arrive_at limit 20 loop
    update public.pp_letters set notified = true where id = r.id;
    begin
      perform net.http_post(
        url := c.url,
        headers := jsonb_build_object('Content-Type', 'application/json', 'x-pp-secret', c.secret),
        body := jsonb_build_object('type', 'ARRIVED', 'table', 'pp_letters', 'record', to_jsonb(r))
      );
    exception when others then
      null;
    end;
  end loop;
end $$;

do $$
begin
  perform cron.unschedule(jobid) from cron.job where jobname = 'pp-letters-tick';
  perform cron.schedule('pp-letters-tick', '* * * * *', 'select public.pp_letters_tick()');
exception when others then
  raise notice 'No he pogut programar l''avís d''arribada (activa pg_cron a Database > Extensions i torna a executar): %', sqlerrm;
end $$;
