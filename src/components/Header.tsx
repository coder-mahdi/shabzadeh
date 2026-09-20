import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavMenu } from "./NavMenu";

export async function Header() {
  const t = await getTranslations("Nav");
  const tSite = await getTranslations("Site");

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/stories", label: t("stories") },
    { href: "/travelogues", label: t("travelogues") },
    { href: "/gallery", label: t("gallery") },
    { href: "/videos", label: t("videos") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ] as const;

  return (
    <header className="border-b-4 border-ink bg-parchment text-ink">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <Link href="/" className="font-heading text-2xl leading-none sm:text-3xl">
          {tSite("name")}
        </Link>

        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="hidden h-10 w-10 shrink-0 border-2 border-ink bg-gradient-to-br from-wine via-gold to-charcoal sm:block"
          />
          <NavMenu menuLabel={t("menu")} closeLabel={t("close")}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-heading text-4xl uppercase leading-tight text-parchment transition hover:text-gold-soft sm:text-6xl"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-8 border-t-2 border-parchment/20 pt-6">
              <LanguageSwitcher />
            </div>
          </NavMenu>
        </div>
      </div>
    </header>
  );
}
