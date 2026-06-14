"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTheme } from "./ThemeProvider";

const slideFade = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { margin: "-30% 0px -30% 0px" },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

// Sloganlar her zaman Türkçe (dil değişse de değişmez)
const SLOGANS = [
  "İstediğiniz gibi, tam size özel bir web sitesi.",
  "Tasarımdan içeriğe, her detay sizin isteğinize göre.",
  "Modern, hızlı ve mobil uyumlu — markanızın dilinde.",
  "İhtiyacınız ne olursa olsun, hayalinizdeki siteyi üretiriz.",
];

export function WebSiteShowcase() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("motion");
  }, [setTheme]);

  return (
    <div className="relative">
      {/* Tam ekran sabit video arka planı */}
      <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/video/web-sitesi-bg.mp4" type="video/mp4" />
        </video>
        {/* Video net kalsın diye yalnızca çok hafif bir katman */}
        <div className="absolute inset-0 bg-bg/20" />
      </div>

      {/* Açılış: temiz video + kaydırma ipucu (ön yüzde yazı yok) */}
      <section className="flex h-[calc(100svh-3.5rem)] items-end justify-center pb-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="rounded-full bg-bg/40 px-4 py-1.5 text-sm text-fg backdrop-blur"
        >
          Kaydırın ↓
        </motion.p>
      </section>

      {/* Kaydırdıkça beliren sloganlar */}
      {SLOGANS.map((slogan) => (
        <section
          key={slogan}
          className="flex min-h-dvh items-center justify-center px-4 text-center sm:px-6"
        >
          <motion.h2
            {...slideFade}
            className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-fg [text-shadow:0_2px_40px_var(--bg)] sm:text-7xl"
          >
            {slogan}
          </motion.h2>
        </section>
      ))}

      {/* Kapanış: iletişim vurgusu */}
      <section className="flex min-h-dvh flex-col items-center justify-center px-4 text-center sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl text-4xl font-bold tracking-tight text-fg [text-shadow:0_2px_40px_var(--bg)] sm:text-7xl"
        >
          Projenizi konuşalım.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
          className="mt-6 max-w-xl text-lg text-fg/90 [text-shadow:0_2px_30px_var(--bg)] sm:text-xl"
        >
          Hayalinizdeki web sitesini birlikte üretelim.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.24, ease: "easeOut" }}
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
            className="rounded-full border border-line bg-bg/40 px-9 py-4 text-lg font-semibold backdrop-blur hover:border-accent"
          >
            Ana sayfaya dön
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
