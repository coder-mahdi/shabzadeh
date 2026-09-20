export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="font-heading text-2xl uppercase leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="font-meta mt-2 text-sm text-ink-soft">{subtitle}</p>
      ) : null}
    </div>
  );
}
