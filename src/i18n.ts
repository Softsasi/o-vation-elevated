import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import bn from "./locales/bn.json";

export const SUPPORTED_LOCALES = ["en", "fr", "bn"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      bn: { translation: bn },
    },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LOCALES as unknown as string[],
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "ovation-locale",
    },
    interpolation: { escapeValue: false },
  });

const applyLang = (lng: string) => {
  const code = (SUPPORTED_LOCALES as readonly string[]).includes(lng) ? lng : "en";
  document.documentElement.lang = code;
};
applyLang(i18n.language);
i18n.on("languageChanged", applyLang);

export const localizedField = <T extends Record<string, any>>(
  record: T | null | undefined,
  field: keyof T,
  locale: string,
): any => {
  if (!record) return "";
  const t = (record as any).translations as Record<string, Record<string, any>> | undefined;
  return t?.[locale]?.[field as string] ?? record[field] ?? "";
};

export default i18n;
