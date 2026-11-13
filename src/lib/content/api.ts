import { stories } from "./data/stories";
import { trips } from "./data/trips";
import { photos } from "./data/photos";
import { videos } from "./data/videos";
import type { Photo, Story, Trip, TripPart, Video } from "./types";

/**
 * This module is the only place that knows where content comes from.
 * Every function reads the WordPress REST API first (when WP_API_URL is
 * set). Whenever WordPress has content for the request, that is what the
 * site shows; when it has none yet (or is unreachable), the local mock
 * data in ./data is used instead, so the site never renders empty.
 */

const WP_API_URL = process.env.WP_API_URL?.replace(/\/+$/, "");

async function fetchFromWp<T>(path: string): Promise<T | null> {
  if (!WP_API_URL) {
    return null;
  }
  try {
    const response = await fetch(`${WP_API_URL}${path}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

/** Remote list if WordPress has at least one item, otherwise null. */
async function fetchListFromWp<T>(path: string): Promise<T[] | null> {
  const remote = await fetchFromWp<T[]>(path);
  return Array.isArray(remote) && remote.length > 0 ? remote : null;
}

/**
 * Route params and WordPress slugs can arrive either percent-encoded or
 * decoded (Persian slugs especially), so they are always compared in
 * decoded form.
 */
export function normalizeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug).normalize("NFC");
  } catch {
    return slug.normalize("NFC");
  }
}

function sameSlug(a: string, b: string): boolean {
  return normalizeSlug(a) === normalizeSlug(b);
}

function sortParts(parts: TripPart[] | null | undefined): TripPart[] {
  return (parts ?? []).slice().sort((a, b) => a.order - b.order);
}

function normalizeTrip(trip: Trip): Trip {
  return {
    ...trip,
    slug: normalizeSlug(trip.slug),
    parts: sortParts(trip.parts).map((part) => ({
      ...part,
      slug: normalizeSlug(part.slug),
    })),
  };
}

export async function getStories(): Promise<Story[]> {
  const remote = await fetchListFromWp<Story>("/stories");
  if (remote) {
    return remote;
  }
  return [...stories].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getStoryBySlug(slug: string): Promise<Story | undefined> {
  const remote = await fetchFromWp<Story>(
    `/stories/${encodeURIComponent(normalizeSlug(slug))}`
  );
  if (remote) {
    return remote;
  }
  return stories.find((story) => sameSlug(story.slug, slug));
}

export async function getTrips(): Promise<Trip[]> {
  const remote = await fetchListFromWp<Trip>("/trips");
  if (remote) {
    return remote.map(normalizeTrip);
  }
  return [...trips]
    .sort((a, b) => (a.startDate < b.startDate ? 1 : -1))
    .map(normalizeTrip);
}

export async function getTripBySlug(slug: string): Promise<Trip | undefined> {
  const remote = await fetchFromWp<Trip>(
    `/trips/${encodeURIComponent(normalizeSlug(slug))}`
  );
  if (remote) {
    return normalizeTrip(remote);
  }
  const local = trips.find((trip) => sameSlug(trip.slug, slug));
  return local ? normalizeTrip(local) : undefined;
}

export async function getTripPart(tripSlug: string, partSlug: string) {
  const trip = await getTripBySlug(tripSlug);
  const part = trip?.parts.find((p) => sameSlug(p.slug, partSlug));
  if (!trip || !part) {
    return undefined;
  }
  return { trip, part };
}

export async function getPhotos(): Promise<Photo[]> {
  const remote = await fetchListFromWp<Photo>("/photos");
  if (remote) {
    return remote;
  }
  return photos;
}

export async function getPhotosByTrip(tripSlug: string): Promise<Photo[]> {
  const all = await getPhotos();
  return all.filter(
    (photo) => photo.tripSlug && sameSlug(photo.tripSlug, tripSlug)
  );
}

export async function getVideos(): Promise<Video[]> {
  const remote = await fetchListFromWp<Video>("/videos");
  if (remote) {
    return remote;
  }
  return videos;
}
