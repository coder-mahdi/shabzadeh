import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { VideoEmbed } from "@/components/VideoEmbed";
import { getVideos } from "@/lib/content/api";
import { localize, type Locale } from "@/lib/content/types";

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Videos");
  const videos = await getVideos();
  const loc = locale as Locale;

  return (
    <div>
      <PageHero title={t("pageTitle")} subtitle={t("pageSubtitle")} tone="wine" />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        {videos.length === 0 ? (
          <p className="font-meta text-ink-soft">{t("empty")}</p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2">
            {videos.map((video) => (
              <div key={video.id}>
                <VideoEmbed
                  provider={video.provider}
                  videoId={video.videoId}
                  embedUrl={video.embedUrl}
                  title={localize(video.title, loc)}
                />
                <h3 className="mt-4 font-heading text-lg leading-tight text-ink">
                  {localize(video.title, loc)}
                </h3>
                <p className="font-meta mt-1 text-sm text-ink-soft">
                  {localize(video.description, loc)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
