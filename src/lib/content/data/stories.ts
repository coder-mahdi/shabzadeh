import type { Story } from "../types";

export const stories: Story[] = [
  {
    slug: "the-last-train",
    type: "short",
    title: {
      fa: "آخرین قطار",
      en: "The Last Train",
    },
    excerpt: {
      fa: "مردی در ایستگاهی متروک منتظر قطاری‌ست که شاید هرگز نرسد.",
      en: "A man waits at a deserted station for a train that may never arrive.",
    },
    coverImage: "https://picsum.photos/seed/last-train/1200/800",
    publishedAt: "2025-11-02",
    content: {
      fa: "این متن نمونه است و بعداً با محتوای واقعی داستان جایگزین می‌شود. ساعت از نیمه‌شب گذشته بود و سکوی خالی ایستگاه زیر نور کم‌جانِ چراغی تک‌افتاده، بیشتر شبیه صحنه‌ای از خواب بود تا واقعیت...",
      en: "This is placeholder text to be replaced with the real story later. It was past midnight, and the empty platform under the dim glow of a single lamp felt more like a dream than reality...",
    },
  },
  {
    slug: "a-letter-never-sent",
    type: "short",
    title: {
      fa: "نامه‌ای که هرگز فرستاده نشد",
      en: "A Letter Never Sent",
    },
    excerpt: {
      fa: "داستان کوتاهی درباره حرف‌هایی که همیشه روی کاغذ می‌مانند.",
      en: "A short story about words that always stay on paper.",
    },
    coverImage: "https://picsum.photos/seed/letter/1200/800",
    publishedAt: "2025-09-14",
    content: {
      fa: "این متن نمونه است و بعداً با محتوای واقعی داستان جایگزین می‌شود.",
      en: "This is placeholder text to be replaced with the real story later.",
    },
  },
  {
    slug: "the-map-that-forgot-its-city",
    type: "long",
    title: {
      fa: "نقشه‌ای که شهرش را فراموش کرد",
      en: "The Map That Forgot Its City",
    },
    excerpt: {
      fa: "داستانی بلند در چند فصل، درباره جست‌وجوی شهری که فقط در خاطره وجود دارد.",
      en: "A long story in several chapters, about the search for a city that exists only in memory.",
    },
    coverImage: "https://picsum.photos/seed/old-map/1200/800",
    publishedAt: "2025-06-20",
    chapters: [
      {
        slug: "chapter-1",
        order: 1,
        title: { fa: "فصل اول: نقشه‌ی کهنه", en: "Chapter One: The Old Map" },
        content: {
          fa: "این متن نمونه فصل اول است و بعداً با محتوای واقعی جایگزین می‌شود.",
          en: "This is placeholder text for chapter one, to be replaced later.",
        },
      },
      {
        slug: "chapter-2",
        order: 2,
        title: { fa: "فصل دوم: جاده‌ای که نبود", en: "Chapter Two: The Road That Wasn't" },
        content: {
          fa: "این متن نمونه فصل دوم است و بعداً با محتوای واقعی جایگزین می‌شود.",
          en: "This is placeholder text for chapter two, to be replaced later.",
        },
      },
      {
        slug: "chapter-3",
        order: 3,
        title: { fa: "فصل سوم: شهر گمشده", en: "Chapter Three: The Lost City" },
        content: {
          fa: "این متن نمونه فصل سوم است و بعداً با محتوای واقعی جایگزین می‌شود.",
          en: "This is placeholder text for chapter three, to be replaced later.",
        },
      },
    ],
  },
];
