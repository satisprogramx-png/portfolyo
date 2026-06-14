import { setRequestLocale } from "next-intl/server";
import { ServiceShowcase } from "@/components/ServiceShowcase";

export default async function MobilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ServiceShowcase serviceKey="mobil" emoji="📱" theme="mobile" related={[]} />
  );
}
