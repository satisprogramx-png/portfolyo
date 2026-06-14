import { setRequestLocale } from "next-intl/server";
import { getProjects } from "@/lib/projects";
import { ServiceShowcase } from "@/components/ServiceShowcase";

const SLUGS = ["mindnote", "diyetisyen-modulu", "fizyoterapist-modulu"];

export default async function WebAppPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const projects = await getProjects();
  const related = projects.filter((p) => SLUGS.includes(p.slug));

  return (
    <ServiceShowcase
      serviceKey="webapp"
      emoji="💻"
      theme="web"
      related={related}
    />
  );
}
