import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="bg-linear-to-br from-fg to-accent bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
        {t("title")}
      </h1>
      <p className="mt-5 text-muted sm:text-lg">{t("subtitle")}</p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </section>
  );
}
