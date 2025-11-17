// LanguageSelector.tsx
import { Select } from "@mantine/core";
import { useLanguage } from "@/components/LanguageProvider";

const LANGUAGE_LABELS = {
  it: "Italiano",
  en: "English",
};

const LanguageSelector = () => {
  const { locale, setLocale } = useLanguage();
  return (
    <Select
      value={locale}
      onChange={(val) => val && setLocale(val as "it" | "en")}
      data={Object.entries(LANGUAGE_LABELS).map(([value, label]) => ({ value, label }))}
      maw={200}
    />
  );
};

export default LanguageSelector;
