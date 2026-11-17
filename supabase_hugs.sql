-- Abraçades. Executa-ho al SQL Editor una sola vegada (després de supabase.sql).
-- Si ja has fet les notificacions (supabase_push.sql), també activa els avisos de les abraçades.

create table if not exists public.pp_hugs (
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

alter table public.pp_hugs enable row level security;
drop policy if exists "pp hugs" on public.pp_hugs;
create policy "pp hugs" on public.pp_hugs for all to authenticated
  using (public.pp_is_member()) with check (public.pp_is_member());

do $$
begin
  alter publication supabase_realtime add table public.pp_hugs;
exception when others then
  raise notice 'Realtime ja activat per a pp_hugs (o no disponible): %', sqlerrm;
end $$;

-- Avisos: la funció envia també les actualitzacions (quan es torna una abraçada).
create or replace function public.pp_notify() returns trigger
language plpgsql security definer set search_path = public, extensions as $$
declare c record;
begin
  begin
    select * into c from public.pp_push_cfg where id = 1;
    if c.url is null then return new; end if;
    perform net.http_post(
      url := c.url,
      headers := jsonb_build_object('Content-Type', 'application/json', 'x-pp-secret', c.secret),
      body := jsonb_build_object(
        'type', tg_op, 'table', tg_table_name, 'record', to_jsonb(new),
        'old_record', case when tg_op = 'UPDATE' then to_jsonb(old) else null end)
    );
  exception when others then
    null; -- un error d'avís no ha de fer fallar mai el desat
  end;
  return new;
end $$;

drop trigger if exists pp_push_hugs_ins on public.pp_hugs;
drop trigger if exists pp_push_hugs_upd on public.pp_hugs;
create trigger pp_push_hugs_ins after insert on public.pp_hugs for each row execute function public.pp_notify();
create trigger pp_push_hugs_upd after update on public.pp_hugs for each row execute function public.pp_notify();
