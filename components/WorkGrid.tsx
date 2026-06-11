"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import type { Project } from "@/lib/projects";
import type { Category } from "@/lib/themes";
import { CategoryChips } from "./CategoryChips";

export function WorkGrid({ projects }: { projects: Project[] }) {
  const locale = useLocale();
  const t = useTranslations("work");
  const [selected, setSelected] = useState<Category | "all">("all");

  const filtered =
    selected === "all"
      ? projects
      : projects.filter((p) => p.category === selected);

  return (
    <div className="space-y-10">
      <CategoryChips showAll selected={selected} onSelect={setSelected} />
      {filtered.length === 0 ? (
        <p className="text-center text-muted">{t("empty")}</p>
      ) : (
        <motion.ul layout className="grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.li
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-line bg-surface p-6"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                    {project.category}
                  </span>
                  <span className="text-sm text-muted">{project.year}</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold">
                  {locale === "tr" ? project.title_tr : project.title_en}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {locale === "tr"
                    ? project.description_tr
                    : project.description_en}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-bg px-2.5 py-1 text-xs text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
