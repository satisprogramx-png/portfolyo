"use client";

import { VideoShowcase } from "./VideoShowcase";
import { WebsitePromo } from "./WebsitePromo";

export function WebSiteShowcase() {
  return (
    <VideoShowcase
      theme="motion"
      video="/video/web-sitesi-bg.mp4"
      extra={<WebsitePromo />}
      tr={{
        heroTitle: "Hayalinizdeki web sitesi, tam size özel.",
        sections: [
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
        ],
        closingBody: "Hayalinizdeki web sitesini birlikte üretelim.",
      }}
      en={{
        heroTitle: "Your dream website, built exactly for you.",
        sections: [
          {
            slogan: "A website built exactly the way you want it.",
            body: "No off-the-shelf templates — every detail designed from scratch around your brand, goals and customers.",
          },
          {
            slogan: "From design to content, every detail on your terms.",
            body: "Colour, typography, animation and flow — all shaped together with you, to match your vision.",
          },
          {
            slogan: "Modern, fast and mobile-ready.",
            body: "Sites that look flawless on every screen, load in seconds and rank high on search engines.",
          },
          {
            slogan: "Whatever you need, we build the site you dream of.",
            body: "Corporate showcase, e-commerce, booking or a bespoke app — if you can imagine it, we can build it.",
          },
        ],
        closingBody: "Let's build your dream website together.",
      }}
    />
  );
}
