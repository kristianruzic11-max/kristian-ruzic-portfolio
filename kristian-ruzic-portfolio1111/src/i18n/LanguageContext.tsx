import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { content, type Content, type Lang } from "./content";

const STORAGE_KEY = "kr-portfolio-lang";

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "hr";

  // 1. Explicit ?lang=en / ?lang=hr in the URL always wins — this is what
  //    lets Kristian send a Croatian link to local clients and an English
  //    link to everyone else.
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("lang");
  if (fromUrl === "en" || fromUrl === "hr") {
    try {
      window.localStorage.setItem(STORAGE_KEY, fromUrl);
    } catch {
      // ignore (private browsing, etc.)
    }
    return fromUrl;
  }

  // 2. Remember the visitor's last choice.
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "hr") return stored;
  } catch {
    // ignore
  }

  // 3. Fall back to the browser's language.
  const browserLang = window.navigator.language?.toLowerCase() ?? "";
  if (browserLang.startsWith("hr")) return "hr";

  return "en";
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Content;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    // Keep the URL in sync so the current page can be shared as a
    // language-specific link, without adding a history entry.
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState({}, "", url);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = content[lang].meta.title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute("content", content[lang].meta.description);
    }
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute("content", content[lang].meta.title);
    }
    const ogDescriptionTag = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescriptionTag) {
      ogDescriptionTag.setAttribute("content", content[lang].meta.description);
    }
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: content[lang] }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
