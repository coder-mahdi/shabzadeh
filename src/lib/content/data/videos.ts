import type { Video } from "../types";

export const videos: Video[] = [
  {
    id: "1",
    provider: "youtube",
    videoId: "aqz-KE-bpKQ",
    title: { fa: "لحظاتی از سفر هرمز", en: "Moments from the Hormuz trip" },
    description: {
      fa: "یک ویدیوی نمونه که بعداً با ویدیوی واقعی سفر جایگزین می‌شود.",
      en: "A placeholder video, to be replaced with real trip footage later.",
    },
    tripSlug: "hormuz-island",
  },
  {
    id: "2",
    provider: "youtube",
    videoId: "eRsGyueVLvQ",
    title: { fa: "جاده‌ها و لحظه‌های بین راه", en: "Roads and in-between moments" },
    description: {
      fa: "یک ویدیوی نمونه که بعداً با ویدیوی واقعی سفر جایگزین می‌شود.",
      en: "A placeholder video, to be replaced with real trip footage later.",
    },
  },
];
