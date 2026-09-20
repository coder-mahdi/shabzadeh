"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";

export function NavMenu({
  menuLabel,
  closeLabel,
  children,
}: {
  menuLabel: string;
  closeLabel: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = useState(pathname);

  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="font-meta border-2 border-ink px-4 py-2 text-sm font-bold uppercase text-ink transition hover:bg-ink hover:text-parchment"
      >
        {open ? closeLabel : menuLabel}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-charcoal text-parchment">
          <div className="flex items-center justify-between border-b-4 border-parchment/20 px-4 py-5 sm:px-6">
            <span className="font-meta text-sm font-bold uppercase tracking-wide text-gold-soft">
              {menuLabel}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="font-meta border-2 border-parchment px-4 py-2 text-sm font-bold uppercase text-parchment transition hover:bg-parchment hover:text-charcoal"
            >
              {closeLabel}
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-3 px-4 py-10 sm:px-6">
            {children}
          </nav>
        </div>
      ) : null}
    </>
  );
}
