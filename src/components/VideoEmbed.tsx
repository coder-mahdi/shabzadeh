export function VideoEmbed({
  provider,
  videoId,
  embedUrl,
  title,
}: {
  provider: "youtube" | "linkedin";
  videoId?: string | null;
  embedUrl?: string | null;
  title: string;
}) {
  const src =
    provider === "youtube"
      ? videoId
        ? `https://www.youtube-nocookie.com/embed/${videoId}`
        : null
      : (embedUrl ?? null);

  if (!src) {
    return (
      <div className="flex aspect-video w-full items-center justify-center border-4 border-ink bg-parchment-muted">
        <span className="font-meta text-xs uppercase text-ink-soft">
          Video unavailable
        </span>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden border-4 border-ink bg-charcoal">
      <iframe
        className="h-full w-full"
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
