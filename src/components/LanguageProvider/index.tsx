import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getI18nLanguage, getI18nMessages, Language, setI18nLanguage } from "@/i18n";

type LanguageContextValue = {
  locale: Language;
  setLocale: (lang: Language) => void;
  messages: Record<string, string>;
};

type Props = {
  children: ReactNode;
};

// Definisci il contesto e un hook helper
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage fuori dal LanguageProvider");
  }
  return ctx;
};

const LanguageProvider = ({ children }: Props) => {
  // Stato della lingua e dei messaggi
  const [locale, setLocale] = useState<Language>(getI18nLanguage());
  const [messages, setMessages] = useState(getI18nMessages("it"));

  // Aggiorna i messaggi quando cambia la lingua
  useEffect(() => {
    setI18nLanguage(locale);
    setMessages(getI18nMessages(locale));
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, messages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
