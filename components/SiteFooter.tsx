"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

/* Ana sayfada (kaydırmasız carousel) gizlenir; diğer sayfalarda görünür */
export function SiteFooter() {
  const t = useTranslations("footer");
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <footer className="border-t border-line/60 py-8">
      <p className="mx-auto max-w-6xl px-4 text-sm text-muted sm:px-6">
        © {new Date().getFullYear()} portfolyo. {t("rights")}
      </p>
    </footer>
  );
}
