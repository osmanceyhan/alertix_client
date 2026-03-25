"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Locale, Translations } from "./translations";

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType>({
  locale: "tr",
  t: translations.tr,
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("tr");

  useEffect(() => {
    // Tarayıcı dilini kontrol et
    const saved = localStorage.getItem("alertix_lang") as Locale | null;
    if (saved && translations[saved]) {
      setLocaleState(saved);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      setLocaleState(browserLang === "tr" ? "tr" : "en");
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("alertix_lang", l);
  };

  return (
    <I18nContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
