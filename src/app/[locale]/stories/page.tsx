import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { StoryCard } from "@/components/StoryCard";
import { getStories } from "@/lib/content/api";
import type { Locale } from "@/lib/content/types";

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Stories");
  const stories = await getStories();
  const loc = locale as Locale;

  return (
    <div>
      <PageHero title={t("pageTitle")} subtitle={t("pageSubtitle")} tone="wine" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {stories.length === 0 ? (
          <p className="font-meta text-ink-soft">{t("empty")}</p>
        ) : (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <StoryCard
                key={story.slug}
                story={story}
                locale={loc}
                readLabel={t("readStory")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
