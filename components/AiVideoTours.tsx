"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "next-intl";

// Vimeo'yu yalnızca başlat/durdur ile, kendi arayüzümüzle oynatan oynatıcı
function VimeoPlayer({
  embed,
  portrait,
  title,
}: {
  embed: string;
  portrait?: boolean;
  title: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);

  const src = `${embed}${embed.includes("?") ? "&" : "?"}controls=0&autoplay=1&dnt=1`;

  const post = (method: string, value?: string) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify(value === undefined ? { method } : { method, value }),
      "*",
    );
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.();
    }
  };

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (typeof e.origin === "string" && !e.origin.includes("vimeo")) return;
      let data: { event?: string };
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (data.event === "ready") {
        post("addEventListener", "play");
        post("addEventListener", "pause");
        post("addEventListener", "ended");
      } else if (data.event === "play") {
        setPlaying(true);
      } else if (
        data.event === "pause" ||
        data.event === "ended" ||
        data.event === "finish"
      ) {
        setPlaying(false);
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const toggle = () => (playing ? post("pause") : post("play"));

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden rounded-xl bg-black shadow-[inset_0_2px_12px_rgba(0,0,0,0.6)] ${
        portrait
          ? "mx-auto aspect-[9/16] h-[78svh] max-h-[78svh] w-auto max-w-[88vw]"
          : "aspect-video max-h-[78svh] w-full"
      }`}
    >
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        className="pointer-events-none h-full w-full"
        frameBorder={0}
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      {/* Tek başlat/durdur kontrolü */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Durdur" : "Başlat"}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span
          className={`flex size-16 items-center justify-center rounded-full border border-white/40 bg-black/45 text-2xl text-white backdrop-blur transition-all duration-300 ${
            playing
              ? "opacity-0 group-hover:opacity-100"
              : "opacity-100 group-hover:scale-110"
          }`}
        >
          {playing ? "❚❚" : "▶"}
        </span>
      </button>
      {/* Tam ekrana büyüt */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleFullscreen();
        }}
        aria-label="Tam ekran"
        className="absolute right-3 bottom-3 z-10 flex size-10 items-center justify-center rounded-full border border-white/40 bg-black/50 text-lg text-white backdrop-blur transition-colors hover:bg-black/70"
      >
        ⛶
      </button>
    </div>
  );
}

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

// Vimeo embed URL'inden video id'sini çıkar → önizleme görseli
const posterFor = (embed?: string) => {
  const id = embed?.match(/video\/(\d+)/)?.[1];
  return id ? `https://vumbnail.com/${id}.jpg` : undefined;
};

// Beton doku — ince grenli overlay
const CONCRETE_TEXTURE =
  "repeating-linear-gradient(45deg, rgba(0,0,0,0.12) 0 1px, transparent 1px 3px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.10) 0 1px, transparent 1px 4px), radial-gradient(circle at 30% 20%, rgba(255,255,255,0.12), transparent 45%)";

export function AiVideoTours() {
  const locale = useLocale();
  const [active, setActive] = useState<VideoTour | null>(null);

  // Modal açıkken arka plan kaydırmasını kilitle
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <>
      <div className="grid gap-7 sm:grid-cols-2">
        {TOURS.map((tour, i) => (
          <motion.button
            type="button"
            key={tour.id}
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.06 * i }}
            onClick={() => setActive(tour)}
            className="group relative overflow-hidden rounded-3xl border border-line bg-surface/60 text-left backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_24px_60px_-24px_var(--accent)]"
          >
            {/* Önizleme görseli */}
            <div className="relative aspect-video w-full overflow-hidden bg-bg">
              <span
                aria-hidden
                className="absolute inset-0 bg-linear-to-br from-accent/30 via-surface to-bg"
              />
              {posterFor(tour.embed) && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={posterFor(tour.embed)}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <span
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"
              />
              {/* Oynat butonu */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex size-16 items-center justify-center rounded-full border border-white/40 bg-black/40 text-2xl text-white backdrop-blur transition-transform duration-300 group-hover:scale-110">
                  ▶
                </span>
              </span>
              {tour.portrait && (
                <span className="absolute top-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                  9:16
                </span>
              )}
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold tracking-tight">
                {locale === "en" ? tour.title.en : tour.title.tr}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {locale === "en" ? tour.desc.en : tour.desc.tr}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Beton çerçeveli pop-up oynatıcı */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-black/85 p-2 backdrop-blur-md sm:p-4"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label={locale === "en" ? "Close" : "Kapat"}
              className="absolute top-5 right-5 z-10 flex size-11 items-center justify-center rounded-full border border-white/30 text-xl text-white transition-colors hover:bg-white/15"
            >
              ✕
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={active.portrait ? "w-auto max-w-full" : "w-full max-w-5xl"}
            >
              {/* Beton çerçeve */}
              <div className="relative rounded-[1.5rem] bg-linear-to-br from-stone-300 via-stone-400 to-stone-600 p-2 shadow-[0_50px_120px_-20px_rgba(0,0,0,0.85)] ring-1 ring-stone-700/40 sm:rounded-[1.75rem] sm:p-5">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[1.75rem] mix-blend-overlay"
                  style={{ backgroundImage: CONCRETE_TEXTURE }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[1.75rem] shadow-[inset_0_2px_6px_rgba(255,255,255,0.35),inset_0_-3px_10px_rgba(0,0,0,0.4)]"
                />
                {/* Video */}
                {active.embed ? (
                  <VimeoPlayer
                    embed={active.embed}
                    portrait={active.portrait}
                    title={locale === "en" ? active.title.en : active.title.tr}
                  />
                ) : (
                  <div
                    className={`relative overflow-hidden rounded-xl bg-black shadow-[inset_0_2px_12px_rgba(0,0,0,0.6)] ${
                      active.portrait
                        ? "mx-auto aspect-[9/16] h-[78svh] max-h-[78svh] w-auto max-w-[88vw]"
                        : "aspect-video max-h-[78svh] w-full"
                    }`}
                  >
                    <video
                      src={active.video}
                      autoPlay
                      controls
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
