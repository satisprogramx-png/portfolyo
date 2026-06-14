import { setRequestLocale } from "next-intl/server";
import { ServiceShowcase } from "@/components/ServiceShowcase";

export default async function TourPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServiceShowcase serviceKey="tour" emoji="🧭" theme="brand" related={[]} />;
}
