import { Currency } from "@/types/Currency";


const exchangeRates: Record<Currency, number> = {
  // approximate values at the time of 23/04/2025
  RUR: 1,
  USD: 82,
  EUR: 92,
  BYN: 27,
  BYR: 27,
  KZT: 0.15,
  UZS: 0.000254,
  AZN: 47.92,
  GEL: 29.62,
  KGS: 0.94,
};

export const convertToRUB = (amount: number, currency: Currency): number|null => {
  if (amount != undefined) {
    const rate = exchangeRates[currency];
    if (rate === undefined) return null
    return Math.round(amount * rate);
  } else {
    return null
  }
};
