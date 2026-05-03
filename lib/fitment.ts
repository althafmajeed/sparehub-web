/**
 * YMMV fitment model and helpers for garage-first catalog search.
 * Replace mock trees with API/VIN decode integration in production.
 */

import { UAE_VEHICLE_MATRIX } from "@/lib/uae-vehicle-matrix";

export type VehicleSelection = {
  year: number | null;
  make: string | null;
  model: string | null;
  engine: string | null;
};

export const PRODUCT_CATEGORIES = [
  "Engine",
  "Transmission",
  "Brakes",
  "Suspension",
  "Electrical (ELV)",
  "Body Parts",
  "AC & Cooling",
  "Exhaust",
  "Filters & Service",
  "Interior",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const PART_CONDITIONS = [
  "New (OEM)",
  "New (Aftermarket)",
  "Refurbished",
] as const;

export type PartCondition = (typeof PART_CONDITIONS)[number];

export type StockAvailability = "in_stock" | "special_order";

/** Hierarchical catalog: year → make → model → engines[] */
export type FitmentTree = Record<
  number,
  Record<string, Record<string, string[]>>
>;

/** UAE showroom matrix → year × make × model × engines (expand via API/TecDoc in prod). */
function buildFitmentTreeFromMatrix(): FitmentTree {
  const tree: FitmentTree = {};
  for (const brand of UAE_VEHICLE_MATRIX) {
    for (const model of brand.models) {
      for (let y = model.yearFrom; y <= model.yearTo; y++) {
        if (!tree[y]) tree[y] = {};
        const mk = brand.make;
        if (!tree[y][mk]) tree[y][mk] = {};
        const prev = tree[y][mk][model.name];
        tree[y][mk][model.name] = [
          ...new Set([...(prev ?? []), ...model.engines]),
        ];
      }
    }
  }
  return tree;
}

export const FITMENT_TREE = buildFitmentTreeFromMatrix();

export function getYears(): number[] {
  return Object.keys(FITMENT_TREE)
    .map(Number)
    .sort((a, b) => b - a);
}

export function getMakes(year: number | null): string[] {
  if (year == null || !(year in FITMENT_TREE)) return [];
  return Object.keys(FITMENT_TREE[year]).sort();
}

export function getModels(year: number | null, make: string | null): string[] {
  if (year == null || make == null || !(year in FITMENT_TREE)) return [];
  const mk = FITMENT_TREE[year][make];
  if (!mk) return [];
  return Object.keys(mk).sort();
}

export function getEngines(
  year: number | null,
  make: string | null,
  model: string | null,
): string[] {
  if (year == null || make == null || model == null) return [];
  const node = FITMENT_TREE[year]?.[make]?.[model];
  return node ? [...node] : [];
}

export function isGarageComplete(v: VehicleSelection): boolean {
  return (
    v.year != null &&
    !!v.make &&
    !!v.model &&
    !!v.engine &&
    getEngines(v.year, v.make, v.model).includes(v.engine)
  );
}

export function resetCascadeFromYear(
  prev: VehicleSelection,
  year: number | null,
): VehicleSelection {
  return { year, make: null, model: null, engine: null };
}

export function resetCascadeFromMake(
  prev: VehicleSelection,
  make: string | null,
): VehicleSelection {
  return { ...prev, make, model: null, engine: null };
}

export function resetCascadeFromModel(
  prev: VehicleSelection,
  model: string | null,
): VehicleSelection {
  return { ...prev, model, engine: null };
}

/** Display string for product cards / badges */
export function formatFitmentBadge(v: VehicleSelection): string {
  if (!isGarageComplete(v)) return "";
  return `Fits your ${v.year} ${v.make} ${v.model}`;
}

/** Normalized key for deduping saved garage vehicles */
export function vehicleFingerprint(v: VehicleSelection): string | null {
  if (!isGarageComplete(v)) return null;
  return [v.year, v.make, v.model, v.engine].join("|");
}

export type FitmentRecord = {
  year: number;
  make: string;
  model: string;
  engine: string;
};

/** Whether a catalog row is compatible with the active garage selection */
export function matchesVehicleFitment(
  fitments: FitmentRecord[],
  active: VehicleSelection,
): boolean {
  if (!isGarageComplete(active)) return false;
  return fitments.some(
    (f) =>
      f.year === active.year &&
      f.make === active.make &&
      f.model === active.model &&
      f.engine === active.engine,
  );
}

const STOPWORDS = new Set([
  "for",
  "the",
  "and",
  "with",
  "set",
  "kit",
  "a",
  "an",
  "of",
  "to",
  "in",
]);

/**
 * Lightweight token scorer for AI/backend hand-off.
 * Highlights keyword overlap between NL query and product text fields.
 */
export function scoreNaturalLanguageMatch(
  query: string,
  fields: string[],
): number {
  const q = query.trim().toLowerCase();
  if (!q) return 1;
  const tokens = q
    .split(/[^a-z0-9]+/i)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
  if (tokens.length === 0) return 1;
  const hay = fields.join(" ").toLowerCase();
  let hits = 0;
  for (const t of tokens) {
    if (hay.includes(t)) hits += 1;
  }
  return hits / tokens.length;
}

export function passesNaturalLanguageFilter(
  query: string,
  fields: string[],
  minScore = 0.34,
): boolean {
  const q = query.trim();
  if (!q) return true;
  return scoreNaturalLanguageMatch(query, fields) >= minScore;
}
