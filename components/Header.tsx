"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

const links = [
  { href: "/", key: "home" },
  { href: "/work", key: "work" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          portfolyo<span className="text-accent">.</span>
        </Link>
        <nav className="flex items-center gap-1 rounded-full border border-line/60 bg-surface/50 p-1 backdrop-blur sm:gap-1.5">
          {links.map(({ href, key }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative rounded-full px-3.5 py-1.5 text-sm ${
                  active ? "text-accent-fg" : "text-muted hover:text-fg"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <span className="relative">{t(key)}</span>
              </Link>
            );
          })}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
