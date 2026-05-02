/**
 * Approximate USD→AED spot rate. Replace with a live FX feed when integrating billing.
 */
export const USD_TO_AED_RATE = 3.6725;

/**
 * Converts a USD amount to AED including a 15% markup.
 */
export function calculatePrice(usd: number): number {
  const aed = usd * USD_TO_AED_RATE * 1.15;
  return Math.round(aed * 100) / 100;
}
