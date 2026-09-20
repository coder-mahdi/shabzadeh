import { Link } from "@/i18n/navigation";
import { CoverImage } from "@/components/CoverImage";
import { localize, type Locale, type Story } from "@/lib/content/types";

export function StoryCard({
  story,
  locale,
  readLabel,
}: {
  story: Story;
  locale: Locale;
  readLabel: string;
}) {
  return (
    <Link href={`/stories/${story.slug}`} className="group block">
      <div className="relative aspect-[3/2] w-full overflow-hidden border-4 border-ink">
        <CoverImage
          src={story.coverImage}
          alt={localize(story.title, locale)}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="pt-4">
        <h3 className="font-heading text-lg leading-tight text-ink">
          {localize(story.title, locale)}
        </h3>
        <p className="font-meta mt-2 line-clamp-3 text-sm text-ink-soft">
          {localize(story.excerpt, locale)}
        </p>
        <span className="font-meta mt-3 inline-block text-sm font-bold uppercase text-wine underline-offset-4 group-hover:underline">
          {readLabel}
        </span>
      </div>
    </Link>
  );
}
