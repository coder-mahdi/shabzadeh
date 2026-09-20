import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { PhotoGalleryGrid } from "@/components/PhotoGalleryGrid";
import { getPhotos } from "@/lib/content/api";
import type { Locale } from "@/lib/content/types";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Gallery");
  const photos = await getPhotos();
  const loc = locale as Locale;

  return (
    <div>
      <PageHero title={t("pageTitle")} subtitle={t("pageSubtitle")} tone="charcoal" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {photos.length === 0 ? (
          <p className="font-meta text-ink-soft">{t("empty")}</p>
        ) : (
          <PhotoGalleryGrid photos={photos} locale={loc} />
        )}
      </div>
    </div>
  );
}
