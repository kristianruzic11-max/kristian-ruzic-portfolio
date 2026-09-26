import { useLanguage } from "../i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-8">
      <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted">
          © {year} {t.name}. {t.footer.rights}
        </p>
        <nav aria-label="Footer" className="flex items-center gap-6">
          {t.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-ink-900"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
