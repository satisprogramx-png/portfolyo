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

/* Bölümlerde öne çıkan gerçek projeler */
const FEATURED: Partial<
  Record<
    (typeof CATEGORIES)[number],
    { nameKey: string; linkKey: string; href: string; external: boolean }
  >
> = {
  web: {
    nameKey: "webProject",
    linkKey: "webProjectLink",
    href: "/work/mindnote",
    external: false,
  },
  motion: {
    nameKey: "motionProject",
    linkKey: "motionProjectLink",
    href: "https://bimola.vercel.app",
    external: true,
  },
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
  const featured = FEATURED[category];

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
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mx-auto mt-10 inline-flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface/60 px-6 py-5 backdrop-blur sm:flex-row sm:gap-5"
          >
            <span className="font-medium">{tHome(featured.nameKey)}</span>
            {featured.external ? (
              <a
                href={featured.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-accent"
              >
                {tHome(featured.linkKey)}
                <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            ) : (
              <Link href={featured.href} className="group text-accent">
                {tHome(featured.linkKey)}
                <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            )}
          </motion.div>
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
