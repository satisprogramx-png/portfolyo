import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { BimolaShowcase } from "@/components/BimolaShowcase";
import { BackBar } from "@/components/BackBar";

export default async function BimolaPage({
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
      <BimolaShowcase />
    </>
  );
}
