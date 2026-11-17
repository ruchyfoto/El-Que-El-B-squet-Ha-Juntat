-- Xat. Executa-ho una sola vegada al SQL Editor (després de supabase_botiga.sql). Es pot repetir.
create table if not exists public.pp_chat (
  id uuid primary key default gen_random_uuid(),
  from_player text not null check (from_player in ('a','b')),
  body text not null check (char_length(body) between 1 and 1000),
  ts timestamptz not null default now(),
  read_at timestamptz,
  by_user uuid default auth.uid()
);
create index if not exists pp_chat_ts on public.pp_chat (ts desc);

alter table public.pp_chat enable row level security;
drop policy if exists "pp chat" on public.pp_chat;
create policy "pp chat" on public.pp_chat for all to authenticated
  using (public.pp_is_member()) with check (public.pp_is_member());

do $$
begin
  alter publication supabase_realtime add table public.pp_chat;
exception when others then
  raise notice 'Realtime: potser ja estava activat: %', sqlerrm;
end $$;

do $$
begin
  drop trigger if exists pp_push_chat on public.pp_chat;
  create trigger pp_push_chat after insert on public.pp_chat for each row execute function public.pp_notify();
exception when others then
  raise notice 'No he pogut activar els avisos (falta pp_notify?): %', sqlerrm;
end $$;
