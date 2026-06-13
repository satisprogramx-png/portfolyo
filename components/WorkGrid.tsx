"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/projects";
import { CATEGORIES, type Category } from "@/lib/themes";
import { CategoryChips } from "./CategoryChips";

// Ayrı tanıtım sayfası olan projeler
const CASE_PAGES: Record<string, string> = {
  mindnote: "/work/mindnote",
  "diyetisyen-modulu": "/work/diyetisyen-modulu",
  "fizyoterapist-modulu": "/work/fizyoterapist-modulu",
  bimola: "/work/bimola",
};

export function WorkGrid({ projects }: { projects: Project[] }) {
  const locale = useLocale();
  const t = useTranslations("work");
  const tCat = useTranslations("categories");
  const [selected, setSelected] = useState<Category | "all">("all");

  const filtered =
    selected === "all"
      ? projects
      : projects.filter((p) => p.category === selected);

  // Yalnızca en az bir projesi olan kategorileri filtre olarak göster
  const availableCategories = CATEGORIES.filter((c) =>
    projects.some((p) => p.category === c),
  );

  return (
    <div className="space-y-12">
      <CategoryChips
        showAll
        categories={availableCategories}
        selected={selected}
        onSelect={setSelected}
      />
      {filtered.length === 0 ? (
        <p className="text-center text-muted">{t("empty")}</p>
      ) : (
        <motion.ul layout className="grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => {
              const title =
                locale === "tr" ? project.title_tr : project.title_en;
              const caseHref = CASE_PAGES[project.slug];
              const card = (
                <>
                  <div className="relative flex h-40 items-end overflow-hidden bg-linear-to-br from-accent/25 via-surface to-surface px-6 pb-4 sm:h-48">
                    <span
                      aria-hidden
                      className="absolute -top-6 -right-2 bg-linear-to-br from-accent/40 to-accent/5 bg-clip-text text-[7rem] leading-none font-bold text-transparent select-none sm:text-[9rem]"
                    >
                      {title.charAt(0)}
                    </span>
                    <div className="relative flex w-full items-center justify-between text-sm">
                      <span className="rounded-full border border-line bg-bg/60 px-3 py-1 text-xs font-medium text-accent backdrop-blur">
                        {tCat(project.category)}
                      </span>
                      <span className="text-muted">{project.year}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold tracking-tight group-hover:text-accent">
                      {title}
                    </h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {locale === "tr"
                        ? project.description_tr
                        : project.description_en}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line/60 bg-bg/60 px-2.5 py-1 text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {caseHref && (
                      <p className="mt-5 text-sm font-medium text-accent">
                        {t("viewCase")}
                        <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </p>
                    )}
                  </div>
                </>
              );
              return (
                <motion.li
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-3xl border border-line bg-surface/70 backdrop-blur hover:border-accent/60 hover:shadow-[0_8px_48px_-16px_var(--accent)]"
                >
                  {caseHref ? (
                    <Link href={caseHref} className="block">
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
