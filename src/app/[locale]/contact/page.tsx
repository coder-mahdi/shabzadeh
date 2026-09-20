import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Contact");

  return (
    <div>
      <PageHero title={t("pageTitle")} tone="charcoal" />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="font-meta leading-8 text-ink">{t("body")}</p>
        <p className="font-meta mt-6 text-ink">
          <span className="font-bold">{t("emailLabel")}:</span>{" "}
          <a
            href="mailto:hello@example.com"
            className="text-wine underline-offset-4 hover:underline"
          >
            hello@example.com
          </a>
        </p>
      </div>
    </div>
  );
}
