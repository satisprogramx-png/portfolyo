"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Theme } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";

const reveal = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-25% 0px -25% 0px" },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

export type ShowcaseSection = { slogan: string; body: string };

export type LocalizedContent = {
  heroTitle: string;
  heroLeft?: string;
  heroRight?: string;
  sections: ShowcaseSection[];
  closingTitle?: string;
  closingBody?: string;
};

export type VideoShowcaseProps = {
  theme: Theme;
  video: string;
  /** Sol etiketine basınca tam ekran oynatılacak video (verilirse etiket tıklanabilir olur) */
  heroLeftVideo?: string;
  tr: LocalizedContent;
  en: LocalizedContent;
};

export function VideoShowcase({
  theme,
  video,
  heroLeftVideo,
  tr,
  en,
}: VideoShowcaseProps) {
  const { setTheme } = useTheme();
  const locale = useLocale();
  const c = locale === "en" ? en : tr;
  const [playerOpen, setPlayerOpen] = useState(false);

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  const scrollLabel = locale === "en" ? "Scroll ↓" : "Kaydırın ↓";

  return (
    <div className="relative">
      {/* Hero: full-screen video + single headline */}
      <section className="relative h-[calc(100svh-3.5rem)] w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-t from-bg/70 via-transparent to-transparent" />

        {/* Hero yan etiketleri (sol / sağ) */}
        {(c.heroLeft || c.heroRight) && (
          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-4 sm:px-10">
            {c.heroLeft ? (
              <motion.button
                type="button"
                disabled={!heroLeftVideo}
                onClick={() => heroLeftVideo && setPlayerOpen(true)}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                className={`pointer-events-auto max-w-[42%] rounded-2xl border border-white/20 bg-black/30 px-3 py-2.5 text-left backdrop-blur-md transition-colors sm:px-5 sm:py-4 ${
                  heroLeftVideo ? "cursor-pointer hover:border-white/60 hover:bg-black/45" : ""
                }`}
              >
                <span className="block text-[10px] font-semibold tracking-[0.25em] text-white/60 uppercase sm:text-xs">
                  01
                </span>
                <span className="mt-1 block text-base font-bold leading-tight text-white sm:text-2xl">
                  {c.heroLeft}
                </span>
                {heroLeftVideo && (
                  <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-white/80 sm:text-sm">
                    <span className="flex size-5 items-center justify-center rounded-full bg-white/20">▶</span>
                    {locale === "en" ? "Watch" : "İzle"}
                  </span>
                )}
              </motion.button>
            ) : (
              <span />
            )}
            {c.heroRight ? (
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85, duration: 0.8, ease: "easeOut" }}
                className="max-w-[42%] rounded-2xl border border-white/20 bg-black/30 px-3 py-2.5 text-right backdrop-blur-md sm:px-5 sm:py-4"
              >
                <span className="block text-[10px] font-semibold tracking-[0.25em] text-white/60 uppercase sm:text-xs">
                  02
                </span>
                <span className="mt-1 block text-base font-bold leading-tight text-white sm:text-2xl">
                  {c.heroRight}
                </span>
              </motion.div>
            ) : (
              <span />
            )}
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-16 text-center sm:pb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
            className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.6)] sm:text-6xl"
          >
            {c.heroTitle}
          </motion.h1>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            onClick={() =>
              window.scrollTo({ top: window.innerHeight - 56, behavior: "smooth" })
            }
            className="mt-8 rounded-full bg-white/15 px-4 py-1.5 text-sm text-white backdrop-blur transition-colors hover:bg-white/25"
          >
            {scrollLabel}
          </motion.button>
        </div>
      </section>

      {/* Scroll sections */}
      {c.sections.map((s) => (
        <section
          key={s.slogan}
          className="relative flex min-h-dvh flex-col items-center justify-center bg-bg px-4 text-center sm:px-6"
        >
          <motion.h2
            {...reveal}
            className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-fg sm:text-7xl"
          >
            {s.slogan}
          </motion.h2>
          <motion.p
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.15 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-2xl"
          >
            {s.body}
          </motion.p>
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() =>
              window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
            }
            className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-sm text-muted backdrop-blur transition-colors hover:border-accent hover:text-accent"
          >
            {scrollLabel}
          </motion.button>
        </section>
      ))}

      {/* CTA closing */}
      <section className="flex min-h-dvh flex-col items-center justify-center bg-bg px-4 text-center sm:px-6">
        <motion.h2
          {...reveal}
          className="max-w-3xl text-4xl font-bold tracking-tight text-fg sm:text-7xl"
        >
          {c.closingTitle ?? (locale === "en" ? "Let's talk about your project." : "Projenizi konuşalım.")}
        </motion.h2>
        <motion.p
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.12 }}
          className="mt-6 max-w-xl text-lg text-muted sm:text-xl"
        >
          {c.closingBody ?? (locale === "en" ? "Let's bring your vision to life together." : "Hayalinizdeki projeyi birlikte hayata geçirelim.")}
        </motion.p>
        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.24 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="rounded-full bg-accent px-9 py-4 text-lg font-semibold text-accent-fg shadow-[0_0_50px_-10px_var(--accent)] hover:shadow-[0_0_70px_-8px_var(--accent)]"
          >
            {locale === "en" ? "Get in touch →" : "İletişime geç →"}
          </Link>
          <Link
            href="/"
            className="rounded-full border border-line bg-surface/60 px-9 py-4 text-lg font-semibold backdrop-blur hover:border-accent"
          >
            {locale === "en" ? "Back to home" : "Ana sayfaya dön"}
          </Link>
        </motion.div>
      </section>

      {/* AI video tour — tam ekran oynatıcı */}
      <AnimatePresence>
        {playerOpen && heroLeftVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setPlayerOpen(false)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => setPlayerOpen(false)}
              aria-label={locale === "en" ? "Close" : "Kapat"}
              className="absolute top-5 right-5 flex size-11 items-center justify-center rounded-full border border-white/30 text-xl text-white transition-colors hover:bg-white/15"
            >
              ✕
            </button>
            <motion.div
              key="player"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl"
            >
              <video
                src={heroLeftVideo}
                autoPlay
                muted
                loop
                controls
                playsInline
                className="h-auto max-h-[85vh] w-full rounded-2xl bg-black shadow-2xl"
              />
              <p className="mt-3 text-center text-sm text-white/70">
                {locale === "en"
                  ? "Tap the speaker icon to unmute."
                  : "Sesi açmak için hoparlör simgesine dokunun."}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
