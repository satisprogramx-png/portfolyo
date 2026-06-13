-- Placeholder projeleri kaldır, kalan gerçek projeleri ana sayfa sırasına göre düzenle

delete from public.projects
where slug in ('nova-commerce', 'pulse-fitness', 'lumen-ai-assistant');

update public.projects set sort_order = 0 where slug = 'mindnote';
update public.projects set sort_order = 1 where slug = 'diyetisyen-modulu';
update public.projects set sort_order = 2 where slug = 'fizyoterapist-modulu';
update public.projects set sort_order = 3 where slug = 'ekici-residence';
update public.projects set sort_order = 4 where slug = 'bimola';
