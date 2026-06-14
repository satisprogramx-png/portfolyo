"use client";

import { VideoShowcase } from "./VideoShowcase";

export function TourShowcase() {
  return (
    <VideoShowcase
      theme="brand"
      video="/video/360-sanal-tur-bg.mp4"
      tr={{
        heroTitle: "Mekânınızı 360° keşfedilebilir kılın.",
        heroLeft: "AI ile video tour",
        heroRight: "Hotpoint ile tour",
        sections: [
          {
            slogan: "Gelmeden gezdirin.",
            body: "Müşterileriniz mekânınızı 360° olarak, istediği an ve istediği yerden adım adım gezsin.",
          },
          {
            slogan: "AI ile üretilmiş, gerçekçi iç mekan turları.",
            body: "Gerçek çekim yapmadan bile yapay zekâ ile fotorealistik iç mekan görselleri ve gezinti deneyimi oluşturuyoruz.",
          },
          {
            slogan: "Hotpoint'lere tıklayarak keşfet.",
            body: "Ziyaretçiler odadan odaya geçerken etiketlere tıklayarak detaylı bilgi, fiyat veya ürün görüntüleyebilir.",
          },
          {
            slogan: "Tek bir bağlantı, sınırsız ziyaretçi.",
            body: "Web sitenize, sosyal medyaya veya Google'a ekleyin; turunuz her yerde, her cihazda çalışsın.",
          },
        ],
        closingTitle: "Mekânınızı sanal dünyaya taşıyalım.",
        closingBody: "AI destekli veya gerçek çekimle — mekânınız için en etkileyici 360° turu birlikte üretelim.",
      }}
      en={{
        heroTitle: "Make your space explorable in 360°.",
        heroLeft: "AI video tour",
        heroRight: "Hotpoint tour",
        sections: [
          {
            slogan: "Let them tour before they arrive.",
            body: "Your customers can walk through your space in 360° anytime, from anywhere, step by step.",
          },
          {
            slogan: "AI-generated, photorealistic interior tours.",
            body: "Without a single photo shoot — we create stunningly realistic interior visuals and walkthrough experiences powered by AI.",
          },
          {
            slogan: "Explore by clicking interactive hotpoints.",
            body: "As visitors move from room to room, they can tap hotpoints to reveal details, prices or product info.",
          },
          {
            slogan: "One link, unlimited visitors.",
            body: "Embed it on your website, social media or Google Maps — your tour works everywhere, on every device.",
          },
        ],
        closingTitle: "Let's bring your space into the virtual world.",
        closingBody: "AI-generated or real photography — let's create the most compelling 360° tour for your space together.",
      }}
    />
  );
}
