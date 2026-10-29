-- Notificacions push. Executa-ho al SQL Editor una sola vegada (després de supabase.sql).
-- ABANS de donar a Run, canvia només dues coses a la línia "declare" de la part 2:
--   v_ref:    el codi del teu projecte (la part xxxx de https://xxxx.supabase.co)
--   v_secret: una frase llarga inventada. Ha de ser la MATEIXA que el secret PP_PUSH_SECRET de la funció.

-- 1) Taula de subscripcions (un mòbil = una fila)
create table if not exists public.pp_push (
  endpoint text primary key,
  player text not null check (player in ('a','b')),
  name text check (char_length(name) <= 24),
  sub jsonb not null,
  by_user uuid default auth.uid(),
  ts timestamptz not null default now()
);
alter table public.pp_push enable row level security;
drop policy if exists "pp push" on public.pp_push;
create policy "pp push" on public.pp_push for all to authenticated
  using (public.pp_is_member()) with check (public.pp_is_member());

-- 2) Adreça i secret de la funció (no es poden llegir des de la web)
create table if not exists public.pp_push_cfg (
  id int primary key default 1 check (id = 1),
  url text not null,
  secret text not null
);
alter table public.pp_push_cfg enable row level security;
revoke all on public.pp_push_cfg from anon, authenticated;

do $$
declare
  v_ref    text := 'PROJECT_REF';
  v_secret text := 'SECRET';
begin
  if v_ref = 'PROJECT_REF' or v_secret = 'SECRET' then
    raise exception 'Canvia v_ref i v_secret abans d''executar-ho.';
  end if;
  insert into public.pp_push_cfg (id, url, secret)
  values (1, 'https://' || v_ref || '.supabase.co/functions/v1/pp-push', v_secret)
  on conflict (id) do update set url = excluded.url, secret = excluded.secret;
end $$;

-- 3) Cridar la funció quan hi ha una frase, una resposta o un premi nou
create extension if not exists pg_net;

create or replace function public.pp_notify() returns trigger
language plpgsql security definer set search_path = public, extensions as $$
declare c record;
begin
  select * into c from public.pp_push_cfg where id = 1;
  if c.url is null then return new; end if;
  begin
    perform net.http_post(
      url := c.url,
      headers := jsonb_build_object('Content-Type', 'application/json', 'x-pp-secret', c.secret),
      body := jsonb_build_object('type', 'INSERT', 'table', tg_table_name, 'record', to_jsonb(new))
    );
  exception when others then
    null; -- un error d'avís no ha de fer fallar mai el desat
  end;
  return new;
end $$;

drop trigger if exists pp_push_moments on public.pp_moments;
drop trigger if exists pp_push_answers on public.pp_answers;
drop trigger if exists pp_push_rewards on public.pp_rewards;
create trigger pp_push_moments after insert on public.pp_moments for each row execute function public.pp_notify();
create trigger pp_push_answers after insert on public.pp_answers for each row execute function public.pp_notify();
create trigger pp_push_rewards after insert on public.pp_rewards for each row execute function public.pp_notify();

-- 4) Recordatori: cada hora en punt. La funció només envia quan són les 20:00 a Madrid.
create or replace function public.pp_cron() returns void
language plpgsql security definer set search_path = public, extensions as $$
declare c record;
begin
  select * into c from public.pp_push_cfg where id = 1;
  if c.url is null then return; end if;
  perform net.http_post(
    url := c.url,
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-pp-secret', c.secret),
    body := '{"cron":true}'::jsonb
  );
end $$;

create extension if not exists pg_cron;

do $$
begin
  perform cron.unschedule(jobid) from cron.job where jobname = 'pp-push-hourly';
  perform cron.schedule('pp-push-hourly', '0 * * * *', 'select public.pp_cron()');
exception when others then
  raise notice 'No he pogut programar el recordatori (activa pg_cron a Database > Extensions i torna a executar): %', sqlerrm;
end $$;
