"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";

type Example = {
  id: string;
  name: string;
  url: string;
};

// Örnek web siteleri buraya eklenir
const EXAMPLES: Example[] = [
  {
    id: "elite-estates",
    name: "Elite Estates",
    url: "https://deepskyblue-starling-655484.hostingersite.com/",
  },
  {
    id: "pink-gnat",
    name: "Demo Web Sitesi",
    url: "https://pink-gnat-437671.hostingersite.com/",
  },
];

const screenshotOf = (url: string) =>
  `https://image.thum.io/get/width/1280/crop/800/noanimate/${url}`;

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

export function WebsitePromo() {
  const locale = useLocale();
  const en = locale === "en";

  return (
    <section className="bg-bg px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.p
          {...reveal}
          className="text-center text-sm font-semibold tracking-[0.3em] text-accent uppercase"
        >
          {en ? "Live examples" : "Canlı örnekler"}
        </motion.p>
        <motion.h2
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.08 }}
          className="mt-4 text-center text-3xl font-bold tracking-tight text-fg sm:text-5xl"
        >
          {en ? "Our website examples" : "Örnek web sitelerimiz"}
        </motion.h2>
        <motion.p
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.16 }}
          className="mx-auto mt-4 max-w-xl text-center text-lg text-muted"
        >
          {en
            ? "Explore some of our real, live projects."
            : "Gerçek ve canlı projelerimizden bazılarını inceleyin."}
        </motion.p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {EXAMPLES.map((ex, i) => (
            <motion.a
              key={ex.id}
              href={ex.url}
              target="_blank"
              rel="noopener noreferrer"
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.1 + 0.08 * i }}
              className="group block overflow-hidden rounded-3xl border border-line bg-surface/70 shadow-[0_30px_90px_-30px_var(--accent)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_36px_110px_-28px_var(--accent)]"
            >
              {/* Tarayıcı çubuğu */}
              <div className="flex items-center gap-1.5 border-b border-line/60 px-5 py-3.5">
                <span className="size-3 rounded-full bg-line" />
                <span className="size-3 rounded-full bg-line" />
                <span className="size-3 rounded-full bg-line" />
              </div>
              {/* Ekran görüntüsü */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg">
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-accent/25 via-surface to-bg text-sm text-muted"
                >
                  {ex.name}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={screenshotOf(ex.url)}
                  alt={ex.name}
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
              <div className="px-6 py-5">
                <h3 className="text-lg font-semibold tracking-tight group-hover:text-accent">
                  {ex.name}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
