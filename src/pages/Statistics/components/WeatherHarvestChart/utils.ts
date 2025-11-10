import { monthsData } from "@/utils/constants";
import { MonthName, WeatherYieldDayParameters } from "@/utils/types";

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

// Arrow function principale con tipizzazioni TypeScript
export const randomStatsChartDataGenerator = (
  monthName: MonthName,
  year: number = new Date().getFullYear()
): WeatherYieldDayParameters[] => {
  // Calcola giorni del mese (con anni bisestili per febbraio)
  const daysInMonth = getMonthDays(monthName, year);

  // Ottieni indice mese (0-based)
  const monthIndex = Object.keys(monthsData).indexOf(monthName);

  // Genera dati per ogni giorno
  return Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, monthIndex, i + 1);

    return {
      date: date.getDate(),
      temperature: generateNormalRandom(22, 5),
      humidity: generateNormalRandom(60, 15),
      precipitation: Math.max(0, generateNormalRandom(3, 5)),
      harvest: generateNormalRandom(120, 20),
    };
  });
};

type DailyCombinedData = {
  date: string;
  harvest: number; // produzione giornaliera
  precipitation: number; // precipitazioni giornaliere
  temperature: number; // temperatura giornaliera (opzionale, se vuoi linea multipla)
};

export const randomWeatherHarvestChartDataGenerator = (
  monthName: MonthName,
  year: number = new Date().getFullYear()
): DailyCombinedData[] => {
  // Calcolo giorni mese incluso bisestile
  const daysInMonth = getMonthDays(monthName, year);

  const monthIndex = Object.keys(monthsData).indexOf(monthName);
  const today = new Date();
  const chartArrayLength = monthIndex !== today.getMonth() || year !== today.getFullYear() ? daysInMonth : today.getDate();

  return Array.from({ length: chartArrayLength }, (_, i) => {
    const date = new Date(year, monthIndex, i + 1);

    return {
      date: date.toLocaleDateString("it-IT", { day: "2-digit" }),
      harvest: generateNormalRandom(120, 20), // Produzione media 120kg, variazione 20kg
      precipitation: Math.max(0, generateNormalRandom(3, 5)), // Precipitazioni (>= 0)
      temperature: generateNormalRandom(22, 5), // Temperatura media 22°C, variazione 5°C
    };
  });
};
