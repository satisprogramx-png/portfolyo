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
    sort_order: 1,
  },
  {
    id: "0d",
    slug: "fizyoterapist-modulu",
    title_tr: "Fizyoterapist Modülü",
    title_en: "Physiotherapist Module",
    description_tr:
      "Egzersiz programları, seans takibi ve ilerleme notları sunan klinik modülü; diyetisyen paneliyle entegre çalışır.",
    description_en:
      "A clinic module for exercise programmes, session tracking and progress notes — integrated with the dietitian panel.",
    category: "web",
    year: 2026,
    tags: ["Next.js", "Supabase", "TypeScript"],
    sort_order: 2,
  },
  {
    id: "0e",
    slug: "ekici-residence",
    title_tr: "Ekici Residence — AI Tanıtım Filmi",
    title_en: "Ekici Residence — AI Promo Film",
    description_tr:
      "Yapay zekâ ile üretilmiş konut projesi tanıtım filmi; sinematik kurgu ve AI görüntü üretimi.",
    description_en:
      "An AI-generated promo film for a residential project; cinematic editing with AI-generated footage.",
    category: "ai",
    year: 2026,
    tags: ["AI Video", "Tanıtım", "Vimeo"],
    sort_order: 3,
  },
  {
    id: "0b",
    slug: "bimola",
    title_tr: "Bi'Mola Zamanı — Sağlık Blogu",
    title_en: "Bi'Mola Zamanı — Health Blog",
    description_tr:
      "Beslenme, sağlık ve iş sağlığı üzerine haftalık, bilimsel kaynaklı yazılar yayımlayan kişisel blog. (bimola.vercel.app)",
    description_en:
      "A personal blog publishing weekly, science-backed articles on nutrition, health and workplace health. (bimola.vercel.app)",
    category: "motion",
    year: 2026,
    tags: ["Blog", "Sağlık", "Vercel"],
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
