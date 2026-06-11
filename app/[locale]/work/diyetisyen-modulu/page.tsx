import { setRequestLocale } from "next-intl/server";
import { DiyetisyenShowcase } from "@/components/DiyetisyenShowcase";

export default async function DiyetisyenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DiyetisyenShowcase />;
}
