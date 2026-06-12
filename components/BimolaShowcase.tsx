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

function BlogMockup() {
  const t = useTranslations("bimola");
  return (
    <BrowserFrame url={t("mockupNav")}>
      <div className="p-5 text-left text-sm sm:p-8">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-accent px-3 py-1 font-medium text-accent-fg">
            {t("mockCat1")}
          </span>
          <span className="rounded-full border border-line px-3 py-1 text-muted">
            {t("mockCat2")}
          </span>
          <span className="rounded-full border border-line px-3 py-1 text-muted">
            {t("mockCat3")}
          </span>
        </div>
        <div className="mt-4 rounded-2xl border border-line/60 bg-linear-to-br from-accent/20 to-bg/60 p-5 sm:p-6">
          <p className="text-base leading-snug font-bold sm:text-xl">
            {t("mockFeatured")}
          </p>
          <p className="mt-2 text-xs text-accent">{t("mockMeta")}</p>
        </div>
        <div className="mt-3 space-y-2.5 text-muted">
          <div className="flex items-center gap-3 rounded-xl border border-line/60 bg-bg/50 px-4 py-3">
            <span className="size-9 shrink-0 rounded-lg bg-accent/20" />
            <div>
              <p className="text-xs font-medium text-fg">{t("mockPost2")}</p>
              <p className="mt-0.5 text-xs">{t("mockMeta2")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-line/60 bg-bg/50 px-4 py-3">
            <span className="size-9 shrink-0 rounded-lg bg-accent/20" />
            <div>
              <p className="text-xs font-medium text-fg">{t("mockPost3")}</p>
              <p className="mt-0.5 text-xs">{t("mockMeta3")}</p>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function BimolaShowcase() {
  const t = useTranslations("bimola");

  return (
    <article>
      <ShowcaseHero
        eyebrow={t("eyebrow")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        scrollHint={t("scrollHint")}
      />
      <MockupSlot>
        <BlogMockup />
      </MockupSlot>

      <Statement title={t("statement1Title")} body={t("statement1Body")} />

      <SplitStatement
        emoji="🩺"
        title={t("topicsTitle")}
        body={t("topicsBody")}
      />
      <SplitStatement
        emoji="🗓️"
        title={t("weeklyTitle")}
        body={t("weeklyBody")}
        flip
      />
      <SplitStatement
        emoji="🎨"
        title={t("designTitle")}
        body={t("designBody")}
      />

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
            href="https://bimola.vercel.app"
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
