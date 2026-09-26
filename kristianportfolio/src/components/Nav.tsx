import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MenuIcon, CloseIcon, ArrowUpRightIcon } from "./icons";

export function Nav() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the mobile menu on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-page">
        <div
          className={`relative z-50 mt-3 flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 sm:mt-5 sm:px-5 ${
            scrolled
              ? "border-line/80 bg-white/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] backdrop-blur-md"
              : "border-transparent bg-white/40 backdrop-blur-sm"
          }`}
        >
          <a
            href="#top"
            className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-ink-900"
          >
            Kristian <span className="text-muted">Ružić</span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {t.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-900/[0.05] hover:text-ink-900"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <a
              href={t.contact.gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-sm font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              {t.hero.secondaryCtaLabel}
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-900"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-paper/95 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="flex h-full flex-col items-center justify-center gap-2 px-6"
        >
          {t.nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`py-3 text-3xl font-medium text-ink-900 transition-all duration-500 ${
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: menuOpen ? `${100 + i * 60}ms` : "0ms" }}
            >
              {item.label}
            </a>
          ))}
          <a
            href={t.contact.gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className={`mt-6 inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-6 py-3 text-base font-medium text-paper transition-all duration-500 ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{
              transitionDelay: menuOpen
                ? `${100 + t.nav.length * 60}ms`
                : "0ms",
            }}
          >
            {t.hero.secondaryCtaLabel}
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}
