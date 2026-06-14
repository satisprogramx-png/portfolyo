import { setRequestLocale } from "next-intl/server";
import { TourLayout } from "@/components/TourLayout";
import { HotpointTours } from "@/components/HotpointTours";

export default async function HotpointTourPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <TourLayout
      title={{ tr: "Hotpoint ile Tur", en: "Hotpoint Tour" }}
      subtitle={{
        tr: "Hotpoint'lere tıklayarak gezilebilen yüksek çözünürlüklü 360° turlarımız.",
        en: "Our high-resolution 360° tours navigable by clicking hotpoints.",
      }}
    >
      <HotpointTours />
    </TourLayout>
  );
}
