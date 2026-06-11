"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

function AppMockup() {
  const t = useTranslations("mindnote");
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-surface/80 shadow-[0_24px_80px_-24px_var(--accent)] backdrop-blur">
      <div className="flex items-center gap-1.5 border-b border-line/60 px-5 py-3.5">
        <span className="size-3 rounded-full bg-line" />
        <span className="size-3 rounded-full bg-line" />
        <span className="size-3 rounded-full bg-line" />
        <span className="ml-3 text-xs text-muted">mindnote.tech</span>
      </div>
      <div className="flex min-h-72 text-left sm:min-h-80">
        <div className="hidden w-44 shrink-0 border-r border-line/60 p-4 sm:block">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            {t("mockupSidebar")}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="rounded-lg bg-accent/15 px-2.5 py-1.5 text-accent">
              📁 Product
            </li>
            <li className="px-2.5 py-1.5 text-muted">🧠 Research</li>
            <li className="px-2.5 py-1.5 text-muted">👥 Team</li>
            <li className="px-2.5 py-1.5 text-muted">⚖️ Mevzuat</li>
          </ul>
        </div>
        <div className="flex-1 p-6 sm:p-8">
          <p className="text-lg font-semibold">📄 {t("mockupNote")}</p>
          <div className="mt-5 space-y-3 text-sm text-muted">
            <p className="rounded-lg border border-line/60 bg-bg/50 px-3.5 py-2.5">
              {t("mockupBlock1")}
            </p>
            <p className="rounded-lg border border-accent/40 bg-accent/10 px-3.5 py-2.5 text-accent">
              🔗 {t("mockupBlock2")}
            </p>
            <p className="rounded-lg border border-line/60 bg-bg/50 px-3.5 py-2.5">
              {t("mockupBlock3")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MindnoteShowcase() {
  const t = useTranslations("mindnote");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.94]);

  const features = [
    { emoji: "🧱", title: t("feature1Title"), body: t("feature1Body") },
    { emoji: "🔗", title: t("feature2Title"), body: t("feature2Body") },
    { emoji: "👥", title: t("feature3Title"), body: t("feature3Body") },
    { emoji: "⚖️", title: t("feature4Title"), body: t("feature4Body") },
  ];

  return (
    <article>
      <div ref={heroRef} className="relative h-[120vh]">
        <motion.section
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="sticky top-0 flex h-dvh flex-col items-center justify-center px-4 text-center sm:px-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold tracking-[0.3em] text-accent uppercase"
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-4xl bg-linear-to-b from-fg to-fg/60 bg-clip-text text-5xl leading-[1.05] font-bold tracking-tight text-transparent sm:text-8xl"
          >
            {t("heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-7 max-w-xl text-lg text-muted sm:text-2xl"
          >
            {t("heroSubtitle")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-10 text-sm text-muted"
          >
            {t("scrollHint")} ↓
          </motion.p>
        </motion.section>
      </div>

      <motion.section
        {...reveal}
        className="mx-auto -mt-[20vh] max-w-4xl px-4 sm:px-6"
      >
        <AppMockup />
      </motion.section>

      <section className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6 sm:py-40">
        <motion.h2
          {...reveal}
          className="bg-linear-to-br from-fg to-accent bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl"
        >
          {t("statementTitle")}
        </motion.h2>
        <motion.p {...reveal} className="mt-7 text-lg text-muted sm:text-xl">
          {t("statementBody")}
        </motion.p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-28 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.08 * i }}
              className="rounded-3xl border border-line bg-surface/70 p-8 backdrop-blur hover:border-accent/60 sm:p-10"
            >
              <span className="text-4xl">{feature.emoji}</span>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{feature.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-32 text-center sm:px-6">
        <motion.h2
          {...reveal}
          className="text-3xl font-bold tracking-tight sm:text-5xl"
        >
          {t("ctaTitle")}
        </motion.h2>
        <motion.p {...reveal} className="mt-5 text-muted sm:text-lg">
          {t("ctaBody")}
        </motion.p>
        <motion.div
          {...reveal}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="https://mindnote.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-8 py-4 font-semibold text-accent-fg shadow-[0_0_40px_-10px_var(--accent)] hover:shadow-[0_0_56px_-8px_var(--accent)]"
          >
            {t("ctaButton")} ↗
          </a>
          <Link
            href="/work"
            className="rounded-full border border-line bg-surface/60 px-8 py-4 font-semibold backdrop-blur hover:border-accent"
          >
            {t("backToWork")}
          </Link>
        </motion.div>
      </section>
    </article>
  );
}
