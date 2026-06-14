"use client";

import { VideoShowcase } from "./VideoShowcase";

// İçerik her zaman Türkçe (dil değişse de değişmez)
const SECTIONS = [
  {
    slogan: "Metinden görsele, fikirden videoya.",
    body: "Yapay zekâ ile hayalinizdeki içeriği saniyeler içinde üretin; markanıza özel görseller, metinler ve videolar.",
  },
  {
    slogan: "Markanıza özel, akıllı içerik.",
    body: "Tonunuzu öğrenen, hedef kitlenize göre konuşan yapay zekâ destekli içerik akışları.",
  },
  {
    slogan: "Otomatikleştirin, hızlanın, ölçeklenin.",
    body: "Tekrarlayan işleri yapay zekâya devredin; ekibiniz yaratıcı işe odaklansın.",
  },
  {
    slogan: "Fikriniz ne olursa olsun, AI ile hayata geçirelim.",
    body: "Sohbet botundan görsel üretime, özel modellerden otomasyona — uçtan uca yapay zekâ çözümleri.",
  },
];

export function GenerativeAiShowcase() {
  return (
    <VideoShowcase
      theme="ai"
      video="/video/generative-ai-bg.mp4"
      heroTitle="Yapay zekâ ile hayal edin, anında üretin."
      sections={SECTIONS}
      closingBody="Yapay zekâ destekli projenizi birlikte hayata geçirelim."
    />
  );
}
