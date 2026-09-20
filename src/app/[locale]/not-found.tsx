import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("Nav");

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center sm:px-6">
      <h1 className="font-heading text-6xl text-ink">404</h1>
      <p className="font-meta mt-4 text-ink-soft">
        این صفحه پیدا نشد / This page could not be found.
      </p>
      <Link
        href="/"
        className="font-meta mt-8 border-2 border-ink bg-wine px-5 py-2.5 text-sm font-bold uppercase text-parchment transition hover:bg-wine-dark"
      >
        {t("home")}
      </Link>
    </div>
  );
}
