import { Link } from "@/i18n/navigation";
import { localize, type Locale, type TripPart } from "@/lib/content/types";

export function TripPartNav({
  tripSlug,
  previousPart,
  nextPart,
  locale,
  labels,
}: {
  tripSlug: string;
  previousPart?: TripPart;
  nextPart?: TripPart;
  locale: Locale;
  labels: {
    backToTrip: string;
    previousPart: string;
    nextPart: string;
  };
}) {
  return (
    <nav className="mt-12 flex flex-col gap-4 border-t-4 border-ink pt-6 sm:flex-row sm:items-center sm:justify-between">
      <Link
        href={`/travelogues/${tripSlug}`}
        className="font-meta text-sm font-bold uppercase text-wine underline-offset-4 hover:underline"
      >
        {labels.backToTrip}
      </Link>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {previousPart ? (
          <Link
            href={`/travelogues/${tripSlug}/${previousPart.slug}`}
            className="font-meta border-2 border-ink px-4 py-2 text-sm text-ink transition hover:bg-ink hover:text-parchment"
          >
            {labels.previousPart}: {localize(previousPart.title, locale)}
          </Link>
        ) : null}
        {nextPart ? (
          <Link
            href={`/travelogues/${tripSlug}/${nextPart.slug}`}
            className="font-meta border-2 border-ink bg-wine px-4 py-2 text-sm text-parchment transition hover:bg-wine-dark"
          >
            {labels.nextPart}: {localize(nextPart.title, locale)}
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
