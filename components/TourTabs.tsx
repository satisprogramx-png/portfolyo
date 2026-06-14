"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const TABS = [
  { href: "/360-sanal-tur/ai-video", tr: "AI ile Video Tur", en: "AI Video Tour" },
  { href: "/360-sanal-tur/hotpoint", tr: "Hotpoint ile Tur", en: "Hotpoint Tour" },
] as const;

export function TourTabs() {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <nav className="flex justify-center">
      <div className="flex items-center gap-1 rounded-full border border-line/60 bg-surface/50 p-1 backdrop-blur">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-6 sm:text-base ${
                active ? "text-accent-fg" : "text-muted hover:text-fg"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="tour-tab-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative">
                {locale === "en" ? tab.en : tab.tr}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
