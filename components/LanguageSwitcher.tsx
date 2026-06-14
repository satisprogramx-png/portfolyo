"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("language");

  return (
    <div
      role="group"
      aria-label={t("switch")}
      className="flex shrink-0 items-center gap-0.5 rounded-full border border-line/50 bg-surface/60 p-1 shadow-sm backdrop-blur"
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          aria-pressed={l === locale}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors sm:px-3 ${
            l === locale
              ? "bg-accent text-accent-fg"
              : "text-muted hover:text-fg"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
