import { Link } from "@/i18n/navigation";
import { CoverImage } from "@/components/CoverImage";
import { localize, type Locale, type Trip } from "@/lib/content/types";

export function TripCard({
  trip,
  locale,
  partsLabel,
}: {
  trip: Trip;
  locale: Locale;
  partsLabel: string;
}) {
  return (
    <Link href={`/travelogues/${trip.slug}`} className="group block">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-4 border-gold">
        <CoverImage
          src={trip.coverImage}
          alt={localize(trip.title, locale)}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="pt-4">
        <p className="font-meta text-xs font-bold uppercase tracking-wide text-gold">
          {localize(trip.location, locale)}
        </p>
        <h3 className="mt-1 font-heading text-lg leading-tight text-ink">
          {localize(trip.title, locale)}
        </h3>
        <p className="font-meta mt-2 line-clamp-3 text-sm text-ink-soft">
          {localize(trip.excerpt, locale)}
        </p>
        <span className="font-meta mt-3 inline-block text-sm font-bold uppercase text-wine underline-offset-4 group-hover:underline">
          {trip.parts.length} {partsLabel}
        </span>
      </div>
    </Link>
  );
}
