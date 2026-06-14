"use client";

import { VideoShowcase } from "./VideoShowcase";

// İçerik her zaman Türkçe (dil değişse de değişmez)
const SECTIONS = [
  {
    slogan: "Gelmeden gezdirin.",
    body: "Müşterileriniz mekânınızı 360° olarak, istediği an ve istediği yerden adım adım gezsin.",
  },
  {
    slogan: "Her köşe, gerçeğin aynısı.",
    body: "Yüksek çözünürlüklü panoramalarla mekânınızı en ince ayrıntısına kadar yansıtın.",
  },
  {
    slogan: "Otel, emlak, restoran, mağaza — hepsi için.",
    body: "Hangi sektörde olursanız olun, sanal turla mekânınızı unutulmaz bir deneyime dönüştürün.",
  },
  {
    slogan: "Tek bir bağlantı, sınırsız ziyaretçi.",
    body: "Web sitenize, sosyal medyaya veya Google'a ekleyin; turunuz her yerde, her cihazda çalışsın.",
  },
];

export function TourShowcase() {
  return (
    <VideoShowcase
      theme="brand"
      video="/video/360-sanal-tur-bg.mp4"
      heroTitle="Mekânınızı 360° keşfedilebilir kılın."
      sections={SECTIONS}
      closingBody="Mekânınızı 360° sanal turla hayata geçirelim."
    />
  );
}
