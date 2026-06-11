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

function ClinicMockup() {
  const t = useTranslations("diyetisyen");
  return (
    <BrowserFrame url="diyetisyen-paneli">
      <div className="flex min-h-72 text-left sm:min-h-80">
        <div className="hidden w-44 shrink-0 border-r border-line/60 p-4 sm:block">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            {t("mockupSidebar")}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="rounded-lg bg-accent/15 px-2.5 py-1.5 text-accent">
              🥗 Danışanlar
            </li>
            <li className="px-2.5 py-1.5 text-muted">📋 Planlar</li>
            <li className="px-2.5 py-1.5 text-muted">📅 Randevular</li>
            <li className="px-2.5 py-1.5 text-muted">🤸 Fizyoterapi</li>
          </ul>
        </div>
        <div className="flex-1 p-6 sm:p-8">
          <p className="text-lg font-semibold">🗂️ {t("mockupTitle")}</p>
          <div className="mt-5 space-y-3 text-sm text-muted">
            <p className="rounded-lg border border-line/60 bg-bg/50 px-3.5 py-2.5">
              {t("mockupBlock1")}
            </p>
            <p className="rounded-lg border border-accent/40 bg-accent/10 px-3.5 py-2.5 text-accent">
              📅 {t("mockupBlock2")}
            </p>
            <p className="rounded-lg border border-line/60 bg-bg/50 px-3.5 py-2.5">
              🤸 {t("mockupBlock3")}
            </p>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function DiyetisyenShowcase() {
  const t = useTranslations("diyetisyen");

  return (
    <article>
      <ShowcaseHero
        eyebrow={t("eyebrow")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        scrollHint={t("scrollHint")}
      />
      <MockupSlot>
        <ClinicMockup />
      </MockupSlot>

      <Statement title={t("statement1Title")} body={t("statement1Body")} />

      <SplitStatement emoji="🥗" title={t("plansTitle")} body={t("plansBody")} />
      <SplitStatement
        emoji="📅"
        title={t("calendarTitle")}
        body={t("calendarBody")}
        flip
      />
      <SplitStatement
        emoji="🤸"
        title={t("physioTitle")}
        body={t("physioBody")}
      />

      <Statement title={t("privacyTitle")} body={t("privacyBody")} />

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
          <Link
            href="/contact"
            className="rounded-full bg-accent px-8 py-4 font-semibold text-accent-fg shadow-[0_0_40px_-10px_var(--accent)] hover:shadow-[0_0_56px_-8px_var(--accent)]"
          >
            {t("ctaButton")} →
          </Link>
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
