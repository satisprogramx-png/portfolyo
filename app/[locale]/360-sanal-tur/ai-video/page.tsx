import { setRequestLocale } from "next-intl/server";
import { TourLayout } from "@/components/TourLayout";
import { AiVideoTours } from "@/components/AiVideoTours";

export default async function AiVideoTourPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <TourLayout
      title={{ tr: "AI ile Video Tur", en: "AI Video Tour" }}
      subtitle={{
        tr: "Yapay zekâ ile üretilmiş, fotorealistik iç mekan video turlarımız.",
        en: "Our photorealistic interior video tours generated with AI.",
      }}
    >
      <AiVideoTours />
    </TourLayout>
  );
}
