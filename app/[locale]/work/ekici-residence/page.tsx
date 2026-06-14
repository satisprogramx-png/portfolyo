import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { EkiciShowcase } from "@/components/EkiciShowcase";
import { BackBar } from "@/components/BackBar";

export default async function EkiciPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={null}>
        <BackBar />
      </Suspense>
      <EkiciShowcase />
    </>
  );
}
