import { VacancyItemModel } from "@/types/VacancyItemModel";
import { convertToRUB } from "./convertCurrency";
import { Currency } from "@/types/Currency";

export const convertVacancySalary = (vacancy: VacancyItemModel|null): string => {
  if (!vacancy) return "Не указан"
  if (
    vacancy.salary &&
    (vacancy.salary.from != null || vacancy.salary.to != null)
  ) {
    const currency = vacancy.salary.currency as Currency;
    const convertedVCurFrom = convertToRUB(vacancy.salary.from, currency);
    const convertedVCurTo = convertToRUB(vacancy.salary.to, currency);
    
    let result = "";

    if (convertedVCurFrom != null) {
      result += `RUB ${convertedVCurFrom}`;
    }

    if (convertedVCurTo != null) {
      result +=
        convertedVCurFrom != null
          ? ` - RUB ${convertedVCurTo}`
          : `RUB ${convertedVCurTo}`;
    }
    return result;
  } else {
    return "Не указан";
  }
};
