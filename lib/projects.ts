import type { Category } from "./themes";
import { getSupabase } from "./supabase";

export type Project = {
  id: string;
  slug: string;
  title_tr: string;
  title_en: string;
  description_tr: string;
  description_en: string;
  category: Category;
  year: number;
  tags: string[];
  sort_order: number;
};

// Supabase yapılandırılmadığında kullanılan yedek veri.
// Migration'daki seed ile birebir aynıdır (supabase/migrations/0001_init.sql).
export const FALLBACK_PROJECTS: Project[] = [
  {
    id: "0",
    slug: "mindnote",
    title_tr: "MindNote — Akıllı Not Uygulaması",
    title_en: "MindNote — Smart Note App",
    description_tr:
      "Blok tabanlı editör, bağlantılı notlar, takımlar ve yapay zekâ asistanı (özetleme, öneri, notlardan yanıt) sunan Notion benzeri not uygulaması. (mindnote.tech)",
    description_en:
      "A Notion-style note app with a block editor, linked notes, teams and an AI assistant that summarises, suggests and answers from your notes. (mindnote.tech)",
    category: "web",
    year: 2026,
    tags: ["Next.js", "Supabase", "AI"],
    sort_order: 0,
  },
  {
    id: "0c",
    slug: "diyetisyen-modulu",
    title_tr: "Diyetisyen Modülü",
    title_en: "Dietitian Module",
    description_tr:
      "Danışan takibi, beslenme planları ve randevu yönetimi sunan klinik paneli; içinde fizyoterapist modülü de bulunur.",
    description_en:
      "A clinic panel for client tracking, nutrition plans and appointment management — with a built-in physiotherapist module.",
    category: "web",
    year: 2026,
    tags: ["Next.js", "Supabase", "TypeScript"],
    sort_order: 2,
  },
  {
    id: "0b",
    slug: "bimola",
    title_tr: "Bimola — Web Sitesi",
    title_en: "Bimola — Website",
    description_tr:
      "Vercel üzerinde yayınlanan hızlı, modern ve mobil uyumlu web sitesi. (bimola.vercel.app)",
    description_en:
      "A fast, modern and mobile-friendly website deployed on Vercel. (bimola.vercel.app)",
    category: "motion",
    year: 2026,
    tags: ["Next.js", "Vercel", "Tailwind CSS"],
    sort_order: 1,
  },
  {
    id: "1",
    slug: "nova-commerce",
    title_tr: "Nova E-Ticaret Platformu",
    title_en: "Nova Commerce Platform",
    description_tr:
      "Headless mimaride, saniyenin altında açılan çok dilli e-ticaret deneyimi.",
    description_en:
      "A multilingual headless commerce experience with sub-second page loads.",
    category: "web",
    year: 2025,
    tags: ["Next.js", "Stripe", "Supabase"],
    sort_order: 1,
  },
  {
    id: "2",
    slug: "pulse-fitness",
    title_tr: "Pulse Fitness Uygulaması",
    title_en: "Pulse Fitness App",
    description_tr:
      "Kişiselleştirilmiş antrenman planları sunan iOS ve Android uygulaması.",
    description_en:
      "An iOS and Android app delivering personalised training plans.",
    category: "mobile",
    year: 2024,
    tags: ["React Native", "HealthKit"],
    sort_order: 2,
  },
  {
    id: "3",
    slug: "atlas-rebrand",
    title_tr: "Atlas Marka Yenileme",
    title_en: "Atlas Rebrand",
    description_tr:
      "Logo, tipografi ve tasarım sisteminden oluşan uçtan uca marka kimliği.",
    description_en:
      "End-to-end brand identity: logo, typography and a full design system.",
    category: "brand",
    year: 2024,
    tags: ["Identity", "Design System"],
    sort_order: 3,
  },
  {
    id: "4",
    slug: "lumen-ai-assistant",
    title_tr: "Lumen Yapay Zekâ Asistanı",
    title_en: "Lumen AI Assistant",
    description_tr:
      "Şirket içi dokümanlar üzerinde çalışan, kaynak gösteren RAG tabanlı asistan.",
    description_en:
      "A RAG-based assistant over internal docs with cited answers.",
    category: "ai",
    year: 2025,
    tags: ["Claude", "RAG", "Vector Search"],
    sort_order: 4,
  },
];

export async function getProjects(): Promise<Project[]> {
  const supabase = getSupabase();
  if (!supabase) return FALLBACK_PROJECTS;

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, slug, title_tr, title_en, description_tr, description_en, category, year, tags, sort_order",
    )
    .order("sort_order", { ascending: true });

  if (error || !data) return FALLBACK_PROJECTS;
  return data as Project[];
}
