import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { StoryCard } from "@/components/StoryCard";
import { TripCard } from "@/components/TripCard";
import { CoverImage } from "@/components/CoverImage";
import { Marquee } from "@/components/Marquee";
import { getPhotos, getStories, getTrips } from "@/lib/content/api";
import { localize, type Locale } from "@/lib/content/types";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHome = await getTranslations("Home");
  const tStories = await getTranslations("Stories");
  const tTravelogues = await getTranslations("Travelogues");

  const [allStories, allTrips, allPhotos] = await Promise.all([
    getStories(),
    getTrips(),
    getPhotos(),
  ]);
  const stories = allStories.slice(0, 3);
  const trips = allTrips.slice(0, 2);
  const photos = allPhotos.slice(0, 6);
  const loc = locale as Locale;
  const heroImage = trips[0]?.coverImage ?? photos[0]?.src ?? null;

  return (
    <div>
      <section>
        <div className="px-4 pt-10 sm:px-6 sm:pt-14">
          <h1 className="font-heading text-ink text-[16vw] leading-[0.85] uppercase sm:text-[9vw] lg:text-[6.5rem]">
            {tHome("heroTitle")}
          </h1>
        </div>

        <div className="mt-8 flex flex-col border-y-4 border-ink sm:flex-row">
          {heroImage ? (
            <div className="relative aspect-[4/3] w-full sm:aspect-auto sm:min-h-[440px] sm:w-[70%]">
              <CoverImage
                src={heroImage}
                alt=""
                fill
                priority
                sizes="(min-width: 640px) 70vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="flex w-full flex-col justify-between gap-10 bg-wine p-8 text-parchment sm:w-[30%] sm:p-10">
            <p className="font-meta text-base leading-relaxed sm:text-lg">
              {tHome("heroSubtitle")}
            </p>
            <Link
              href="/travelogues"
              className="font-meta w-fit border-2 border-dashed border-ink bg-parchment px-6 py-3 text-center text-sm font-bold uppercase text-ink"
            >
              {tHome("heroCta")}
            </Link>
          </div>
        </div>
      </section>

      <Marquee text={tHome("marquee")} tone="gold" />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between">
          <SectionHeading title={tHome("latestStories")} />
          <Link
            href="/stories"
            className="font-meta mb-8 text-sm font-bold uppercase text-wine underline-offset-4 hover:underline"
          >
            {tHome("viewAll")}
          </Link>
        </div>
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <StoryCard
              key={story.slug}
              story={story}
              locale={loc}
              readLabel={tStories("readStory")}
            />
          ))}
        </div>
      </section>

      <section className="border-t-4 border-ink bg-parchment-muted">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between">
            <SectionHeading title={tHome("latestTravelogues")} />
            <Link
              href="/travelogues"
              className="font-meta mb-8 text-sm font-bold uppercase text-wine underline-offset-4 hover:underline"
            >
              {tHome("viewAll")}
            </Link>
          </div>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
            {trips.map((trip) => (
              <TripCard
                key={trip.slug}
                trip={trip}
                locale={loc}
                partsLabel={tTravelogues("parts")}
              />
            ))}
          </div>
        </div>
      </section>

      <Marquee text={tHome("marquee")} tone="wine" />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between">
          <SectionHeading title={tHome("fromTheGallery")} />
          <Link
            href="/gallery"
            className="font-meta mb-8 text-sm font-bold uppercase text-wine underline-offset-4 hover:underline"
          >
            {tHome("viewAll")}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-square overflow-hidden border-4 border-ink"
            >
              <CoverImage
                src={photo.src}
                alt={localize(photo.caption, loc)}
                fill
                sizes="(min-width: 768px) 16vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
