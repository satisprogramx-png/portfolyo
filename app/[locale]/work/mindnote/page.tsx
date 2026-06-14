import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { MindnoteShowcase } from "@/components/MindnoteShowcase";
import { BackBar } from "@/components/BackBar";

export default async function MindnotePage({
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
      <MindnoteShowcase />
    </>
  );
}
