-- Portfolyo şeması: projects + leads
-- CLAUDE.md bölüm 6 — Faz 1

create extension if not exists "pgcrypto";

-- Projeler -------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_tr text not null,
  title_en text not null,
  description_tr text not null default '',
  description_en text not null default '',
  category text not null check (category in ('web', 'mobile', 'brand', 'ai', 'motion')),
  year int not null,
  cover_url text,
  tags text[] not null default '{}',
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "projects are publicly readable"
  on public.projects for select
  to anon, authenticated
  using (true);

-- İletişim formu kayıtları ----------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  locale text not null default 'tr' check (locale in ('tr', 'en')),
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "anyone can submit a lead"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- Seed: 4 mevcut proje ---------------------------------------------------
insert into public.projects
  (slug, title_tr, title_en, description_tr, description_en, category, year, tags, featured, sort_order)
values
  (
    'nova-commerce',
    'Nova E-Ticaret Platformu',
    'Nova Commerce Platform',
    'Headless mimaride, saniyenin altında açılan çok dilli e-ticaret deneyimi.',
    'A multilingual headless commerce experience with sub-second page loads.',
    'web', 2025, array['Next.js', 'Stripe', 'Supabase'], true, 1
  ),
  (
    'pulse-fitness',
    'Pulse Fitness Uygulaması',
    'Pulse Fitness App',
    'Kişiselleştirilmiş antrenman planları sunan iOS ve Android uygulaması.',
    'An iOS and Android app delivering personalised training plans.',
    'mobile', 2024, array['React Native', 'HealthKit'], true, 2
  ),
  (
    'atlas-rebrand',
    'Atlas Marka Yenileme',
    'Atlas Rebrand',
    'Logo, tipografi ve tasarım sisteminden oluşan uçtan uca marka kimliği.',
    'End-to-end brand identity: logo, typography and a full design system.',
    'brand', 2024, array['Identity', 'Design System'], false, 3
  ),
  (
    'lumen-ai-assistant',
    'Lumen Yapay Zekâ Asistanı',
    'Lumen AI Assistant',
    'Şirket içi dokümanlar üzerinde çalışan, kaynak gösteren RAG tabanlı asistan.',
    'A RAG-based assistant over internal docs with cited answers.',
    'ai', 2025, array['Claude', 'RAG', 'Vector Search'], true, 4
  )
on conflict (slug) do nothing;
