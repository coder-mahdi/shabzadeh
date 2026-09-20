import { stories } from "./data/stories";
import { trips } from "./data/trips";
import { photos } from "./data/photos";
import { videos } from "./data/videos";
import type { Photo, Story, Trip, Video } from "./types";

/**
 * This module is the only place that changes when content moves from
 * local mock data to the real WordPress backend (see wordpress-plugin/).
 * Every function tries the WP REST API first (when WP_API_URL is set)
 * and falls back to the local mock data otherwise, so the site keeps
 * working before the WordPress site is wired up.
 */

const WP_API_URL = process.env.WP_API_URL;

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

export async function getStories(): Promise<Story[]> {
  const remote = await fetchFromWp<Story[]>("/stories");
  if (remote) {
    return remote;
  }
  return [...stories].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function getStoryBySlug(slug: string): Promise<Story | undefined> {
  const remote = await fetchFromWp<Story>(`/stories/${slug}`);
  if (remote) {
    return remote;
  }
  return stories.find((story) => story.slug === slug);
}

export async function getTrips(): Promise<Trip[]> {
  const remote = await fetchFromWp<Trip[]>("/trips");
  if (remote) {
    return remote;
  }
  return [...trips].sort((a, b) => (a.startDate < b.startDate ? 1 : -1));
}

export async function getTripBySlug(slug: string): Promise<Trip | undefined> {
  const remote = await fetchFromWp<Trip>(`/trips/${slug}`);
  if (remote) {
    return remote;
  }
  return trips.find((trip) => trip.slug === slug);
}

export async function getTripPart(tripSlug: string, partSlug: string) {
  const trip = await getTripBySlug(tripSlug);
  const part = trip?.parts.find((p) => p.slug === partSlug);
  if (!trip || !part) {
    return undefined;
  }
  return { trip, part };
}

export async function getPhotos(): Promise<Photo[]> {
  const remote = await fetchFromWp<Photo[]>("/photos");
  if (remote) {
    return remote;
  }
  return photos;
}

export async function getPhotosByTrip(tripSlug: string): Promise<Photo[]> {
  const all = await getPhotos();
  return all.filter((photo) => photo.tripSlug === tripSlug);
}

export async function getVideos(): Promise<Video[]> {
  const remote = await fetchFromWp<Video[]>("/videos");
  if (remote) {
    return remote;
  }
  return videos;
}
