"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const EDU_ITEMS = [
  { emoji: "🎬", titleKey: "edu1Title", descKey: "edu1Desc" },
  { emoji: "🌍", titleKey: "edu2Title", descKey: "edu2Desc" },
  { emoji: "👄", titleKey: "edu3Title", descKey: "edu3Desc" },
  { emoji: "✨", titleKey: "edu4Title", descKey: "edu4Desc" },
  { emoji: "🚀", titleKey: "edu5Title", descKey: "edu5Desc" },
  { emoji: "💻", titleKey: "edu6Title", descKey: "edu6Desc" },
  { emoji: "🏗️", titleKey: "edu7Title", descKey: "edu7Desc" },
] as const;

export function EducationCards() {
  const tHome = useTranslations("home");

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {EDU_ITEMS.map((item, i) => (
        <motion.div
          key={item.titleKey}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.05 * i }}
          className="rounded-3xl border border-line bg-surface/60 p-7 backdrop-blur hover:border-accent/60"
        >
          <span className="flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-accent/25 to-surface text-3xl shadow-[0_8px_32px_-12px_var(--accent)]">
            {item.emoji}
          </span>
          <h3 className="mt-5 text-xl font-semibold tracking-tight">
            {tHome(item.titleKey)}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {tHome(item.descKey)}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
