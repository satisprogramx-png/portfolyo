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

// Duman bulutları — ekrana yayılan yumuşak puflar
const PUFFS = [
  { x: "12%", y: "62%", size: 60, delay: 0, drift: -40 },
  { x: "78%", y: "58%", size: 66, delay: 0.04, drift: 50 },
  { x: "32%", y: "40%", size: 54, delay: 0.08, drift: -30 },
  { x: "62%", y: "38%", size: 58, delay: 0.06, drift: 35 },
  { x: "48%", y: "72%", size: 70, delay: 0, drift: 0 },
  { x: "22%", y: "82%", size: 52, delay: 0.12, drift: -25 },
  { x: "84%", y: "84%", size: 56, delay: 0.1, drift: 30 },
  { x: "50%", y: "50%", size: 80, delay: 0, drift: 0 },
  { x: "8%", y: "30%", size: 50, delay: 0.14, drift: -45 },
  { x: "90%", y: "28%", size: 50, delay: 0.14, drift: 45 },
];

export function HomeCarousel() {
  const t = useTranslations("services");
  const tc = useTranslations("carousel");
  const router = useRouter();
  const { setTheme } = useTheme();
  const [active, setActive] = useState(2);
  const [spread, setSpread] = useState(250);
  const [exiting, setExiting] = useState<Service | null>(null);

  useEffect(() => {
    const onResize = () => setSpread(window.innerWidth < 640 ? 180 : 340);
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
    window.setTimeout(() => router.push(s.href), 900);
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
          className="relative mt-8 flex h-[28rem] w-full max-w-6xl items-center justify-center"
          style={{ perspective: 1800 }}
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
                className="absolute h-[27rem] w-80 overflow-hidden rounded-[2.25rem] border border-line bg-surface text-left shadow-[0_30px_80px_-30px_var(--bg)] sm:w-96"
              >
                <div className="flex h-52 items-center justify-center bg-linear-to-br from-accent/40 via-surface to-surface text-7xl sm:text-8xl">
                  {s.emoji}
                </div>
                <div className="flex flex-col p-7 sm:p-8">
                  <h2 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                    {t(`${s.key}.title`)}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {t(`${s.key}.tagline`)}
                  </p>
                  {isCenter && (
                    <span className="mt-6 inline-flex items-center text-base font-semibold text-accent">
                      {tc("explore")}
                      <span className="ml-1.5">→</span>
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-10 flex items-center gap-6">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Duman bulutları */}
            {PUFFS.map((p, i) => (
              <motion.span
                key={i}
                aria-hidden
                initial={{ opacity: 0, scale: 0.2, x: 0, y: 20 }}
                animate={{
                  opacity: [0, 0.85, 0.95],
                  scale: [0.2, 1.4, 2.2],
                  x: p.drift,
                  y: [20, -10, -30],
                }}
                transition={{
                  duration: 0.85,
                  delay: p.delay,
                  ease: "easeOut",
                  times: [0, 0.5, 1],
                }}
                style={{
                  left: p.x,
                  top: p.y,
                  width: `${p.size}vmax`,
                  height: `${p.size}vmax`,
                  background:
                    "radial-gradient(circle at 50% 50%, var(--surface) 0%, color-mix(in oklch, var(--accent) 30%, var(--bg)) 35%, transparent 70%)",
                  filter: "blur(40px)",
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              />
            ))}

            {/* Dumanı yoğunlaştıran arka katman */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeIn" }}
              className="absolute inset-0 bg-bg"
            />

            {/* Hizmet başlığı dumanın içinden belirir */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.45, duration: 0.45 }}
              className="relative text-6xl"
            >
              {exiting.emoji}
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.55, duration: 0.45 }}
              className="relative mt-5 bg-linear-to-br from-fg to-accent bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-5xl"
            >
              {t(`${exiting.key}.title`)}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
