import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CoverImage } from "@/components/CoverImage";
import { getTripBySlug, getTrips } from "@/lib/content/api";
import { localize, type Locale } from "@/lib/content/types";

export async function generateStaticParams() {
  const trips = await getTrips();
  return trips.map((trip) => ({ trip: trip.slug }));
}

export default async function TripPage({
  params,
}: {
  params: Promise<{ locale: string; trip: string }>;
}) {
  const { locale, trip: tripSlug } = await params;
  setRequestLocale(locale);

  const trip = await getTripBySlug(tripSlug);
  if (!trip) notFound();

  const t = await getTranslations("Travelogues");
  const loc = locale as Locale;
  const parts = trip.parts.slice().sort((a, b) => a.order - b.order);

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden border-4 border-gold">
        <CoverImage
          src={trip.coverImage}
          alt={localize(trip.title, loc)}
          fill
          sizes="(min-width: 768px) 896px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <p className="font-meta text-sm font-bold uppercase tracking-wide text-gold">
        {localize(trip.location, loc)}
      </p>
      <h1 className="mt-1 font-heading text-3xl uppercase leading-tight text-ink sm:text-5xl">
        {localize(trip.title, loc)}
      </h1>
      <p className="font-meta mt-3 max-w-2xl text-ink-soft">
        {localize(trip.excerpt, loc)}
      </p>

      <h2 className="mt-12 font-heading text-xl uppercase text-ink">
        {t("parts")}
      </h2>
      <ol className="mt-6 space-y-4">
        {parts.map((part, index) => (
          <li key={part.slug}>
            <Link
              href={`/travelogues/${trip.slug}/${part.slug}`}
              className="group flex items-start gap-4 border-2 border-ink bg-paper p-4 transition hover:bg-parchment-muted"
            >
              <span className="font-meta mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border-2 border-ink bg-wine text-sm font-bold text-parchment">
                {index + 1}
              </span>
              <span>
                <span className="block font-heading text-lg leading-tight text-ink group-hover:text-wine">
                  {localize(part.title, loc)}
                </span>
                <span className="font-meta mt-1 block text-sm text-ink-soft">
                  {localize(part.excerpt, loc)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </article>
  );
}
