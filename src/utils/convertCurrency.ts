import { Currency } from "types/Currency";


const exchangeRates: Record<Currency, number> = {
  // approximate values at the time of 04/21/2025
  RUR: 1,
  USD: 82,
  EUR: 92,
  BYN: 27,
};

export const convertToRUB = (amount: number, currency: Currency): number|null => {
  if (amount != undefined) {
    const rate = exchangeRates[currency];
    return Math.round(amount * rate);
  } else {
    return null
  }
};
