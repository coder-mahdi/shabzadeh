import type { Trip } from "../types";

export const trips: Trip[] = [
  {
    slug: "hormuz-island",
    title: {
      fa: "سفرنامه جزیره هرمز",
      en: "The Hormuz Island Travelogue",
    },
    location: {
      fa: "جزیره هرمز، ایران",
      en: "Hormuz Island, Iran",
    },
    excerpt: {
      fa: "سه روز روی جزیره‌ای که خاک‌هایش رنگ رنگین‌کمان دارند.",
      en: "Three days on an island whose soil is the color of a rainbow.",
    },
    coverImage: "https://picsum.photos/seed/hormuz-cover/1600/900",
    startDate: "2025-03-10",
    endDate: "2025-03-13",
    parts: [
      {
        slug: "setting-off",
        order: 1,
        title: { fa: "قسمت اول: راهی شدن", en: "Part One: Setting Off" },
        excerpt: {
          fa: "از بندرعباس تا اسکله جزیره، شروع سفری که مدت‌ها منتظرش بودم.",
          en: "From Bandar Abbas to the island dock — the start of a trip I'd waited for.",
        },
        content: {
          fa: "این متن نمونه قسمت اول سفرنامه است و بعداً با محتوای واقعی جایگزین می‌شود.",
          en: "This is placeholder text for part one of the travelogue, to be replaced later.",
        },
        coverImage: "https://picsum.photos/seed/hormuz-part1/1200/800",
        publishedAt: "2025-03-15",
      },
      {
        slug: "the-rainbow-island",
        order: 2,
        title: { fa: "قسمت دوم: جزیره رنگین‌کمان", en: "Part Two: The Rainbow Island" },
        excerpt: {
          fa: "پیاده‌روی روی خاک‌های سرخ و زرد، و غروبی که رنگش را هیچ دوربینی ضبط نمی‌کند.",
          en: "Walking over red and yellow earth, and a sunset no camera can quite capture.",
        },
        content: {
          fa: "این متن نمونه قسمت دوم سفرنامه است و بعداً با محتوای واقعی جایگزین می‌شود.",
          en: "This is placeholder text for part two of the travelogue, to be replaced later.",
        },
        coverImage: "https://picsum.photos/seed/hormuz-part2/1200/800",
        publishedAt: "2025-03-17",
      },
      {
        slug: "sailing-back",
        order: 3,
        title: { fa: "قسمت سوم: بازگشت با کشتی", en: "Part Three: Sailing Back" },
        excerpt: {
          fa: "آخرین صبح روی جزیره، و مسیر بازگشتی که به سفر بعدی فکر می‌کند.",
          en: "The last morning on the island, and a journey home already thinking of the next trip.",
        },
        content: {
          fa: "این متن نمونه قسمت سوم سفرنامه است و بعداً با محتوای واقعی جایگزین می‌شود.",
          en: "This is placeholder text for part three of the travelogue, to be replaced later.",
        },
        coverImage: "https://picsum.photos/seed/hormuz-part3/1200/800",
        publishedAt: "2025-03-19",
      },
    ],
  },
];
