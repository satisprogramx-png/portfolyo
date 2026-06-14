"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";

type VideoTour = {
  id: string;
  title: { tr: string; en: string };
  desc: { tr: string; en: string };
  /** Vimeo/embed iframe URL'i (varsa video yerine kullanılır) */
  embed?: string;
  /** Yerel mp4 video yolu */
  video?: string;
  /** Dikey (9:16) format */
  portrait?: boolean;
};

// Projeler buraya eklenir
const TOURS: VideoTour[] = [
  {
    id: "ekici-residence",
    title: { tr: "Ekici Residence", en: "Ekici Residence" },
    desc: {
      tr: "Yapay zekâ ile üretilmiş sinematik iç mekan tanıtım turu.",
      en: "Cinematic interior showcase tour generated with AI.",
    },
    embed:
      "https://player.vimeo.com/video/1200880545?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
  },
  {
    id: "video-edit-6181",
    title: { tr: "İç Mekan Video Turu", en: "Interior Video Tour" },
    desc: {
      tr: "Yapay zekâ destekli, akıcı geçişlerle hazırlanmış iç mekan turu.",
      en: "AI-assisted interior tour with smooth transitions.",
    },
    embed:
      "https://player.vimeo.com/video/1201151688?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
  },
  {
    id: "video-edit-3217",
    title: { tr: "Dikey İç Mekan Turu", en: "Vertical Interior Tour" },
    desc: {
      tr: "Sosyal medyaya uygun, dikey formatta yapay zekâ destekli iç mekan turu.",
      en: "Social-ready vertical AI-assisted interior tour.",
    },
    embed:
      "https://player.vimeo.com/video/1201151753?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479",
    portrait: true,
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
          {tour.embed ? (
            <div
              className={`w-full bg-black ${
                tour.portrait
                  ? "mx-auto aspect-[9/16] max-w-xs"
                  : "aspect-video"
              }`}
            >
              <iframe
                src={tour.embed}
                title={locale === "en" ? tour.title.en : tour.title.tr}
                className="h-full w-full"
                frameBorder={0}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : (
            <video
              src={tour.video}
              controls
              muted
              loop
              playsInline
              preload="metadata"
              className="aspect-video w-full bg-black object-cover"
            />
          )}
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
