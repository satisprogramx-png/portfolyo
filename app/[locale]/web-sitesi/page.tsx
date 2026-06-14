import { setRequestLocale } from "next-intl/server";
import { WebSiteShowcase } from "@/components/WebSiteShowcase";

export default async function SitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <WebSiteShowcase />;
}
