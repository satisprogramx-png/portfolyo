"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type { Theme } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";

type Service = { key: string; theme: Theme; emoji: string; href: string };

const SERVICES: Service[] = [
  { key: "tour", theme: "brand", emoji: "🧭", href: "/360-sanal-tur" },
  { key: "genai", theme: "ai", emoji: "✨", href: "/generative-ai" },
  { key: "site", theme: "motion", emoji: "🖥️", href: "/web-sitesi" },
  { key: "webapp", theme: "web", emoji: "💻", href: "/web-uygulamalari" },
  { key: "mobil", theme: "mobile", emoji: "📱", href: "/cep-uygulamasi" },
];

const N = SERVICES.length;

export function HomeCarousel() {
  const t = useTranslations("services");
  const tc = useTranslations("carousel");
  const router = useRouter();
  const { setTheme } = useTheme();
  const [active, setActive] = useState(2);
  const [spread, setSpread] = useState(250);
  const [exiting, setExiting] = useState<Service | null>(null);

  useEffect(() => {
    const onResize = () => setSpread(window.innerWidth < 640 ? 150 : 250);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setTheme(SERVICES[active].theme);
  }, [active, setTheme]);

  const go = (dir: number) => setActive((a) => (a + dir + N) % N);

  const select = (s: Service) => {
    if (exiting) return;
    setExiting(s);
    window.setTimeout(() => router.push(s.href), 650);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="relative h-[calc(100svh-3.5rem)] overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold tracking-[0.35em] text-accent uppercase"
        >
          {tc("kicker")}
        </motion.p>

        <div
          className="relative mt-10 flex h-[22rem] w-full max-w-5xl items-center justify-center"
          style={{ perspective: 1600 }}
        >
          {SERVICES.map((s, i) => {
            let off = i - active;
            if (off > N / 2) off -= N;
            if (off < -N / 2) off += N;
            const abs = Math.abs(off);
            const isCenter = off === 0;
            const visible = abs <= 2;

            return (
              <motion.button
                key={s.key}
                type="button"
                data-theme={s.theme}
                onClick={() => (isCenter ? select(s) : setActive(i))}
                aria-label={t(`${s.key}.title`)}
                animate={{
                  x: off * spread,
                  scale: isCenter ? 1 : abs === 1 ? 0.82 : 0.62,
                  opacity: visible ? (isCenter ? 1 : abs === 1 ? 0.65 : 0.3) : 0,
                  rotateY: off * -18,
                  zIndex: 30 - abs * 10,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ pointerEvents: visible ? "auto" : "none" }}
                className="absolute h-[21rem] w-72 overflow-hidden rounded-[2rem] border border-line bg-surface text-left shadow-[0_30px_80px_-30px_var(--bg)]"
              >
                <div className="flex h-40 items-center justify-center bg-linear-to-br from-accent/40 via-surface to-surface text-6xl">
                  {s.emoji}
                </div>
                <div className="flex flex-col p-6">
                  <h2 className="text-xl font-bold tracking-tight text-fg">
                    {t(`${s.key}.title`)}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {t(`${s.key}.tagline`)}
                  </p>
                  {isCenter && (
                    <span className="mt-5 inline-flex items-center text-sm font-semibold text-accent">
                      {tc("explore")}
                      <span className="ml-1.5">→</span>
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-12 flex items-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Önceki"
            className="flex size-12 items-center justify-center rounded-full border border-line bg-surface/60 text-xl backdrop-blur hover:border-accent hover:text-accent"
          >
            ‹
          </button>
          <div className="flex items-center gap-2">
            {SERVICES.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setActive(i)}
                aria-label={t(`${s.key}.title`)}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-7 bg-accent" : "w-2 bg-line"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Sonraki"
            className="flex size-12 items-center justify-center rounded-full border border-line bg-surface/60 text-xl backdrop-blur hover:border-accent hover:text-accent"
          >
            ›
          </button>
        </div>
      </div>

      <AnimatePresence>
        {exiting && (
          <motion.div
            data-theme={exiting.theme}
            initial={{ clipPath: "circle(0% at 50% 55%)" }}
            animate={{ clipPath: "circle(150% at 50% 55%)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-6xl"
            >
              {exiting.emoji}
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.4 }}
              className="mt-5 bg-linear-to-br from-fg to-accent bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-5xl"
            >
              {t(`${exiting.key}.title`)}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
