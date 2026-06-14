import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { HomeCarousel } from "@/components/HomeCarousel";
import { IntroSplash } from "@/components/IntroSplash";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Suspense fallback={null}>
        <IntroSplash />
      </Suspense>
      <HomeCarousel />
    </>
  );
}
