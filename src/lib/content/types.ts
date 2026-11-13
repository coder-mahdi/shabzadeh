export type Locale = "fa" | "en";

export type LocalizedText = {
  fa: string;
  en: string;
};

/**
 * Returns the text in the requested language, falling back to the other
 * language when that translation hasn't been written yet in the CMS (so
 * cards and pages never render empty).
 */
export function localize(
  text: LocalizedText | null | undefined,
  locale: Locale
): string {
  if (!text) return "";
  const other: Locale = locale === "fa" ? "en" : "fa";
  return text[locale]?.trim() ? text[locale] : (text[other] ?? "");
}

export interface StoryChapter {
  slug: string;
  order: number;
  title: LocalizedText;
  content: LocalizedText;
}

export interface Story {
  slug: string;
  type: "short" | "long";
  title: LocalizedText;
  excerpt: LocalizedText;
  coverImage: string | null;
  publishedAt: string;
  content?: LocalizedText | null;
  chapters?: StoryChapter[] | null;
}

export interface TripPart {
  slug: string;
  order: number;
  title: LocalizedText;
  excerpt: LocalizedText;
  content: LocalizedText;
  coverImage: string | null;
  publishedAt: string;
}

export interface Trip {
  slug: string;
  title: LocalizedText;
  location: LocalizedText;
  excerpt: LocalizedText;
  coverImage: string | null;
  startDate: string;
  endDate: string;
  parts: TripPart[];
}

export interface Photo {
  id: string;
  src: string | null;
  width: number | null;
  height: number | null;
  caption: LocalizedText;
  tripSlug?: string | null;
}

export interface Video {
  id: string;
  provider: "youtube" | "linkedin";
  videoId?: string | null;
  embedUrl?: string | null;
  title: LocalizedText;
  description: LocalizedText;
  tripSlug?: string | null;
}
