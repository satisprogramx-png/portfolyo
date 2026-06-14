import { setRequestLocale } from "next-intl/server";
import { getProjects } from "@/lib/projects";
import { ServiceShowcase } from "@/components/ServiceShowcase";

export default async function SitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const projects = await getProjects();
  const related = projects.filter((p) => p.slug === "bimola");

  return (
    <ServiceShowcase
      serviceKey="site"
      emoji="🖥️"
      theme="motion"
      related={related}
      bgVideo="/video/web-sitesi-bg.mp4"
    />
  );
}
