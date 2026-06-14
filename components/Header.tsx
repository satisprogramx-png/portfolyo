"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

const links = [
  { href: "/", key: "home" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line/40 bg-bg/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3">

        {/* Logo + Tanıtım */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/"
            className="text-base font-bold tracking-tight sm:text-lg"
          >
            portfolyo<span className="text-accent">.</span>
          </Link>
          <Link
            href={{ pathname: "/", query: { intro: "1" } }}
            aria-label={locale === "en" ? "Intro" : "Tanıtım"}
            title={locale === "en" ? "Intro" : "Tanıtım"}
            className="flex size-7 items-center justify-center rounded-full border border-line/60 bg-surface/60 text-[11px] text-muted backdrop-blur transition-colors hover:border-accent hover:text-accent"
          >
            ▶
          </Link>
        </div>

        {/* Nav pill — ortalanmış, mobilde kompakt */}
        <nav className="absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-0.5 rounded-full border border-line/50 bg-surface/60 p-1 shadow-sm backdrop-blur">
            {links.map(({ href, key }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                    active ? "text-accent-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{t(key)}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Dil seçici */}
        <LanguageSwitcher />
      </div>
    </header>
  );
}
