import { useLanguage } from "../i18n/LanguageContext";
import type { Lang } from "../i18n/content";

const options: { value: Lang; label: string }[] = [
  { value: "hr", label: "HR" },
  { value: "en", label: "EN" },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.langSwitcher.label}
      className={`inline-flex items-center gap-0.5 rounded-full border border-line/80 bg-white/60 p-0.5 ${className}`}
    >
      {options.map((option) => {
        const active = option.value === lang;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLang(option.value)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors ${
              active
                ? "bg-ink-900 text-paper"
                : "text-ink-700 hover:text-ink-900"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
