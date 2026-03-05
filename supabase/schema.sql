create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null,
  empresa text,
  email text not null,
  whatsapp text,
  faturamento text,
  origem text not null,
  interesse text,
  consentimento_lgpd boolean not null default false
);

alter table public.leads
  add column if not exists empresa text,
  add column if not exists whatsapp text,
  add column if not exists faturamento text;

create table if not exists public.auditorias_xml (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome_arquivo text not null,
  numero_nota text,
  emitente text,
  score_fiscal integer not null,
  classificacao_risco text not null,
  inconsistencias jsonb not null default '[]'::jsonb
);

create table if not exists public.diagnosticos_tributarios (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  faturamento text not null,
  regime_tributario text not null,
  atividade text not null,
  estado text not null,
  numero_funcionarios integer not null,
  tipo_mercadoria text not null,
  score_tributario integer not null,
  classificacao_risco text not null,
  oportunidades jsonb not null
);

alter table public.leads enable row level security;
alter table public.auditorias_xml enable row level security;
alter table public.diagnosticos_tributarios enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'leads' and policyname = 'Allow anonymous lead insert'
  ) then
    create policy "Allow anonymous lead insert" on public.leads for insert to anon with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'leads' and policyname = 'Allow authenticated read'
  ) then
    create policy "Allow authenticated read" on public.leads for select to authenticated using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'auditorias_xml' and policyname = 'Allow anonymous auditoria insert'
  ) then
    create policy "Allow anonymous auditoria insert" on public.auditorias_xml for insert to anon with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'auditorias_xml' and policyname = 'Allow authenticated auditoria read'
  ) then
    create policy "Allow authenticated auditoria read" on public.auditorias_xml for select to authenticated using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'diagnosticos_tributarios' and policyname = 'Allow anonymous diagnostico insert'
  ) then
    create policy "Allow anonymous diagnostico insert" on public.diagnosticos_tributarios for insert to anon with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'diagnosticos_tributarios' and policyname = 'Allow authenticated diagnostico read'
  ) then
    create policy "Allow authenticated diagnostico read" on public.diagnosticos_tributarios for select to authenticated using (true);
  end if;
end $$;
