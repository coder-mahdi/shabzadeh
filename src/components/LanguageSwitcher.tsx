"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Nav");

  const nextLocale =
    routing.locales.find((candidate) => candidate !== locale) ??
    routing.defaultLocale;

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      className="font-meta text-sm font-bold uppercase text-parchment underline-offset-4 hover:underline"
    >
      {t("switchLanguage")}
    </button>
  );
}
