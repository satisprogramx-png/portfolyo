"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  BrowserFrame,
  MockupSlot,
  ShowcaseHero,
  SplitStatement,
  Statement,
  reveal,
} from "./showcase";

function AppMockup() {
  const t = useTranslations("mindnote");
  return (
    <BrowserFrame url="mindnote.tech">
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
    </BrowserFrame>
  );
}

export function MindnoteShowcase() {
  const t = useTranslations("mindnote");

  const features = [
    { emoji: "🧱", title: t("feature1Title"), body: t("feature1Body") },
    { emoji: "🔗", title: t("feature2Title"), body: t("feature2Body") },
    { emoji: "👥", title: t("feature3Title"), body: t("feature3Body") },
    { emoji: "⚖️", title: t("feature4Title"), body: t("feature4Body") },
  ];

  return (
    <article>
      <ShowcaseHero
        eyebrow={t("eyebrow")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        scrollHint={t("scrollHint")}
      />
      <MockupSlot>
        <AppMockup />
      </MockupSlot>

      <Statement title={t("slogan1Title")} body={t("slogan1Body")} />
      <Statement title={t("statementTitle")} body={t("statementBody")} />

      <SplitStatement
        emoji="🕸️"
        title={t("graphTitle")}
        body={t("graphBody")}
      />
      <SplitStatement
        emoji="⚡"
        title={t("perfTitle")}
        body={t("perfBody")}
        flip
      />
      <SplitStatement
        emoji="🤝"
        title={t("teamsTitle")}
        body={t("teamsBody")}
      />
      <SplitStatement
        emoji="✨"
        title={t("aiTitle")}
        body={t("aiBody")}
        flip
      />

      <section className="mx-auto max-w-6xl px-4 py-12 pb-28 sm:px-6">
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

      <Statement title={t("privacyTitle")} body={t("privacyBody")} />
      <SplitStatement
        emoji="📱"
        title={t("everywhereTitle")}
        body={t("everywhereBody")}
        flip
      />

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <motion.p
          {...reveal}
          className="text-sm font-semibold tracking-[0.3em] text-accent uppercase"
        >
          {t("chipsTitle")}
        </motion.p>
        <motion.div
          {...reveal}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {(
            [
              "chip1",
              "chip2",
              "chip3",
              "chip4",
              "chip5",
              "chip6",
              "chip7",
              "chip8",
              "chip9",
            ] as const
          ).map((key) => (
            <span
              key={key}
              className="rounded-full border border-line bg-surface/60 px-4 py-2 text-sm backdrop-blur"
            >
              {t(key)}
            </span>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 pb-32 text-center sm:px-6">
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
