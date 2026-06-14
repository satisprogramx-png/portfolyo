import { setRequestLocale } from "next-intl/server";
import { TourShowcase } from "@/components/TourShowcase";

export default async function TourPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TourShowcase />;
}
