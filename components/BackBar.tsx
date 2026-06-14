"use client";

import { useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

const SERVICES: Record<
  string,
  { href: string; tr: string; en: string }
> = {
  webapp: { href: "/web-uygulamalari", tr: "Web Uygulamaları", en: "Web Apps" },
  genai: { href: "/generative-ai", tr: "Generative AI", en: "Generative AI" },
  tour: { href: "/360-sanal-tur", tr: "360° Sanal Tur", en: "360° Tour" },
  site: { href: "/web-sitesi", tr: "Web Sitesi", en: "Website" },
  mobil: { href: "/cep-uygulamasi", tr: "Cep Uygulaması", en: "Mobile App" },
};

export function BackBar() {
  const locale = useLocale();
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from");
  const target = from ? SERVICES[from] : undefined;

  const label = target
    ? locale === "en"
      ? target.en
      : target.tr
    : locale === "en"
      ? "Back"
      : "Geri";

  const content = (
    <span className="inline-flex items-center gap-2 rounded-full border border-line/70 bg-surface/70 px-4 py-2 text-sm font-medium text-fg shadow-sm backdrop-blur transition-colors hover:border-accent hover:text-accent">
      <span>←</span>
      {label}
    </span>
  );

  return (
    <div className="sticky top-16 z-40 mx-auto max-w-6xl px-4 sm:px-6">
      {target ? (
        <Link href={target.href} aria-label={label}>
          {content}
        </Link>
      ) : (
        <button type="button" onClick={() => router.back()} aria-label={label}>
          {content}
        </button>
      )}
    </div>
  );
}
