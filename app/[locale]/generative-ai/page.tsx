import { setRequestLocale } from "next-intl/server";
import { GenerativeAiShowcase } from "@/components/GenerativeAiShowcase";

export default async function GenAiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GenerativeAiShowcase />;
}
