import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TripPartNav } from "@/components/TripPartNav";
import { CoverImage } from "@/components/CoverImage";
import { RichText } from "@/components/RichText";
import { getTripPart, getTrips } from "@/lib/content/api";
import { localize, type Locale } from "@/lib/content/types";

export async function generateStaticParams() {
  const trips = await getTrips();
  return trips.flatMap((trip) =>
    trip.parts.map((part) => ({ trip: trip.slug, part: part.slug }))
  );
}

export default async function TripPartPage({
  params,
}: {
  params: Promise<{ locale: string; trip: string; part: string }>;
}) {
  const { locale, trip: tripSlug, part: partSlug } = await params;
  setRequestLocale(locale);

  const result = await getTripPart(tripSlug, partSlug);
  if (!result) notFound();
  const { trip, part } = result;

  const t = await getTranslations("Travelogues");
  const loc = locale as Locale;

  const sortedParts = trip.parts.slice().sort((a, b) => a.order - b.order);
  const currentIndex = sortedParts.findIndex((p) => p.slug === part.slug);
  const previousPart = sortedParts[currentIndex - 1];
  const nextPart = sortedParts[currentIndex + 1];

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="font-meta text-sm font-bold uppercase tracking-wide text-gold">
        {localize(trip.title, loc)} · {t("part")} {currentIndex + 1}
      </p>
      <h1 className="mt-1 font-heading text-3xl uppercase leading-tight text-ink sm:text-5xl">
        {localize(part.title, loc)}
      </h1>

      <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden border-4 border-gold">
        <CoverImage
          src={part.coverImage}
          alt={localize(part.title, loc)}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <RichText
        content={localize(part.content, loc)}
        className="mt-8 leading-8 text-ink"
      />

      <TripPartNav
        tripSlug={trip.slug}
        previousPart={previousPart}
        nextPart={nextPart}
        locale={loc}
        labels={{
          backToTrip: t("backToTrip"),
          previousPart: t("previousPart"),
          nextPart: t("nextPart"),
        }}
      />
    </article>
  );
}
