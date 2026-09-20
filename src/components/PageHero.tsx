export function PageHero({
  title,
  subtitle,
  tone = "wine",
}: {
  title: string;
  subtitle?: string;
  tone?: "wine" | "gold" | "charcoal";
}) {
  const bg = { wine: "bg-wine", gold: "bg-gold", charcoal: "bg-charcoal" }[tone];
  const fg = tone === "gold" ? "text-ink" : "text-parchment";

  return (
    <div className={`border-b-4 border-ink ${bg} ${fg}`}>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <h1 className="font-heading text-4xl uppercase leading-[0.95] sm:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="font-meta mt-4 max-w-xl text-sm sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
