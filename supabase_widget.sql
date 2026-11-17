-- Widget per a la pantalla d'inici (iPhone, amb l'app Scriptable). Executa-ho una sola vegada
-- al SQL Editor (després de supabase_ultimavegada.sql). Es pot repetir sense problema.
--
-- Crea una clau secreta (token) i una funció que, només amb aquesta clau, torna les dades del compte enrere,
-- les ciutats i les dates assenyalades. No dona accés a res més (ni xat, ni cartes, ni punts).
create table if not exists public.pp_widget_cfg (
  id int primary key default 1 check (id = 1),
  token text not null
);
insert into public.pp_widget_cfg (id, token)
select 1, replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', '')
where not exists (select 1 from public.pp_widget_cfg);
-- Sense polítiques: des de la web ningú pot llegir el token.
alter table public.pp_widget_cfg enable row level security;

create or replace function public.pp_widget(t text) returns json
language plpgsql security definer set search_path = public as $$
declare cfgtok text; r json;
begin
  select token into cfgtok from public.pp_widget_cfg where id = 1;
  if cfgtok is null or t is null or t <> cfgtok then
    raise exception 'no autoritzat' using errcode = '28000';
  end if;
  select json_build_object(
    'meet_date', (select meet_date from public.pp_extra where id = 1),
    'last_seen', (select last_seen from public.pp_extra where id = 1),
    'places', coalesce((select json_agg(json_build_object('player', player, 'name', name, 'lat', lat, 'lon', lon, 'tz', tz)) from public.pp_places), '[]'::json),
    'dates',  coalesce((select json_agg(json_build_object('title', title, 'repeat', repeat, 'month', month, 'day', day, 'since', since)) from public.pp_dates), '[]'::json)
  ) into r;
  return r;
end $$;
revoke all on function public.pp_widget(text) from public;
grant execute on function public.pp_widget(text) to anon, authenticated;

-- Per veure el teu token: select token from public.pp_widget_cfg;
