import type { ProductCategory, VehicleSelection } from "@/lib/fitment";
import type { CatalogProduct } from "@/lib/catalog-product-type";
import type { PartCondition, StockAvailability } from "@/lib/fitment";
import { matchesVehicleFitment, isGarageComplete } from "@/lib/fitment";
import { buildGeneratedCatalog } from "@/lib/generate-parts-catalog";

export type { CatalogProduct } from "@/lib/catalog-product-type";

/** Programmatic UAE matrix × part-line catalog (replace with DB/API for production scale). */
export const CATALOG: CatalogProduct[] = buildGeneratedCatalog();

export function getProductById(id: string): CatalogProduct | undefined {
  return CATALOG.find((p) => p.id === id);
}

export type ProductFilters = {
  conditions: Set<PartCondition>;
  categories: Set<ProductCategory>;
  priceMinAed: number;
  priceMaxAed: number;
  availability: Set<StockAvailability>;
};

export function defaultProductFilters(priceBounds: {
  min: number;
  max: number;
}): ProductFilters {
  return {
    conditions: new Set(),
    categories: new Set(),
    priceMinAed: priceBounds.min,
    priceMaxAed: priceBounds.max,
    availability: new Set(),
  };
}

/** Sidebar price / condition / category / availability — shared by garage & browse modes */
export function applySidebarFilters(
  products: CatalogProduct[],
  filters: ProductFilters,
  priceAed: (usd: number) => number,
): CatalogProduct[] {
  return products.filter((p) => {
    const aed = priceAed(p.usd);
    if (aed < filters.priceMinAed || aed > filters.priceMaxAed) return false;

    if (filters.conditions.size > 0 && !filters.conditions.has(p.condition)) {
      return false;
    }
    if (filters.categories.size > 0 && !filters.categories.has(p.category)) {
      return false;
    }
    if (
      filters.availability.size > 0 &&
      !filters.availability.has(p.availability)
    ) {
      return false;
    }

    return true;
  });
}

/** Full garage path: vehicle required, no text query */
export function filterCatalogByGarage(
  vehicle: VehicleSelection,
  filters: ProductFilters,
  priceAed: (usd: number) => number,
): CatalogProduct[] {
  if (!isGarageComplete(vehicle)) return [];
  const matched = CATALOG.filter((p) =>
    matchesVehicleFitment(p.fitments, vehicle),
  );
  return applySidebarFilters(matched, filters, priceAed);
}

/** Short label for browse-mode cards (brand coverage / applications). */
export function summarizeFitment(product: CatalogProduct): string {
  const makes = [...new Set(product.fitments.map((f) => f.make))];
  if (makes.length === 1) {
    const n = product.fitments.length;
    if (n <= 2) {
      return product.fitments
        .map((f) => `${f.year} ${f.make} ${f.model}`)
        .join(" · ");
    }
    return `${makes[0]} · ${n} applications`;
  }
  return `${makes.length} brands · ${product.fitments.length} applications`;
}

export function catalogPriceBoundsAed(priceAed: (usd: number) => number): {
  min: number;
  max: number;
} {
  let min = Infinity;
  let max = -Infinity;
  for (const p of CATALOG) {
    const v = priceAed(p.usd);
    if (v < min) min = v;
    if (v > max) max = v;
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return { min: 0, max: 5000 };
  }
  return { min: Math.floor(min), max: Math.ceil(max) + 500 };
}
