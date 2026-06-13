import { setRequestLocale } from "next-intl/server";
import { EkiciShowcase } from "@/components/EkiciShowcase";

export default async function EkiciPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <EkiciShowcase />;
}
