"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useTheme } from "./ThemeProvider";
import { TourTabs } from "./TourTabs";

export function TourLayout({
  title,
  subtitle,
  children,
}: {
  title: { tr: string; en: string };
  subtitle: { tr: string; en: string };
  children: React.ReactNode;
}) {
  const { setTheme } = useTheme();
  const locale = useLocale();

  useEffect(() => {
    setTheme("brand");
  }, [setTheme]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <Link
        href="/360-sanal-tur"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
      >
        <span>←</span>
        {locale === "en" ? "360° Tour" : "360° Tur"}
      </Link>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-5 bg-linear-to-br from-fg to-accent bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-5xl"
      >
        {locale === "en" ? title.en : title.tr}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="mt-3 max-w-2xl text-base text-muted sm:text-lg"
      >
        {locale === "en" ? subtitle.en : subtitle.tr}
      </motion.p>

      <div className="mt-8">
        <TourTabs />
      </div>

      <div className="mt-12">{children}</div>
    </div>
  );
}
