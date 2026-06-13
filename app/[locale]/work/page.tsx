import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProjects } from "@/lib/projects";
import { WorkGrid } from "@/components/WorkGrid";
import { EducationCards } from "@/components/EducationCards";

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("work");
  const tHome = await getTranslations("home");
  const projects = await getProjects();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="bg-linear-to-br from-fg to-accent bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
        {t("title")}
      </h1>
      <p className="mt-5 max-w-xl text-muted sm:text-lg">{t("subtitle")}</p>
      <div className="mt-14">
        <WorkGrid projects={projects} />
      </div>

      <div className="mt-28 border-t border-line/60 pt-20">
        <h2 className="bg-linear-to-br from-fg to-accent bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-5xl">
          {tHome("eduTitle")}
        </h2>
        <p className="mt-5 max-w-xl text-muted sm:text-lg">
          {tHome("eduTagline")}
        </p>
        <div className="mt-12">
          <EducationCards />
        </div>
      </div>
    </section>
  );
}
