import Image from "next/image";

export function CoverImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  className,
  priority,
}: {
  src?: string | null;
  alt: string;
  fill?: boolean;
  width?: number | null;
  height?: number | null;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  if (!src) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-parchment-muted ${className ?? ""}`}
      >
        <span className="font-meta text-xs uppercase text-ink-soft">
          No image
        </span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      className={className}
      priority={priority}
    />
  );
}
