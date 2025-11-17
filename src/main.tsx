import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import LanguageProvider, { useLanguage } from "@/components/LanguageProvider";
import App from "./App";

// Un wrapper che collega il context alla lingua di IntlProvider
function IntlWrapper() {
  const { locale, messages } = useLanguage();
  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale="it">
      <App />
    </IntlProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <IntlWrapper />
  </LanguageProvider>
);
