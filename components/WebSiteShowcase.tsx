"use client";

import { VideoShowcase } from "./VideoShowcase";

// İçerik her zaman Türkçe (dil değişse de değişmez)
const SECTIONS = [
  {
    slogan: "İstediğiniz gibi, tam size özel bir web sitesi.",
    body: "Hazır şablon değil; markanıza, hedefinize ve müşterinize göre sıfırdan tasarlanan bir deneyim.",
  },
  {
    slogan: "Tasarımdan içeriğe, her detay sizin isteğinize göre.",
    body: "Renk, tipografi, animasyon ve akış — hepsi sizinle birlikte, sizin zevkinize göre şekillenir.",
  },
  {
    slogan: "Modern, hızlı ve mobil uyumlu.",
    body: "Her ekranda kusursuz görünen, saniyeler içinde açılan ve arama motorlarında öne çıkan siteler.",
  },
  {
    slogan: "İhtiyacınız ne olursa olsun, hayalinizdeki siteyi üretiriz.",
    body: "Kurumsal tanıtım, e-ticaret, rezervasyon ya da özel bir uygulama — fikriniz neyse hayata geçiririz.",
  },
];

export function WebSiteShowcase() {
  return (
    <VideoShowcase
      theme="motion"
      video="/video/web-sitesi-bg.mp4"
      heroTitle="Hayalinizdeki web sitesi, tam size özel."
      sections={SECTIONS}
      closingBody="Hayalinizdeki web sitesini birlikte üretelim."
    />
  );
}
