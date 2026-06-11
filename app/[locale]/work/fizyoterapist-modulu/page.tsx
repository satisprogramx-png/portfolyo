import { setRequestLocale } from "next-intl/server";
import { FizyoterapistShowcase } from "@/components/FizyoterapistShowcase";

export default async function FizyoterapistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FizyoterapistShowcase />;
}
