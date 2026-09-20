import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("Footer");
  const tSite = await getTranslations("Site");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-ink bg-wine text-parchment">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="font-heading text-3xl sm:text-5xl">{tSite("name")}</p>
        <div className="mt-8 flex flex-col gap-2 font-meta text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>{tSite("tagline")}</p>
          <p>
            © {year} {tSite("name")}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
