"use client";

import { VideoShowcase } from "./VideoShowcase";

export function GenerativeAiShowcase() {
  return (
    <VideoShowcase
      theme="ai"
      video="/video/generative-ai-bg.mp4"
      tr={{
        heroTitle: "Siz hayal edin, biz yapay zekâ ile üretelim.",
        sections: [
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
        ],
        closingBody: "Hayalinizi anlatın, generative AI ile birlikte üretelim.",
      }}
      en={{
        heroTitle: "You imagine it, we produce it with AI.",
        sections: [
          {
            slogan: "You dream it, we create it.",
            body: "Tell us your idea and we'll turn it into visuals, text and video using the latest generative AI tools.",
          },
          {
            slogan: "Everything you can imagine, can be produced.",
            body: "Custom brand visuals, promo videos and content — as expansive as your imagination.",
          },
          {
            slogan: "One sentence of vision, a whole world of content.",
            body: "As a studio, we use cutting-edge AI to bring your idea to life in minutes.",
          },
          {
            slogan: "Dreaming is yours. Creating is ours.",
            body: "You set the vision; we use generative AI to turn that vision into reality.",
          },
        ],
        closingBody: "Tell us your vision and let's create it together with AI.",
      }}
    />
  );
}
