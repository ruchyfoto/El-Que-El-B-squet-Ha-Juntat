-- Dies que porteu sense veure-us. Executa-ho una sola vegada al SQL Editor
-- (després de supabase_extres.sql). Es pot repetir sense problema.
alter table public.pp_extra add column if not exists last_seen date;
insert into public.pp_extra (id) values (1) on conflict (id) do nothing;
-- Última vegada que us vau veure: 20 d'octubre (només si encara no hi havia cap data).
update public.pp_extra set last_seen = date '2026-10-20' where id = 1 and last_seen is null;
