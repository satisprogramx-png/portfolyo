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

function SiteMockup() {
  const t = useTranslations("bimola");
  return (
    <BrowserFrame url={t("mockupNav")}>
      <div className="px-8 py-10 text-center sm:px-14 sm:py-14">
        <div className="mx-auto flex max-w-md items-center justify-center gap-2">
          <span className="h-2 w-16 rounded-full bg-accent/60" />
          <span className="h-2 w-10 rounded-full bg-line" />
          <span className="h-2 w-10 rounded-full bg-line" />
          <span className="h-2 w-10 rounded-full bg-line" />
        </div>
        <p className="mt-10 bg-linear-to-br from-fg to-accent bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
          {t("mockupHeadline")}
        </p>
        <p className="mt-3 text-sm text-muted sm:text-base">{t("mockupSub")}</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-line/60 bg-bg/50 p-5"
            >
              <span className="block h-10 w-10 rounded-xl bg-accent/20" />
              <span className="mt-4 block h-2 w-3/4 rounded-full bg-line" />
              <span className="mt-2 block h-2 w-1/2 rounded-full bg-line/60" />
            </div>
          ))}
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
        <SiteMockup />
      </MockupSlot>

      <Statement title={t("statement1Title")} body={t("statement1Body")} />

      <SplitStatement emoji="⚡" title={t("speedTitle")} body={t("speedBody")} />
      <SplitStatement
        emoji="📱"
        title={t("responsiveTitle")}
        body={t("responsiveBody")}
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
