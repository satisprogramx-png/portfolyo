-- Ekici Residence (AI tanıtım videosu) projesini ekle; placeholder Lumen'i sona al

insert into public.projects
  (slug, title_tr, title_en, description_tr, description_en, category, year, cover_url, tags, featured, sort_order)
values
  (
    'ekici-residence',
    'Ekici Residence — AI Tanıtım Filmi',
    'Ekici Residence — AI Promo Film',
    'Yapay zekâ ile üretilmiş konut projesi tanıtım filmi; sinematik kurgu ve AI görüntü üretimi.',
    'An AI-generated promo film for a residential project; cinematic editing with AI-generated footage.',
    'ai', 2026, 'https://player.vimeo.com/video/1200880545', array['AI Video', 'Tanıtım', 'Vimeo'], true, 4
  )
on conflict (slug) do nothing;

update public.projects set sort_order = 6 where slug = 'lumen-ai-assistant';
