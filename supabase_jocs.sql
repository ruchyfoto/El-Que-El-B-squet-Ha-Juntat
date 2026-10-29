-- Jocs diaris. Executa-ho al SQL Editor una sola vegada (després de supabase.sql).

create table public.pp_answers (
  day text not null,
  game text not null check (game in ('q','t')),   -- q = pregunta del dia, t = això o allò
  slot int not null default 0,
  player text not null check (player in ('a','b')),
  answer text not null check (char_length(answer) between 1 and 300),
  prompt text check (char_length(prompt) <= 400),
  ts timestamptz not null default now(),
  by_user uuid default auth.uid(),
  primary key (day, game, slot, player)
);

alter table public.pp_answers enable row level security;

create policy "pp answers" on public.pp_answers for all to authenticated
  using (public.pp_is_member()) with check (public.pp_is_member());

alter publication supabase_realtime add table public.pp_answers;
