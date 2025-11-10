import { MonthName } from "@/utils/types";

export const monthsData = {
  january: 31,
  february: 28,
  march: 31,
  april: 30,
  may: 31,
  june: 30,
  july: 31,
  august: 31,
  september: 30,
  october: 31,
  november: 30,
  december: 31,
} as const;

export const monthsName: MonthName[] = Object.keys(monthsData) as MonthName[];
