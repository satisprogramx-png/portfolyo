-- MindNote projesini portfolyoya ekle

insert into public.projects
  (slug, title_tr, title_en, description_tr, description_en, category, year, cover_url, tags, featured, sort_order)
values
  (
    'mindnote',
    'MindNote — Akıllı Not Uygulaması',
    'MindNote — Smart Note App',
    'Blok tabanlı editör, notlar arası bağlantı, çalışma alanları ve davet kodlu takım çalışması sunan Notion benzeri not uygulaması. Resmî Gazete mevzuat takibi modülü içerir. (mindnote.tech)',
    'A Notion-style note app with a block-based editor, linked notes, workspaces and invite-based team collaboration. Includes a legislation-tracking module. (mindnote.tech)',
    'web', 2026, 'https://mindnote.tech', array['Next.js', 'Supabase', 'TypeScript'], true, 0
  )
on conflict (slug) do nothing;
