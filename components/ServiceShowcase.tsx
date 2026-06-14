"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/projects";
import type { Theme } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

const CASE_PAGES: Record<string, string> = {
  mindnote: "/work/mindnote",
  "diyetisyen-modulu": "/work/diyetisyen-modulu",
  "fizyoterapist-modulu": "/work/fizyoterapist-modulu",
  "ekici-residence": "/work/ekici-residence",
  bimola: "/work/bimola",
};

export function ServiceShowcase({
  serviceKey,
  emoji,
  theme,
  related,
  bgVideo,
}: {
  serviceKey: string;
  emoji: string;
  theme: Theme;
  related: Project[];
  bgVideo?: string;
}) {
  const t = useTranslations("services");
  const locale = useLocale();
  const { setTheme } = useTheme();
  const k = (suffix: string) => t(`${serviceKey}.${suffix}`);

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  const features = [
    { title: k("f1Title"), body: k("f1Body") },
    { title: k("f2Title"), body: k("f2Body") },
    { title: k("f3Title"), body: k("f3Body") },
  ];

  return (
    <article className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
      {bgVideo && (
        <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-bg/70 backdrop-blur-[2px]" />
        </div>
      )}
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex size-20 items-center justify-center rounded-3xl border border-line bg-linear-to-br from-accent/30 to-surface text-5xl shadow-[0_16px_64px_-24px_var(--accent)]"
      >
        {emoji}
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-8 max-w-3xl bg-linear-to-br from-fg to-accent bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-7xl"
      >
        {k("tagline")}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-6 max-w-2xl text-lg text-muted sm:text-xl"
      >
        {k("subtitle")}
      </motion.p>

      <div className="mt-20 grid gap-6 sm:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.08 * i }}
            className="rounded-3xl border border-line bg-surface/60 p-7 backdrop-blur"
          >
            <h3 className="text-xl font-semibold tracking-tight">{f.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{f.body}</p>
          </motion.div>
        ))}
      </div>

      {related.length > 0 && (
        <div className="mt-24">
          <motion.h2
            {...reveal}
            className="text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {t("common.related")}
          </motion.h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {related.map((p, i) => (
              <motion.div
                key={p.slug}
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.06 * i }}
              >
                <Link
                  href={CASE_PAGES[p.slug] ?? "/work"}
                  className="group block rounded-3xl border border-line bg-surface/60 p-7 backdrop-blur hover:border-accent/60 hover:shadow-[0_8px_48px_-16px_var(--accent)]"
                >
                  <h3 className="text-xl font-semibold tracking-tight group-hover:text-accent">
                    {locale === "tr" ? p.title_tr : p.title_en}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {locale === "tr" ? p.description_tr : p.description_en}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-accent">
                    {t("common.related")}
                    <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-24 rounded-3xl border border-line bg-surface/60 p-8 text-center backdrop-blur sm:p-12">
        <motion.h2
          {...reveal}
          className="text-2xl font-bold tracking-tight sm:text-4xl"
        >
          {k("ctaTitle")}
        </motion.h2>
        <motion.p {...reveal} className="mt-4 text-muted sm:text-lg">
          {k("ctaBody")}
        </motion.p>
        <motion.div
          {...reveal}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="rounded-full bg-accent px-8 py-4 font-semibold text-accent-fg shadow-[0_0_40px_-10px_var(--accent)] hover:shadow-[0_0_56px_-8px_var(--accent)]"
          >
            {t("common.ctaButton")} →
          </Link>
          <Link
            href="/"
            className="rounded-full border border-line bg-surface/60 px-8 py-4 font-semibold backdrop-blur hover:border-accent"
          >
            {t("common.backHome")}
          </Link>
        </motion.div>
      </div>
    </article>
  );
}
