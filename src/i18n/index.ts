import Cookies from "js-cookie";
import itTranslations from "./it.json";
import enTranslations from "./en.json";

export type TranslationId = keyof typeof itTranslations;
// TODO CHECK
export const isTranslationId = (id: string): id is TranslationId =>
  id in itTranslations || id in enTranslations;

export const LANGUAGES = ["it", "en"] as const;

export type Language = (typeof LANGUAGES)[number];

const translations: { [key in Language]: Record<string, string> } = {
  it: itTranslations,
  en: enTranslations,
};

const getI18nLanguage = (): Language => {
  let lang = Cookies.get("lang") as Language;

  if (!lang) {
    lang = navigator.language.slice(0, 2) as Language;
    Cookies.set("lang", lang, { expires: 2 });
  }
  return lang;
};

const setI18nLanguage = (language: Language) => {
  return Cookies.set("lang", language, { expires: 2 });
};

const getI18nMessages = (language: Language = "it") => translations[language];

export { getI18nLanguage, getI18nMessages, setI18nLanguage };
