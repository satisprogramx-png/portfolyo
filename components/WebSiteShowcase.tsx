"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTheme } from "./ThemeProvider";

const reveal = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-25% 0px -25% 0px" },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

// İçerik her zaman Türkçe (dil değişse de değişmez)
const SECTIONS = [
  {
    slogan: "İstediğiniz gibi, tam size özel bir web sitesi.",
    body: "Hazır şablon değil; markanıza, hedefinize ve müşterinize göre sıfırdan tasarlanan bir deneyim.",
  },
  {
    slogan: "Tasarımdan içeriğe, her detay sizin isteğinize göre.",
    body: "Renk, tipografi, animasyon ve akış — hepsi sizinle birlikte, sizin zevkinize göre şekillenir.",
  },
  {
    slogan: "Modern, hızlı ve mobil uyumlu.",
    body: "Her ekranda kusursuz görünen, saniyeler içinde açılan ve arama motorlarında öne çıkan siteler.",
  },
  {
    slogan: "İhtiyacınız ne olursa olsun, hayalinizdeki siteyi üretiriz.",
    body: "Kurumsal tanıtım, e-ticaret, rezervasyon ya da özel bir uygulama — fikriniz neyse hayata geçiririz.",
  },
];

export function WebSiteShowcase() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("motion");
  }, [setTheme]);

  return (
    <div className="relative">
      {/* ÖN YÜZ: tam ekran net video + tek slogan */}
      <section className="relative h-[calc(100svh-3.5rem)] w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/web-sitesi-bg.mp4" type="video/mp4" />
        </video>
        {/* Yazı okunsun diye yalnızca alttan çok hafif degrade */}
        <div className="absolute inset-0 bg-linear-to-t from-bg/70 via-transparent to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-16 text-center sm:pb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
            className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.6)] sm:text-6xl"
          >
            Hayalinizdeki web sitesi, tam size özel.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-8 rounded-full bg-white/15 px-4 py-1.5 text-sm text-white backdrop-blur"
          >
            Kaydırın ↓
          </motion.p>
        </div>
      </section>

      {/* SCROLL: video yok, sloganlar + açıklamalar */}
      {SECTIONS.map((s) => (
        <section
          key={s.slogan}
          className="flex min-h-dvh flex-col items-center justify-center bg-bg px-4 text-center sm:px-6"
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
        </section>
      ))}

      {/* KAPANIŞ: iletişim vurgusu */}
      <section className="flex min-h-dvh flex-col items-center justify-center bg-bg px-4 text-center sm:px-6">
        <motion.h2
          {...reveal}
          className="max-w-3xl text-4xl font-bold tracking-tight text-fg sm:text-7xl"
        >
          Projenizi konuşalım.
        </motion.h2>
        <motion.p
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.12 }}
          className="mt-6 max-w-xl text-lg text-muted sm:text-xl"
        >
          Hayalinizdeki web sitesini birlikte üretelim.
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
            İletişime geç →
          </Link>
          <Link
            href="/"
            className="rounded-full border border-line bg-surface/60 px-9 py-4 text-lg font-semibold backdrop-blur hover:border-accent"
          >
            Ana sayfaya dön
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
