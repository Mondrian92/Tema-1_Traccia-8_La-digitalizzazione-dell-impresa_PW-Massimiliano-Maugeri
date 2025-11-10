import { monthsName } from "@/utils/constants";

export const getSelectMonthOptions = (index: number) =>
    Array.from({ length: monthsName.length }, (_, i) => monthsName[(index + i) % monthsName.length])
      .slice(1)
      .concat(monthsName[index]);