/**
 * Approximate USD→AED spot rate. Replace with a live FX feed when integrating billing.
 */
export const USD_TO_AED_RATE = 3.6725;

const INTERNAL_PRICE_ADJUST = 1.15;

/** Converts internal USD reference amounts to customer-facing AED list prices. */
export function calculatePrice(usd: number): number {
  const aed = usd * USD_TO_AED_RATE * INTERNAL_PRICE_ADJUST;
  return Math.round(aed * 100) / 100;
}
