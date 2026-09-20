export function Marquee({
  text,
  tone = "gold",
}: {
  text: string;
  tone?: "gold" | "wine";
}) {
  const items = Array.from({ length: 8 }, () => text);
  const bg = tone === "gold" ? "bg-gold" : "bg-wine";
  const fg = tone === "gold" ? "text-ink" : "text-parchment";

  return (
    <div className={`overflow-hidden border-y-4 border-ink py-3 ${bg}`} dir="ltr">
      <div className="marquee-track gap-8">
        {[...items, ...items].map((item, index) => (
          <span
            key={index}
            className={`font-meta shrink-0 whitespace-nowrap text-sm font-bold uppercase tracking-wide ${fg}`}
          >
            {item} &#10037;
          </span>
        ))}
      </div>
    </div>
  );
}
