import { monthsData } from "@/utils/constants";

export type MonthName = keyof typeof monthsData;

export type WeatherYieldDayParameters = {
  date: number;
  temperature: number;
  humidity: number;
  precipitation: number;
  harvest: number;
};
