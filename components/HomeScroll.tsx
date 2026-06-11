"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CATEGORIES, type Theme } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";

/* Bölüm görünüme girince tüm site temasını o kategoriye morph eder */
function useThemeOnView(theme: Theme) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  const { setTheme } = useTheme();

  useEffect(() => {
    if (inView) setTheme(theme);
  }, [inView, theme, setTheme]);

  return ref;
}

function HeroSection() {
  const t = useTranslations("hero");
  const ref = useThemeOnView("default");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.9], [1, 0.95]);

  return (
    <section ref={ref} className="relative h-[130vh]">
      <motion.div
        style={{ opacity, scale }}
        className="sticky top-0 flex h-dvh flex-col items-center justify-center px-4 text-center sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-sm text-muted backdrop-blur"
        >
          <span className="pulse-dot inline-block size-2 rounded-full bg-accent" />
          {t("badge")}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl bg-linear-to-br from-fg via-fg to-accent bg-clip-text text-5xl leading-[1.08] font-bold tracking-tight text-transparent sm:text-7xl"
        >
          {t("title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-7 max-w-xl text-base text-muted sm:text-lg"
        >
          {t("subtitle")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="absolute bottom-10 text-sm text-muted"
        >
          {t("scrollHint")} ↓
        </motion.p>
      </motion.div>
    </section>
  );
}

/* Bölümlerde satır içi tanıtılan gerçek projeler (link yok) */
const SHOWCASES: Partial<
  Record<
    (typeof CATEGORIES)[number],
    Array<{ emoji: string; nameKey: string; sloganKey: string; descKey: string }>
  >
> = {
  web: [
    {
      emoji: "🧠",
      nameKey: "webShowcase1Name",
      sloganKey: "webShowcase1Slogan",
      descKey: "webShowcase1Desc",
    },
    {
      emoji: "🥗",
      nameKey: "webShowcase2Name",
      sloganKey: "webShowcase2Slogan",
      descKey: "webShowcase2Desc",
    },
    {
      emoji: "🤸",
      nameKey: "webShowcase3Name",
      sloganKey: "webShowcase3Slogan",
      descKey: "webShowcase3Desc",
    },
  ],
  motion: [
    {
      emoji: "🌐",
      nameKey: "motionShowcase1Name",
      sloganKey: "motionShowcase1Slogan",
      descKey: "motionShowcase1Desc",
    },
  ],
};

function CategorySection({
  category,
  index,
}: {
  category: (typeof CATEGORIES)[number];
  index: number;
}) {
  const tCat = useTranslations("categories");
  const tHome = useTranslations("home");
  const ref = useThemeOnView(category);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const showcases = SHOWCASES[category];

  return (
    <section
      ref={ref}
      className="flex min-h-dvh flex-col items-center justify-center px-4 text-center sm:px-6"
    >
      <motion.div style={{ y }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold tracking-[0.35em] text-accent uppercase"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-5 bg-linear-to-b from-fg to-accent bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-9xl"
        >
          {tCat(category)}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mx-auto mt-7 max-w-md text-lg text-muted sm:text-xl"
        >
          {tHome(`${category}Tagline`)}
        </motion.p>
        {showcases && (
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]">
            {showcases.map((item, i) => (
              <motion.div
                key={item.nameKey}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, delay: 0.28 + 0.1 * i }}
                className="rounded-2xl border border-line bg-surface/60 px-6 py-6 text-center backdrop-blur"
              >
                <span className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-line bg-linear-to-br from-accent/25 to-surface text-3xl shadow-[0_8px_32px_-12px_var(--accent)]">
                  {item.emoji}
                </span>
                <p className="mt-4 font-semibold text-accent">
                  {tHome(item.nameKey)}
                </p>
                <p className="mt-1 text-sm font-medium">
                  {tHome(item.sloganKey)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {tHome(item.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

function OutroSection() {
  const t = useTranslations("home");
  const ref = useThemeOnView("default");

  return (
    <section
      ref={ref}
      className="flex min-h-dvh flex-col items-center justify-center px-4 text-center sm:px-6"
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7 }}
        className="bg-linear-to-br from-fg to-accent bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-7xl"
      >
        {t("outroTitle")}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, delay: 0.12 }}
        className="mt-6 max-w-md text-muted sm:text-lg"
      >
        {t("outroBody")}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, delay: 0.24 }}
        className="mt-10 flex items-center gap-8 text-lg font-medium"
      >
        <Link
          href="/work"
          className="group text-accent underline-offset-8 hover:underline"
        >
          {t("outroWork")}
          <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
        <Link
          href="/contact"
          className="group underline-offset-8 hover:text-accent hover:underline"
        >
          {t("outroContact")}
          <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </motion.div>
    </section>
  );
}

export function HomeScroll() {
  return (
    <div>
      <HeroSection />
      {CATEGORIES.map((category, i) => (
        <CategorySection key={category} category={category} index={i} />
      ))}
      <OutroSection />
    </div>
  );
}
