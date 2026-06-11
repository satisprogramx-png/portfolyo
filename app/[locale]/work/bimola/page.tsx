import { setRequestLocale } from "next-intl/server";
import { BimolaShowcase } from "@/components/BimolaShowcase";

export default async function BimolaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BimolaShowcase />;
}
