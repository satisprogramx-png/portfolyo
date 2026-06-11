-- Diyetisyen Modülü projesini ekle; MindNote açıklamasına yapay zekâyı işle

insert into public.projects
  (slug, title_tr, title_en, description_tr, description_en, category, year, tags, featured, sort_order)
values
  (
    'diyetisyen-modulu',
    'Diyetisyen Modülü',
    'Dietitian Module',
    'Danışan takibi, beslenme planları ve randevu yönetimi sunan klinik paneli; içinde fizyoterapist modülü de bulunur.',
    'A clinic panel for client tracking, nutrition plans and appointment management — with a built-in physiotherapist module.',
    'web', 2026, array['Next.js', 'Supabase', 'TypeScript'], true, 2
  )
on conflict (slug) do nothing;

update public.projects
set
  description_tr = 'Blok tabanlı editör, bağlantılı notlar, takımlar ve yapay zekâ asistanı (özetleme, öneri, notlardan yanıt) sunan Notion benzeri not uygulaması. (mindnote.tech)',
  description_en = 'A Notion-style note app with a block editor, linked notes, teams and an AI assistant that summarises, suggests and answers from your notes. (mindnote.tech)'
where slug = 'mindnote';
