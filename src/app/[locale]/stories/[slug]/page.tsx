import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CoverImage } from "@/components/CoverImage";
import { getStories, getStoryBySlug } from "@/lib/content/api";
import { localize, type Locale } from "@/lib/content/types";

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((story) => ({ slug: story.slug }));
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  const t = await getTranslations("Stories");
  const loc = locale as Locale;

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden border-4 border-wine">
        <CoverImage
          src={story.coverImage}
          alt={localize(story.title, loc)}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <h1 className="font-heading text-3xl uppercase leading-tight text-ink sm:text-5xl">
        {localize(story.title, loc)}
      </h1>
      <p className="font-meta mt-3 text-ink-soft">{localize(story.excerpt, loc)}</p>

      {story.type === "long" && story.chapters ? (
        <div className="mt-10 space-y-12">
          <nav className="border-2 border-ink bg-parchment-muted p-5">
            <p className="font-meta mb-3 text-sm font-bold uppercase tracking-wide text-wine">
              {t("chapters")}
            </p>
            <ol className="font-meta space-y-1 text-sm">
              {story.chapters
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((chapter) => (
                  <li key={chapter.slug}>
                    <a
                      href={`#${chapter.slug}`}
                      className="text-ink-soft hover:text-wine hover:underline"
                    >
                      {localize(chapter.title, loc)}
                    </a>
                  </li>
                ))}
            </ol>
          </nav>

          {story.chapters
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((chapter) => (
              <section key={chapter.slug} id={chapter.slug} className="scroll-mt-24">
                <h2 className="font-heading text-2xl uppercase leading-tight text-ink">
                  {localize(chapter.title, loc)}
                </h2>
                <p className="mt-4 whitespace-pre-line leading-8 text-ink">
                  {localize(chapter.content, loc)}
                </p>
              </section>
            ))}
        </div>
      ) : (
        <p className="mt-10 whitespace-pre-line leading-8 text-ink">
          {story.content ? localize(story.content, loc) : ""}
        </p>
      )}
    </article>
  );
}
