"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

const links = [
  { href: "/", key: "home" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line/40 bg-bg/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3">

        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-base font-bold tracking-tight sm:text-lg"
        >
          portfolyo<span className="text-accent">.</span>
        </Link>

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
