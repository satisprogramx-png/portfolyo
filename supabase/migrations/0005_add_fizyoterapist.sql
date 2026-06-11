-- Fizyoterapist Modülü projesini ekle

insert into public.projects
  (slug, title_tr, title_en, description_tr, description_en, category, year, tags, featured, sort_order)
values
  (
    'fizyoterapist-modulu',
    'Fizyoterapist Modülü',
    'Physiotherapist Module',
    'Egzersiz programları, seans takibi ve ilerleme notları sunan klinik modülü; diyetisyen paneliyle entegre çalışır.',
    'A clinic module for exercise programmes, session tracking and progress notes — integrated with the dietitian panel.',
    'web', 2026, array['Next.js', 'Supabase', 'TypeScript'], true, 3
  )
on conflict (slug) do nothing;
