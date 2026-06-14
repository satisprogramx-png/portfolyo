"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

type HotpointTour = {
  id: string;
  title: { tr: string; en: string };
  desc: { tr: string; en: string };
  embed: string;
};

// Projeler buraya eklenir (Panoee / panorama embed url)
const TOURS: HotpointTour[] = [
  {
    id: "salon",
    title: { tr: "Salon Turu", en: "Showroom Tour" },
    desc: {
      tr: "Hotpoint'lere tıklayarak yüksek çözünürlüklü iç mekanı keşfedin.",
      en: "Explore the high-resolution interior by clicking the hotpoints.",
    },
    embed: "https://tour.panoee.net/iframe/6a2e793d89e7dc88a7795309",
  },
];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export function HotpointTours() {
  const locale = useLocale();

  // Mobil cihaz hareketini panorama iframe'lerine ilet (Panoee devicemotion)
  useEffect(() => {
    const onMotion = (e: DeviceMotionEvent) => {
      const frames = document.querySelectorAll<HTMLIFrameElement>(
        "iframe[data-pano-tour]",
      );
      frames.forEach((iframe) => {
        iframe.contentWindow?.postMessage(
          {
            type: "devicemotion",
            deviceMotionEvent: {
              acceleration: {
                x: e.acceleration?.x,
                y: e.acceleration?.y,
                z: e.acceleration?.z,
              },
              accelerationIncludingGravity: {
                x: e.accelerationIncludingGravity?.x,
                y: e.accelerationIncludingGravity?.y,
                z: e.accelerationIncludingGravity?.z,
              },
              rotationRate: {
                alpha: e.rotationRate?.alpha,
                beta: e.rotationRate?.beta,
                gamma: e.rotationRate?.gamma,
              },
              interval: e.interval,
              timeStamp: e.timeStamp,
            },
          },
          "*",
        );
      });
    };

    window.addEventListener("devicemotion", onMotion);
    return () => window.removeEventListener("devicemotion", onMotion);
  }, []);

  return (
    <div className="grid gap-8">
      {TOURS.map((tour, i) => (
        <motion.article
          key={tour.id}
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.06 * i }}
          className="overflow-hidden rounded-3xl border border-line bg-surface/60 backdrop-blur"
        >
          <div className="relative w-full overflow-hidden bg-black">
            <iframe
              data-pano-tour
              title={locale === "en" ? tour.title.en : tour.title.tr}
              src={tour.embed}
              className="h-[60vh] min-h-[360px] w-full"
              frameBorder={0}
              scrolling="no"
              allow="vr; xr; accelerometer; gyroscope; autoplay;"
              allowFullScreen
              loading="eager"
            />
          </div>
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
