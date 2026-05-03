"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { ProductFilters } from "@/lib/catalog";
import { FilterPanel } from "@/components/FilterPanel";
import type { StockAvailability } from "@/lib/fitment";

type ProductFilterDropdownProps = {
  filters: ProductFilters;
  onFiltersChange: (next: ProductFilters) => void;
  bounds: { min: number; max: number };
};

export function ProductFilterDropdown({
  filters,
  onFiltersChange,
  bounds,
}: ProductFilterDropdownProps) {
  const [open, setOpen] = useState(false);

  const activeCount = useMemo(() => {
    const rangeMin = bounds.min;
    const rangeMax = bounds.max;
    return (
      filters.conditions.size +
      filters.categories.size +
      filters.availability.size +
      (filters.priceMinAed > rangeMin || filters.priceMaxAed < rangeMax ? 1 : 0)
    );
  }, [filters, bounds.min, bounds.max]);

  const appliedSummary = useMemo(() => {
    const bits: string[] = [];
    if (filters.categories.size > 0) {
      bits.push(`${filters.categories.size} categor${filters.categories.size === 1 ? "y" : "ies"}`);
    }
    if (filters.conditions.size > 0) {
      bits.push(`${filters.conditions.size} condition`);
    }
    if (filters.availability.size > 0) {
      bits.push(
        [...filters.availability].map((a: StockAvailability) =>
          a === "in_stock" ? "in stock" : "special order",
        ).join(", "),
      );
    }
    if (
      filters.priceMinAed > bounds.min ||
      filters.priceMaxAed < bounds.max
    ) {
      bits.push("price range");
    }
    return bits.length ? bits.join(" · ") : "No filters";
  }, [filters, bounds.min, bounds.max]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border border-white/[0.12] bg-[#090A0C] px-3.5 text-sm font-medium text-zinc-200 transition-colors hover:border-[#FFBF00]/35 hover:text-white"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <SlidersHorizontal className="h-4 w-4 text-[#FFBF00]" aria-hidden />
        <span className="hidden sm:inline">Filters</span>
        {activeCount > 0 && (
          <span className="rounded-full bg-[#FFBF00]/20 px-1.5 py-0.5 font-mono text-[10px] text-[#FFBF00]">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[55] cursor-default bg-black/40 backdrop-blur-[1px]"
            aria-label="Close filters"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-label="Product filters"
            className="absolute right-0 top-full z-[60] mt-2 w-[min(calc(100vw-2rem),380px)] max-h-[min(72vh,560px)] overflow-y-auto rounded-xl border border-white/[0.1] bg-[#0c0d10] p-4 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65)] sm:right-0"
          >
            <p className="mb-3 text-[11px] leading-relaxed text-zinc-500">
              Active effect:{" "}
              <span className="font-medium text-zinc-300">{appliedSummary}</span>
            </p>
            <FilterPanel
              filters={filters}
              onFiltersChange={onFiltersChange}
              bounds={bounds}
            />
          </div>
        </>
      )}
    </div>
  );
}
