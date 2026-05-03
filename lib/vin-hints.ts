/**
 * Lightweight VIN hints for demo catalog search (WMI → brand keywords).
 * Replace with NHTSA / OEM VIN decode APIs in production.
 */

const WMI_RULES: { prefix: string; tokens: string[] }[] = [
  { prefix: "KMH", tokens: ["Hyundai"] },
  { prefix: "KM8", tokens: ["Hyundai"] },
  { prefix: "JN1", tokens: ["Nissan"] },
  { prefix: "JNK", tokens: ["Infiniti"] },
  { prefix: "JT2", tokens: ["Toyota"] },
  { prefix: "JTE", tokens: ["Toyota"] },
  { prefix: "WBA", tokens: ["BMW"] },
  { prefix: "WDC", tokens: ["Mercedes-Benz"] },
  { prefix: "WVW", tokens: ["Volkswagen"] },
];

/** Normalize user input that might be a VIN (alphanumeric, typical length). */
export function normalizeVinQuery(raw: string): string {
  return raw.replace(/[\s-]/g, "").toUpperCase();
}

/** Token strings to inject into fuzzy search when query looks like a VIN. */
export function expandVinQueryForSearch(raw: string): string {
  const v = normalizeVinQuery(raw);
  if (v.length < 3) return raw;
  const hints: string[] = [];
  for (const rule of WMI_RULES) {
    if (v.startsWith(rule.prefix)) {
      hints.push(...rule.tokens);
      break;
    }
  }
  if (hints.length === 0) return raw;
  return `${raw} ${hints.join(" ")}`;
}

export function looksLikeVin(raw: string): boolean {
  const v = normalizeVinQuery(raw);
  return v.length >= 11 && v.length <= 17 && /^[A-HJ-NPR-Z0-9]+$/i.test(v);
}
