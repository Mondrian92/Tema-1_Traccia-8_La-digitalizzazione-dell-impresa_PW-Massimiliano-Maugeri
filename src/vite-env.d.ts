/// <reference types="vite/client" />

declare global {
  namespace FormatjsIntl {
    interface Message {
      ids: TranslationId;
    }
    interface IntlConfig {
      locale: Locale;
    }
  }
}
