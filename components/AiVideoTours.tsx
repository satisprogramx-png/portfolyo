"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";

type VideoTour = {
  id: string;
  title: { tr: string; en: string };
  desc: { tr: string; en: string };
  video: string;
};

// Projeler buraya eklenir
const TOURS: VideoTour[] = [
  {
    id: "demo-1",
    title: { tr: "Örnek İç Mekan Turu", en: "Sample Interior Tour" },
    desc: {
      tr: "Yapay zekâ ile üretilmiş fotorealistik iç mekan video turu.",
      en: "Photorealistic interior video tour generated with AI.",
    },
    video: "/video/360-sanal-tur-bg.mp4",
  },
];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export function AiVideoTours() {
  const locale = useLocale();

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {TOURS.map((tour, i) => (
        <motion.article
          key={tour.id}
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.06 * i }}
          className="overflow-hidden rounded-3xl border border-line bg-surface/60 backdrop-blur"
        >
          <video
            src={tour.video}
            controls
            muted
            loop
            playsInline
            preload="metadata"
            className="aspect-video w-full bg-black object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold tracking-tight">
              {locale === "en" ? tour.title.en : tour.title.tr}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {locale === "en" ? tour.desc.en : tour.desc.tr}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
