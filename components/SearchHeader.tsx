"use client";

import { useCallback, useId, useRef, useState } from "react";
import { Camera, Loader2, Sparkles, X } from "lucide-react";
import type { VehicleSelection } from "@/lib/fitment";
import type { ProductFilters } from "@/lib/catalog";
import { ProductFilterDropdown } from "@/components/ProductFilterDropdown";
import { GarageToolbar } from "@/components/GarageToolbar";

type SearchHeaderProps = {
  vehicle: VehicleSelection;
  onVehicleChange: (next: VehicleSelection) => void;
  catalogQuery: string;
  onCatalogQueryChange: (q: string) => void;
  onVisualSearchFile?: (file: File | null) => void;
  onSaveToGarage?: () => void;
  saveFeedback?: boolean;
  filters: ProductFilters;
  onFiltersChange: (f: ProductFilters) => void;
  bounds: { min: number; max: number };
  resultCount?: number;
};

export function SearchHeader({
  vehicle,
  onVehicleChange,
  catalogQuery,
  onCatalogQueryChange,
  onVisualSearchFile,
  onSaveToGarage,
  saveFeedback,
  filters,
  onFiltersChange,
  bounds,
  resultCount,
}: SearchHeaderProps) {
  const searchId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [visualBusy, setVisualBusy] = useState(false);
  const [visualLabel, setVisualLabel] = useState<string | null>(null);

  const onPickVisual = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (!file || !file.type.startsWith("image/")) return;
      setVisualBusy(true);
      setVisualLabel(file.name);
      onVisualSearchFile?.(file);
      window.setTimeout(() => setVisualBusy(false), 500);
    },
    [onVisualSearchFile],
  );

  const searchActive = catalogQuery.trim().length > 0;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-gradient-to-b from-[#0e1014] to-[#0a0b0e] p-4 sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#FFBF00]">
            Marketplace
          </p>
          <h1 className="truncate text-lg font-semibold tracking-tight text-white sm:text-xl">
            Parts catalog
          </h1>
          {typeof resultCount === "number" && (
            <p className="mt-0.5 font-mono text-xs text-zinc-500">
              {resultCount.toLocaleString("en-AE")} listings match
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label htmlFor={searchId} className="sr-only">
          Search parts
        </label>
        <div className="relative min-h-[44px] flex-1">
          <Sparkles className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#FFBF00]" />
          <input
            id={searchId}
            type="search"
            value={catalogQuery}
            onChange={(e) => onCatalogQueryChange(e.target.value)}
            placeholder="Keyword, OEM, model, VIN prefix…"
            className={`w-full rounded-xl border border-white/[0.12] bg-[#090A0C] py-3 pl-11 text-[15px] text-white placeholder:text-zinc-600 outline-none ring-[#FFBF00]/20 focus:border-[#FFBF00]/40 focus:ring-2 ${searchActive ? "pr-11" : "pr-3"}`}
            autoComplete="off"
            spellCheck={false}
          />
          {searchActive && (
            <button
              type="button"
              onClick={() => onCatalogQueryChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-zinc-500 hover:bg-white/[0.06] hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ProductFilterDropdown
            filters={filters}
            onFiltersChange={onFiltersChange}
            bounds={bounds}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.12] bg-[#090A0C] text-zinc-300 transition-colors hover:border-[#FFBF00]/35 hover:text-[#FFBF00]"
            title="Visual scan — upload part photo"
            aria-label="Visual scan upload"
          >
            {visualBusy ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            ) : (
              <Camera className="h-5 w-5" aria-hidden />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => onPickVisual(e.target.files)}
          />
          <GarageToolbar
            vehicle={vehicle}
            onVehicleChange={onVehicleChange}
            onSaveToGarage={onSaveToGarage}
            saveFeedback={saveFeedback}
          />
        </div>
      </div>

      {visualLabel && (
        <p className="mt-2 font-mono text-[11px] text-zinc-500">
          Scan queued: {visualLabel}
        </p>
      )}
    </div>
  );
}
