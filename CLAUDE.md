@AGENTS.md

# Portfolyo — Proje Spesifikasyonu

Çok dilli (TR/EN), kategoriye göre tema değiştiren kişisel portfolyo sitesi.

## 1. Teknoloji

- Next.js 15 (App Router, TypeScript)
- Tailwind CSS v4 (`@theme inline` ile CSS variable eşlemesi)
- Framer Motion (`MotionConfig reducedMotion="user"`)
- next-intl v4 (`/tr`, `/en` route'ları; varsayılan `tr`)
- Supabase (`projects`, `leads` tabloları)

## 2. Kurallar

- Bileşenlerde hex renk YOK — yalnızca CSS variable / Tailwind token (`bg-bg`, `text-fg`, `bg-accent`…).
- Tema renkleri yalnızca `app/themes.css` içinde, oklch ile tanımlanır.
- `prefers-reduced-motion` her zaman desteklenir (CSS geçişleri + Framer Motion).
- Build ve lint temiz olmalı.

## 3. Tema Sistemi

- `app/themes.css`: `html[data-theme="…"]` ile 6 tema: `default`, `web`, `mobile`, `brand`, `ai`, `motion`.
- Variable seti: `--bg`, `--fg`, `--surface`, `--muted`, `--accent`, `--accent-fg`, `--line`.
- Tema geçişi 0.6s ease (background/color/border); reduced-motion'da kapalı.
- `components/ThemeProvider.tsx`: context + `document.documentElement.dataset.theme`; seçim sessionStorage'da kalıcı.
- Kategori chip'leri (`components/CategoryChips.tsx`) tıklanınca tüm site teması morph eder.

## 4. Sayfalar

- `/` (hero): Apple tarzı scrollytelling — tam ekran hero + her kategori için tam ekran bölüm; bölüme kaydırınca tema otomatik morph eder (`components/HomeScroll.tsx`). Buton/chip yok.
- `/work`: projeler Supabase'den; kategori filtresi aynı zamanda temayı değiştirir.
- `/contact`: form → server action → `leads` tablosuna insert.

## 5. Kategoriler

`web`, `mobile`, `brand`, `ai`, `motion` (bkz. `lib/themes.ts`).

## 6. Supabase Şeması

`supabase/migrations/0001_init.sql`:

- `projects(id, slug, title_tr, title_en, description_tr, description_en, category, year, cover_url, tags[], featured, sort_order, created_at)` — RLS: herkese select.
- `leads(id, name, email, message, locale, created_at)` — RLS: anon insert, select yok.
- Seed: 4 proje (nova-commerce, pulse-fitness, atlas-rebrand, lumen-ai-assistant).
- Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (bkz. `.env.example`).
- Env yoksa `lib/projects.ts` içindeki FALLBACK_PROJECTS kullanılır.
