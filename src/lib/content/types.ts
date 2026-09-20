export type Locale = "fa" | "en";

export type LocalizedText = {
  fa: string;
  en: string;
};

export function localize(text: LocalizedText, locale: Locale): string {
  return text[locale];
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
