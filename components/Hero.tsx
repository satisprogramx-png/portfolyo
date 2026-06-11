"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CategoryChips } from "./CategoryChips";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center px-4 text-center sm:px-6">
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-sm text-muted backdrop-blur"
      >
        <span className="pulse-dot inline-block size-2 rounded-full bg-accent" />
        {t("badge")}
      </motion.div>

      <motion.h1
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-4xl bg-linear-to-br from-fg via-fg to-accent bg-clip-text text-5xl leading-[1.08] font-bold tracking-tight text-transparent sm:text-7xl"
      >
        {t("title")}
      </motion.h1>

      <motion.p
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.22 }}
        className="mt-7 max-w-xl text-base text-muted sm:text-lg"
      >
        {t("subtitle")}
      </motion.p>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.34 }}
        className="mt-12"
      >
        <CategoryChips />
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-14 flex flex-col items-center gap-4 sm:flex-row"
      >
        <Link
          href="/work"
          className="group rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-fg shadow-[0_0_36px_-10px_var(--accent)] hover:shadow-[0_0_48px_-8px_var(--accent)]"
        >
          {t("cta")}
          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-line bg-surface/60 px-7 py-3.5 font-semibold backdrop-blur hover:border-accent"
        >
          {t("ctaSecondary")}
        </Link>
      </motion.div>
    </section>
  );
}
