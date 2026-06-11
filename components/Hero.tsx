"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CategoryChips } from "./CategoryChips";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center px-4 text-center sm:px-6">
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl"
      >
        {t("title")}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-6 max-w-xl text-base text-muted sm:text-lg"
      >
        {t("subtitle")}
      </motion.p>
      <div className="mt-10">
        <CategoryChips />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12"
      >
        <Link
          href="/work"
          className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-fg hover:opacity-90"
        >
          {t("cta")}
        </Link>
      </motion.div>
    </section>
  );
}
