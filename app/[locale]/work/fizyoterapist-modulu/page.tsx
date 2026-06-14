import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { FizyoterapistShowcase } from "@/components/FizyoterapistShowcase";
import { BackBar } from "@/components/BackBar";

export default async function FizyoterapistPage({
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
      <FizyoterapistShowcase />
    </>
  );
}
