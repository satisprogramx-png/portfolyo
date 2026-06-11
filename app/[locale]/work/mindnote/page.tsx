import { setRequestLocale } from "next-intl/server";
import { MindnoteShowcase } from "@/components/MindnoteShowcase";

export default async function MindnotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MindnoteShowcase />;
}
