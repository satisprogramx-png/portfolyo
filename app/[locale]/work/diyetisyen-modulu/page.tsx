import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { DiyetisyenShowcase } from "@/components/DiyetisyenShowcase";
import { BackBar } from "@/components/BackBar";

export default async function DiyetisyenPage({
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
      <DiyetisyenShowcase />
    </>
  );
}
