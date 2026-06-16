"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const SITE_URL = "https://deepskyblue-starling-655484.hostingersite.com/";
const SITE_LABEL = "deepskyblue-starling-655484.hostingersite.com";
// Canlı ekran görüntüsü (istemci tarafında üretilir)
const SCREENSHOT = `https://image.thum.io/get/width/1280/crop/900/noanimate/${SITE_URL}`;

const reveal = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20% 0px -20% 0px" },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

export function WebsitePromo() {
  const locale = useLocale();
  const en = locale === "en";

  return (
    <section className="flex min-h-dvh flex-col items-center justify-center bg-bg px-4 py-20 text-center sm:px-6">
      <motion.p
        {...reveal}
        className="text-sm font-semibold tracking-[0.3em] text-accent uppercase"
      >
        {en ? "Live example" : "Canlı örnek"}
      </motion.p>
      <motion.h2
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.08 }}
        className="mt-5 max-w-3xl text-3xl font-bold tracking-tight text-fg sm:text-6xl"
      >
        {en
          ? "A website we built, live now."
          : "Hayata geçirdiğimiz bir web sitesi."}
      </motion.h2>
      <motion.p
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.16 }}
        className="mt-5 max-w-xl text-lg text-muted sm:text-xl"
      >
        {en
          ? "Take a look at one of our real projects and explore it live."
          : "Gerçek projelerimizden birine göz atın, canlı olarak inceleyin."}
      </motion.p>

      {/* Görsel önizleme — tıklanınca siteye gider */}
      <motion.a
        href={SITE_URL}
        target="_blank"
        rel="noopener noreferrer"
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.24 }}
        className="group mt-12 block w-full max-w-4xl overflow-hidden rounded-3xl border border-line bg-surface/70 shadow-[0_30px_90px_-30px_var(--accent)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_36px_110px_-28px_var(--accent)]"
      >
        {/* Tarayıcı çubuğu */}
        <div className="flex items-center gap-1.5 border-b border-line/60 px-5 py-3.5">
          <span className="size-3 rounded-full bg-line" />
          <span className="size-3 rounded-full bg-line" />
          <span className="size-3 rounded-full bg-line" />
          <span className="ml-3 truncate text-xs text-muted">{SITE_LABEL}</span>
        </div>
        {/* Ekran görüntüsü */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg">
          {/* Yüklenene kadar / yüklenemezse zemin */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-accent/25 via-surface to-bg text-sm text-muted"
          >
            {SITE_LABEL}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SCREENSHOT}
            alt={en ? "Website preview" : "Web sitesi önizlemesi"}
            loading="lazy"
            className="relative h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg/40 via-transparent to-transparent"
          />
          <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-fg shadow-[0_0_40px_-10px_var(--accent)]">
            {en ? "Visit site" : "Siteyi ziyaret et"}
            <span className="transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </span>
        </div>
      </motion.a>
    </section>
  );
}
