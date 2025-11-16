import { monthsData } from "@/utils/constants";
import { MonthName } from "@/utils/types";

const getMonthDays = (monthName: MonthName, year: number) =>
  monthName === "february" && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
    ? 29
    : monthsData[monthName];

const generateNormalRandom = (mean: number, stdDev: number): number => {
  let firstRandomNumber = Math.random(),
    secondRandomNumber = Math.random();

  while (firstRandomNumber === 0) {
    firstRandomNumber = Math.random();
  }
  while (secondRandomNumber === 0) {
    secondRandomNumber = Math.random();
  }

  const normalDistributionValue =
    Math.sqrt(-2.0 * Math.log(firstRandomNumber)) * Math.cos(2.0 * Math.PI * secondRandomNumber);

  return Math.round((mean + normalDistributionValue * stdDev) * 10) / 10;
};

type DailyCombinedData = {
  date: string;
  harvest: number; // produzione giornaliera
  precipitation: number; // precipitazioni giornaliere
  temperature: number; // temperatura giornaliera
  sunExposure: number; // esposizione solare
  humidity: number; // umidita
};

export const randomWeatherHarvestChartDataGenerator = (
  monthName: MonthName,
  year: number = new Date().getFullYear()
): DailyCombinedData[] => {
  // Calcolo giorni mese incluso bisestile
  const daysInMonth = getMonthDays(monthName, year);

  const monthIndex = Object.keys(monthsData).indexOf(monthName);
  const today = new Date();
  const chartArrayLength =
    monthIndex !== today.getMonth() || year !== today.getFullYear() ? daysInMonth : today.getDate();

  return Array.from({ length: chartArrayLength }, (_, i) => {
    const date = new Date(year, monthIndex, i + 1);

    return {
      date: date.toLocaleDateString("it-IT", { day: "2-digit" }),
      harvest: generateNormalRandom(120, 20), // Produzione media 120kg, variazione 20kg
      precipitation: Math.max(0, generateNormalRandom(3, 5)), // Precipitazioni (>= 0)
      temperature: generateNormalRandom(22, 5), // Temperatura media 22°C, variazione 5°C
      sunExposure: generateNormalRandom(6, 2), // Esposizione solare media 6h, variazione 2h
      humidity: generateNormalRandom(60, 15), // Umidità media 60%, variazione 15%
    };
  });
};

export const getSavedWater = (
  predictedWater: number,
  rainfall: number,
  averageHumidity: number,
  averageTemperature: number,
  averageSunExposure: number
): number => {
  // Coefficienti empirici per i vari contributi
  const humidityCoeff = 0.1;
  const temperatureCoeff = 0.03;
  const optimalSunExposure = 8;
  const sunCoeff = 0.05;

  // Calcola il contributo umidità
  const humidityContribution = averageHumidity * humidityCoeff;
  // Calcola il contributo solare
  const sunContribution = (optimalSunExposure - averageSunExposure) * sunCoeff;
  // Calcola il "correttivo temperatura": più la temperatura è ALTA, meno si risparmia
  // Si considera 22°C una temperatura "ottimale" (azzerato); ogni grado in più riduce il risparmio
  const optimalTemperature = 22;
  let temperatureContribution = 0;
  if (averageTemperature < optimalTemperature) {
    // Se la temperatura è sotto l'ottimale, si risparmia un po' di più
    temperatureContribution = (optimalTemperature - averageTemperature) * temperatureCoeff;
  } else {
    // Se è sopra, si sottrae dal totale risparmiato perché aumenta il fabbisogno
    temperatureContribution = -1 * (averageTemperature - optimalTemperature) * temperatureCoeff;
  }

  // Totale apporto "naturale" corretto
  const totalNaturalContribution =
    rainfall + humidityContribution + temperatureContribution + sunContribution;
  // L'acqua risparmiata è sempre >= 0

  return Math.round(Math.max(predictedWater - totalNaturalContribution, 0));
};
