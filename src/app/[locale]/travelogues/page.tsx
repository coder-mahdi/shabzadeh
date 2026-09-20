import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { TripCard } from "@/components/TripCard";
import { getTrips } from "@/lib/content/api";
import type { Locale } from "@/lib/content/types";

export default async function TraveloguesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Travelogues");
  const trips = await getTrips();
  const loc = locale as Locale;

  return (
    <div>
      <PageHero title={t("pageTitle")} subtitle={t("pageSubtitle")} tone="gold" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {trips.length === 0 ? (
          <p className="font-meta text-ink-soft">{t("empty")}</p>
        ) : (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
            {trips.map((trip) => (
              <TripCard
                key={trip.slug}
                trip={trip}
                locale={loc}
                partsLabel={t("parts")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
