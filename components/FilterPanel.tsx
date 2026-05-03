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
import { Package } from "lucide-react";

type FilterPanelProps = {
  filters: ProductFilters;
  onFiltersChange: (next: ProductFilters) => void;
  bounds: { min: number; max: number };
};

export function FilterPanel({
  filters,
  onFiltersChange,
  bounds,
}: FilterPanelProps) {
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
    <div className="flex flex-col">
      <div className="mb-3 flex items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Refine results
        </span>
        {activeCount > 0 && (
          <span className="font-mono text-[10px] text-[#FFBF00]">
            {activeCount} active
          </span>
        )}
      </div>

      <section className="border-b border-white/[0.06] py-3 first:pt-0">
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          Condition
        </h3>
        <ul className="space-y-1.5">
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

      <section className="border-b border-white/[0.06] py-3">
        <h3 className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          <Package className="h-3 w-3" aria-hidden />
          Category
        </h3>
        <ul className="max-h-40 space-y-1.5 overflow-y-auto overscroll-contain pr-1">
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

      <section className="border-b border-white/[0.06] py-3">
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          Price (AED)
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500">
            <span>{filters.priceMinAed.toLocaleString("en-AE")}</span>
            <span>{filters.priceMaxAed.toLocaleString("en-AE")}</span>
          </div>
          <label className="block text-[11px] text-zinc-600">
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
          <label className="block text-[11px] text-zinc-600">
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
          <p className="text-[11px] text-zinc-600">All amounts in AED.</p>
        </div>
      </section>

      <section className="py-3">
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          Availability
        </h3>
        <ul className="space-y-1.5">
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
        className="mt-2 w-full rounded-lg border border-white/[0.1] py-2 text-xs font-medium text-zinc-400 transition-colors hover:border-[#FFBF00]/35 hover:text-white"
      >
        Reset filters
      </button>
    </div>
  );
}
