import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("About");

  return (
    <div>
      <PageHero title={t("pageTitle")} tone="gold" />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="font-meta leading-8 text-ink">{t("body")}</p>
      </div>
    </div>
  );
}
