-- Calendari de dates assenyalades. Executa-ho una sola vegada al SQL Editor
-- (després de supabase_xat.sql). Es pot repetir sense problema.
create table if not exists public.pp_dates (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 2 and 60),
  repeat text not null check (repeat in ('monthly','yearly','once')),
  month int check (month between 1 and 12),
  day int not null check (day between 1 and 31),
  since date,
  ts timestamptz not null default now(),
  by_user uuid default auth.uid(),
  check (repeat <> 'yearly' or month is not null),
  check (repeat <> 'once' or since is not null)
);

alter table public.pp_dates enable row level security;
drop policy if exists "pp dates" on public.pp_dates;
create policy "pp dates" on public.pp_dates for all to authenticated
  using (public.pp_is_member()) with check (public.pp_is_member());

do $$
begin
  alter publication supabase_realtime add table public.pp_dates;
exception when others then
  raise notice 'Realtime: potser ja estava activat: %', sqlerrm;
end $$;

-- Dates d'exemple (només si la taula és buida). Després les pots canviar o treure des de la web.
insert into public.pp_dates (title, repeat, month, day)
select v.title, v.repeat, v.month, v.day
from (values
  ('Fem mes',      'monthly', null::int, 19),
  ('Sant Valentí', 'yearly',  2,  14),
  ('Sant Jordi',   'yearly',  4,  23),
  ('Nadal',        'yearly',  12, 25),
  ('Cap d''any',   'yearly',  1,  1),
  ('Reis',         'yearly',  1,  6)
) as v(title, repeat, month, day)
where not exists (select 1 from public.pp_dates);
