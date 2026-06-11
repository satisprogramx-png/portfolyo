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
    <section className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-4 text-muted">{t("subtitle")}</p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </section>
  );
}
