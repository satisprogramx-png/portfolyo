-- Bimola kaydını gerçek site kimliğine güncelle: Bi'Mola Zamanı (sağlık blogu)

update public.projects
set
  title_tr = 'Bi''Mola Zamanı — Sağlık Blogu',
  title_en = 'Bi''Mola Zamanı — Health Blog',
  description_tr = 'Beslenme, sağlık ve iş sağlığı üzerine haftalık, bilimsel kaynaklı yazılar yayımlayan kişisel blog. (bimola.vercel.app)',
  description_en = 'A personal blog publishing weekly, science-backed articles on nutrition, health and workplace health. (bimola.vercel.app)',
  tags = array['Blog', 'Sağlık', 'Vercel']
where slug = 'bimola';
