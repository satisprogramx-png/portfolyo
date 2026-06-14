"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";

const INTRO_VIDEO =
  "https://player.vimeo.com/video/1201168388?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&controls=0&dnt=1";

const SLOGAN = {
  tr: "Dijital dünyada markanıza hayat veriyoruz.",
  en: "We bring your brand to life in the digital world.",
};

export function IntroSplash() {
  const locale = useLocale();
  const [show, setShow] = useState(false);
  const [playing, setPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("introSeen");
    if (!seen) setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  const post = (method: string, value?: number) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify(value === undefined ? { method } : { method, value }),
      "*",
    );
  };

  useEffect(() => {
    if (!show) return;
    const onMsg = (e: MessageEvent) => {
      if (typeof e.origin === "string" && !e.origin.includes("vimeo")) return;
      let data: { event?: string };
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (data.event === "ready") {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ method: "addEventListener", value: "play" }),
          "*",
        );
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ method: "addEventListener", value: "pause" }),
          "*",
        );
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ method: "addEventListener", value: "ended" }),
          "*",
        );
      } else if (data.event === "play") {
        setPlaying(true);
      } else if (data.event === "pause" || data.event === "ended") {
        setPlaying(false);
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [show]);

  const toggle = () => (playing ? post("pause") : post("play"));
  const restart = () => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ method: "setCurrentTime", value: 0 }),
      "*",
    );
    post("play");
  };

  const enter = () => {
    sessionStorage.setItem("introSeen", "1");
    setShow(false);
  };

  const btn =
    "flex size-12 items-center justify-center rounded-full border border-line bg-surface/70 text-lg text-fg backdrop-blur transition-colors hover:border-accent hover:text-accent";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 overflow-hidden bg-bg px-4 py-8 sm:gap-8 sm:px-6"
        >
          {/* Arka plan ışıması */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 50% 35%, var(--accent), transparent 60%)",
            }}
          />

          {/* Slogan */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="relative max-w-3xl text-center text-2xl font-bold leading-tight tracking-tight text-fg sm:text-5xl"
          >
            {locale === "en" ? SLOGAN.en : SLOGAN.tr}
          </motion.h1>

          {/* Gömülü avatar videosu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-black shadow-[0_40px_120px_-30px_var(--accent)]"
          >
            <iframe
              ref={iframeRef}
              src={INTRO_VIDEO}
              title="Intro"
              className="pointer-events-none h-full w-full"
              frameBorder={0}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </motion.div>

          {/* Yalnızca başlat/durdur ve başa al */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="relative flex items-center gap-4"
          >
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Durdur" : "Başlat"}
              className={btn}
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <button
              type="button"
              onClick={restart}
              aria-label={locale === "en" ? "Restart" : "Başa al"}
              className={btn}
            >
              ↺
            </button>
          </motion.div>

          {/* Ana sayfaya geç */}
          <motion.button
            type="button"
            onClick={enter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
            className="relative inline-flex items-center gap-2 rounded-full bg-accent px-9 py-4 text-lg font-semibold text-accent-fg shadow-[0_0_50px_-10px_var(--accent)] transition-shadow hover:shadow-[0_0_70px_-8px_var(--accent)]"
          >
            {locale === "en" ? "Enter the site" : "Siteye gir"}
            <span>→</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
