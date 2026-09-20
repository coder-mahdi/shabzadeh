"use client";

import { useState } from "react";
import { CoverImage } from "@/components/CoverImage";
import { localize, type Locale, type Photo } from "@/lib/content/types";

export function PhotoGalleryGrid({
  photos,
  locale,
}: {
  photos: Photo[];
  locale: Locale;
}) {
  const [active, setActive] = useState<Photo | null>(null);

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
        {photos.map((photo) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActive(photo)}
            className="block w-full overflow-hidden border-4 border-ink"
          >
            <CoverImage
              src={photo.src}
              alt={localize(photo.caption, locale)}
              width={photo.width}
              height={photo.height}
              className="h-auto w-full object-cover transition duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-4"
          onClick={() => setActive(null)}
        >
          <div className="max-h-full max-w-3xl">
            <CoverImage
              src={active.src}
              alt={localize(active.caption, locale)}
              width={active.width}
              height={active.height}
              className="max-h-[80vh] w-auto border-4 border-gold object-contain"
            />
            <p className="font-meta mt-3 text-center text-sm text-parchment">
              {localize(active.caption, locale)}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
