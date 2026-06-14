"use client";

import { VideoShowcase } from "./VideoShowcase";

// İçerik her zaman Türkçe (dil değişse de değişmez)
// Ana fikir: siz hayal edin, biz generative AI ile üretelim.
const SECTIONS = [
  {
    slogan: "Siz hayal edin, biz üretelim.",
    body: "Aklınızdaki fikri anlatın; biz generative AI ile onu görsele, metne ve videoya dönüştürelim.",
  },
  {
    slogan: "Düşlediğiniz her şey, üretilebilir.",
    body: "Markanıza özel görseller, tanıtım videoları ve içerikler — hayal gücünüzün sınırı kadar geniş.",
  },
  {
    slogan: "Bir cümlelik hayal, eksiksiz bir içerik dünyası.",
    body: "Firma olarak en güncel yapay zekâ araçlarıyla fikrinizi dakikalar içinde hayata geçiriyoruz.",
  },
  {
    slogan: "Hayal kurmak size, üretmek bize ait.",
    body: "Siz vizyonu koyun; biz generative AI ile o vizyonu gerçeğe çevirelim.",
  },
];

export function GenerativeAiShowcase() {
  return (
    <VideoShowcase
      theme="ai"
      video="/video/generative-ai-bg.mp4"
      heroTitle="Siz hayal edin, biz yapay zekâ ile üretelim."
      sections={SECTIONS}
      closingBody="Hayalinizi anlatın, generative AI ile birlikte üretelim."
    />
  );
}
