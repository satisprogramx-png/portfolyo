-- Bimola web sitesini portfolyoya ekle

insert into public.projects
  (slug, title_tr, title_en, description_tr, description_en, category, year, cover_url, tags, featured, sort_order)
values
  (
    'bimola',
    'Bimola — Web Sitesi',
    'Bimola — Website',
    'Vercel üzerinde yayınlanan hızlı, modern ve mobil uyumlu web sitesi. (bimola.vercel.app)',
    'A fast, modern and mobile-friendly website deployed on Vercel. (bimola.vercel.app)',
    'motion', 2026, 'https://bimola.vercel.app', array['Next.js', 'Vercel', 'Tailwind CSS'], true, 1
  )
on conflict (slug) do nothing;
