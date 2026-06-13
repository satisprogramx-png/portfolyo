"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ShowcaseHero, SplitStatement, Statement, reveal } from "./showcase";

function VideoWall() {
  const t = useTranslations("ekici");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ method: "setVolume", value: next ? 0 : 1 }),
      "https://player.vimeo.com",
    );
  };

  return (
    <motion.section
      {...reveal}
      className="mx-auto -mt-[12vh] max-w-6xl px-4 sm:px-6"
    >
      <div
        style={{
          boxShadow:
            "0 40px 90px -30px var(--bg), 0 1px 0 1px color-mix(in oklab, var(--fg) 8%, transparent)",
        }}
        className="rounded-[2.4rem] border border-line bg-linear-to-b from-surface to-bg p-3 sm:p-5"
      >
        <div
          style={{
            boxShadow:
              "inset 0 34px 70px -12px var(--bg), inset 0 -16px 44px -16px var(--bg), inset 0 0 0 1px var(--line)",
          }}
          className="relative overflow-hidden rounded-[1.6rem] bg-bg"
        >
          <div className="pointer-events-none aspect-video">
            <iframe
              ref={iframeRef}
              src="https://player.vimeo.com/video/1200880545?background=1&autoplay=1&loop=1&muted=1&app_id=58479"
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Ekici Residence"
            />
          </div>
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={!muted}
            aria-label={muted ? t("videoUnmute") : t("videoMute")}
            className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full border border-line bg-bg/70 px-4 py-2 text-sm font-medium backdrop-blur hover:border-accent hover:text-accent"
          >
            <span aria-hidden>{muted ? "🔇" : "🔊"}</span>
            {muted ? t("videoUnmute") : t("videoMute")}
          </button>
        </div>
      </div>
    </motion.section>
  );
}

export function EkiciShowcase() {
  const t = useTranslations("ekici");

  return (
    <article>
      <ShowcaseHero
        eyebrow={t("eyebrow")}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        scrollHint={t("scrollHint")}
      />
      <VideoWall />

      <Statement title={t("statement1Title")} body={t("statement1Body")} />

      <SplitStatement emoji="✨" title={t("aiTitle")} body={t("aiBody")} />
      <SplitStatement
        emoji="🎬"
        title={t("editTitle")}
        body={t("editBody")}
        flip
      />
      <SplitStatement emoji="🏢" title={t("useTitle")} body={t("useBody")} />

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
