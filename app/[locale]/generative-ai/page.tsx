import { setRequestLocale } from "next-intl/server";
import { getProjects } from "@/lib/projects";
import { ServiceShowcase } from "@/components/ServiceShowcase";

export default async function GenAiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const projects = await getProjects();
  const related = projects.filter((p) => p.slug === "ekici-residence");

  return (
    <ServiceShowcase
      serviceKey="genai"
      emoji="✨"
      theme="ai"
      related={related}
    />
  );
}
