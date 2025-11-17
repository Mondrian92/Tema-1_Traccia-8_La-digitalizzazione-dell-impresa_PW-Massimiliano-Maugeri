import { CropType } from "@/pages/Statistics/components/StatsPerCropsChart/types";

export const cropTypes = ["lemons", "oranges", "tangerines", "verdello_lemons", "cedars"] as const;

// Tipizzazione esplicita degli oggetti, con chiavi limitate a CropType
// I valori assegnati ad ogni chiave sono empirici e servono a imitare
// dei dati verosimili così da rendere il grafico realistico

// Valori di partenza come produzione in kg per ogni coltura
export const baseProductionMeans: Record<CropType, number> = {
  lemons: 20000,
  oranges: 15000,
  tangerines: 18000,
  verdello_lemons: 13000,
  cedars: 14000,
};

// Valori di partenza come area in m2 per ogni coltura
export const baseAreaMeans: Record<CropType, number> = {
  lemons: 10000,
  oranges: 12000,
  tangerines: 8000,
  verdello_lemons: 9000,
  cedars: 7000,
};

// Valori di partenza come costo in euro al kg per ogni coltura
export const baseCostMeans: Record<CropType, number> = {
  lemons: 0.48,
  oranges: 0.45,
  tangerines: 0.6,
  verdello_lemons: 0.7,
  cedars: 0.4,
};
