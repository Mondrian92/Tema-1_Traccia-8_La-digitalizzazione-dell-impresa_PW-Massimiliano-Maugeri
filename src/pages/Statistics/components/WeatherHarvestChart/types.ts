export type DailyCombinedData = {
  date: string;
  harvest: number; // produzione giornaliera
  precipitation: number; // precipitazioni giornaliere
  temperature: number; // temperatura giornaliera
  sunExposure: number; // esposizione solare
  humidity: number; // umidita
};
