"use client";

import { useMemo } from "react";
import {
  PART_CONDITIONS,
  PRODUCT_CATEGORIES,
  type PartCondition,
  type ProductCategory,
  type StockAvailability,
} from "@/lib/fitment";
import type { ProductFilters } from "@/lib/catalog";
import { Filter, Package } from "lucide-react";

type ProductFilterSidebarProps = {
  filters: ProductFilters;
  onFiltersChange: (next: ProductFilters) => void;
  /** Absolute AED bounds for slider endpoints */
  bounds: { min: number; max: number };
};

export function ProductFilterSidebar({
  filters,
  onFiltersChange,
  bounds,
}: ProductFilterSidebarProps) {
  const rangeMin = bounds.min;
  const rangeMax = bounds.max;

  const toggleCondition = (c: PartCondition) => {
    const next = new Set(filters.conditions);
    if (next.has(c)) next.delete(c);
    else next.add(c);
    onFiltersChange({ ...filters, conditions: next });
  };

  const toggleCategory = (c: ProductCategory) => {
    const next = new Set(filters.categories);
    if (next.has(c)) next.delete(c);
    else next.add(c);
    onFiltersChange({ ...filters, categories: next });
  };

  const toggleAvailability = (a: StockAvailability) => {
    const next = new Set(filters.availability);
    if (next.has(a)) next.delete(a);
    else next.add(a);
    onFiltersChange({ ...filters, availability: next });
  };

  const activeCount = useMemo(() => {
    return (
      filters.conditions.size +
      filters.categories.size +
      filters.availability.size +
      (filters.priceMinAed > rangeMin || filters.priceMaxAed < rangeMax ? 1 : 0)
    );
  }, [filters, rangeMin, rangeMax]);

  return (
    <aside className="rounded-xl border border-white/[0.08] bg-[#0c0d10] p-4 lg:sticky lg:top-20 lg:self-start">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Filter className="h-4 w-4 text-[#FFBF00]" aria-hidden />
          Filters
        </div>
        {activeCount > 0 && (
          <span className="rounded-full bg-[#FFBF00]/15 px-2 py-0.5 font-mono text-[10px] text-[#FFBF00]">
            {activeCount} active
          </span>
        )}
      </div>

      <section className="border-b border-white/[0.06] py-4 first:pt-0">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Condition
        </h3>
        <ul className="space-y-2">
          {PART_CONDITIONS.map((c) => (
            <li key={c}>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
                <input
                  type="checkbox"
                  checked={filters.conditions.has(c)}
                  onChange={() => toggleCondition(c)}
                  className="h-4 w-4 rounded border-white/20 bg-[#090A0C] text-[#FFBF00] focus:ring-[#FFBF00]/40"
                />
                {c}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-b border-white/[0.06] py-4">
        <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          <Package className="h-3.5 w-3.5" aria-hidden />
          Category
        </h3>
        <ul className="max-h-64 space-y-2 overflow-y-auto overscroll-contain pr-1">
          {PRODUCT_CATEGORIES.map((c) => (
            <li key={c}>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
                <input
                  type="checkbox"
                  checked={filters.categories.has(c)}
                  onChange={() => toggleCategory(c)}
                  className="h-4 w-4 rounded border-white/20 bg-[#090A0C] text-[#FFBF00] focus:ring-[#FFBF00]/40"
                />
                {c}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-b border-white/[0.06] py-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Price (AED)
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
            <span>{filters.priceMinAed.toLocaleString("en-AE")}</span>
            <span>{filters.priceMaxAed.toLocaleString("en-AE")}</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <label className="text-[11px] text-zinc-600">
              Min
              <input
                type="range"
                min={rangeMin}
                max={Math.min(filters.priceMaxAed, rangeMax)}
                step={50}
                value={filters.priceMinAed}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  onFiltersChange({
                    ...filters,
                    priceMinAed: Math.min(v, filters.priceMaxAed),
                  });
                }}
                className="mt-1 w-full accent-[#FFBF00]"
              />
            </label>
            <label className="text-[11px] text-zinc-600">
              Max
              <input
                type="range"
                min={Math.max(filters.priceMinAed, rangeMin)}
                max={rangeMax}
                step={50}
                value={filters.priceMaxAed}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  onFiltersChange({
                    ...filters,
                    priceMaxAed: Math.max(v, filters.priceMinAed),
                  });
                }}
                className="mt-1 w-full accent-[#FFBF00]"
              />
            </label>
          </div>
          <p className="text-[11px] leading-snug text-zinc-600">
            All amounts shown in AED.
          </p>
        </div>
      </section>

      <section className="pt-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Availability
        </h3>
        <ul className="space-y-2">
          <li>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
              <input
                type="checkbox"
                checked={filters.availability.has("in_stock")}
                onChange={() => toggleAvailability("in_stock")}
                className="h-4 w-4 rounded border-white/20 bg-[#090A0C] text-[#FFBF00] focus:ring-[#FFBF00]/40"
              />
              In stock
            </label>
          </li>
          <li>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
              <input
                type="checkbox"
                checked={filters.availability.has("special_order")}
                onChange={() => toggleAvailability("special_order")}
                className="h-4 w-4 rounded border-white/20 bg-[#090A0C] text-[#FFBF00] focus:ring-[#FFBF00]/40"
              />
              Special order
            </label>
          </li>
        </ul>
      </section>

      <button
        type="button"
        onClick={() =>
          onFiltersChange({
            conditions: new Set(),
            categories: new Set(),
            availability: new Set(),
            priceMinAed: rangeMin,
            priceMaxAed: rangeMax,
          })
        }
        className="mt-6 w-full rounded-lg border border-white/[0.1] py-2 text-xs font-medium text-zinc-400 transition-colors hover:border-[#FFBF00]/35 hover:text-white"
      >
        Reset filters
      </button>
    </aside>
  );
}
