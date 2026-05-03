import Fuse from "fuse.js";
import type { CatalogProduct } from "@/lib/catalog";
import { CATALOG } from "@/lib/catalog";
import { expandVinQueryForSearch } from "@/lib/vin-hints";

export type SearchIndexDoc = {
  id: string;
  product: CatalogProduct;
  title: string;
  skuNorm: string;
  oemNorm: string;
  fitmentLine: string;
};

function normalizeSkuOem(s: string): string {
  return s.replace(/[\s-]/g, "").toUpperCase();
}

export function buildSearchDocs(products: CatalogProduct[]): SearchIndexDoc[] {
  return products.map((p) => ({
    id: p.id,
    product: p,
    title: p.name,
    skuNorm: normalizeSkuOem(p.sku),
    oemNorm: normalizeSkuOem(p.oemCode),
    fitmentLine: p.fitments
      .map((f) => `${f.year} ${f.make} ${f.model} ${f.engine}`)
      .join(" · "),
  }));
}

let fuse: Fuse<SearchIndexDoc> | null = null;

function getFuse(): Fuse<SearchIndexDoc> {
  if (!fuse) {
    const docs = buildSearchDocs(CATALOG);
    fuse = new Fuse(docs, {
      keys: [
        { name: "title", weight: 0.38 },
        { name: "skuNorm", weight: 0.22 },
        { name: "oemNorm", weight: 0.2 },
        { name: "fitmentLine", weight: 0.42 },
      ],
      threshold: 0.42,
      ignoreLocation: true,
      minMatchCharLength: 2,
      distance: 88,
      shouldSort: true,
    });
  }
  return fuse;
}

/**
 * Fuzzy catalog search: part names, OEM codes, SKUs, vehicle copy (make/model/year),
 * plus VIN WMI expansion via {@link expandVinQueryForSearch}.
 * Tolerates minor spelling mistakes (e.g. “hyundia”, “hyundai”).
 */
function catalogBlob(p: CatalogProduct): string {
  const fit = p.fitments
    .map((f) => `${f.year} ${f.make} ${f.model} ${f.engine}`)
    .join(" ");
  return `${p.name} ${p.sku} ${p.oemCode} ${fit}`.toLowerCase();
}

/** Extra recall: token substring match (helps brand-wide queries like “hyundai”). */
function substringRecallProducts(expandedQuery: string): CatalogProduct[] {
  const lower = expandedQuery.toLowerCase();
  const tokens = lower
    .split(/[^a-z0-9]+/i)
    .filter((t) => t.length >= 3);
  if (tokens.length === 0) return [];

  const out: CatalogProduct[] = [];
  for (const p of CATALOG) {
    const blob = catalogBlob(p);
    if (tokens.some((t) => blob.includes(t))) {
      out.push(p);
    }
  }
  return out;
}

export function fuzzySearchCatalog(rawQuery: string): CatalogProduct[] {
  const q = rawQuery.trim();
  if (!q) return [];

  const expanded = expandVinQueryForSearch(q);
  const fuseSearch = getFuse();
  const hits = fuseSearch.search(expanded, { limit: 120 });

  const seen = new Set<string>();
  const out: CatalogProduct[] = [];
  for (const h of hits) {
    const id = h.item.id;
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(h.item.product);
  }

  for (const p of substringRecallProducts(expanded)) {
    if (seen.has(p.id)) continue;
    seen.add(p.id);
    out.push(p);
  }

  return out;
}
