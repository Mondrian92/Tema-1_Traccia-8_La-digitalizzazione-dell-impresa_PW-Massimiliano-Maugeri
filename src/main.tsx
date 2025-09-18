import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import { getI18nMessages } from "@/i18n";
import App from "./App";

const Root = () => {
  const messages = getI18nMessages("it");

  return (
    <IntlProvider messages={messages} locale="it" defaultLocale="it">
      <App />
    </IntlProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
