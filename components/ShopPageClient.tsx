"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Package } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SearchHeader } from "@/components/SearchHeader";
import {
  applySidebarFilters,
  catalogPriceBoundsAed,
  CATALOG,
  defaultProductFilters,
  filterCatalogByGarage,
  type ProductFilters,
} from "@/lib/catalog";
import {
  isGarageComplete,
  matchesVehicleFitment,
  PRODUCT_CATEGORIES,
  type ProductCategory,
  type VehicleSelection,
} from "@/lib/fitment";
import { fuzzySearchCatalog } from "@/lib/universal-search";
import { calculatePrice } from "@/lib/utils";
import {
  saveVehicleToGarage,
  sessionConsumeVehicle,
} from "@/lib/garage-storage";

const emptyVehicle: VehicleSelection = {
  year: null,
  make: null,
  model: null,
  engine: null,
};

const AED_BOUNDS = catalogPriceBoundsAed((usd) => calculatePrice(usd));

function initialCatalogQuery(sp: ReturnType<typeof useSearchParams>): string {
  const q = sp.get("q")?.trim();
  const brand = sp.get("brand")?.trim();
  return q || brand || "";
}

function initialFiltersFromParams(
  sp: ReturnType<typeof useSearchParams>,
): ProductFilters {
  const base = defaultProductFilters(AED_BOUNDS);
  const cat = sp.get("category")?.trim();
  if (cat && (PRODUCT_CATEGORIES as readonly string[]).includes(cat)) {
    base.categories = new Set([cat as ProductCategory]);
  }
  return base;
}

export function ShopPageClient() {
  const searchParams = useSearchParams();
  const [vehicle, setVehicle] = useState<VehicleSelection>(emptyVehicle);
  const [catalogQuery, setCatalogQuery] = useState(() =>
    initialCatalogQuery(searchParams),
  );
  const [, setVisualFile] = useState<File | null>(null);
  const [saveFeedback, setSaveFeedback] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const pending = sessionConsumeVehicle();
      if (pending && isGarageComplete(pending)) {
        setVehicle(pending);
      }
    });
  }, []);

  const bounds = AED_BOUNDS;

  const [filters, setFilters] = useState<ProductFilters>(() =>
    initialFiltersFromParams(searchParams),
  );

  useEffect(() => {
    const cat = searchParams.get("category")?.trim();
    if (!cat || !(PRODUCT_CATEGORIES as readonly string[]).includes(cat)) {
      return;
    }
    queueMicrotask(() =>
      setFilters((prev) => ({
        ...prev,
        categories: new Set([cat as ProductCategory]),
      })),
    );
  }, [searchParams]);

  const queryKey = searchParams.toString();
  useEffect(() => {
    queueMicrotask(() =>
      setCatalogQuery(initialCatalogQuery(searchParams)),
    );
  }, [queryKey, searchParams]);

  const garageReady = isGarageComplete(vehicle);
  const universalActive = catalogQuery.trim().length > 0;

  const results = useMemo(() => {
    const price = (usd: number) => calculatePrice(usd);

    if (universalActive) {
      let list = fuzzySearchCatalog(catalogQuery);
      list = applySidebarFilters(list, filters, price);
      if (garageReady) {
        list = list.filter((p) =>
          matchesVehicleFitment(p.fitments, vehicle),
        );
      }
      return list;
    }

    if (garageReady) {
      return filterCatalogByGarage(vehicle, filters, price);
    }

    return applySidebarFilters(CATALOG, filters, price);
  }, [
    universalActive,
    catalogQuery,
    filters,
    vehicle,
    garageReady,
  ]);

  const handleSaveGarage = () => {
    const saved = saveVehicleToGarage(vehicle);
    if (saved) {
      setSaveFeedback(true);
      window.dispatchEvent(new Event("sparehub-garage"));
      window.setTimeout(() => setSaveFeedback(false), 2200);
    }
  };

  return (
    <main className="relative flex flex-1 flex-col px-4 py-6 sm:px-6 lg:py-8">
      <div className="mx-auto w-full max-w-7xl">
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-[#FFBF00]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Link>

        <SearchHeader
          vehicle={vehicle}
          onVehicleChange={setVehicle}
          catalogQuery={catalogQuery}
          onCatalogQueryChange={setCatalogQuery}
          onVisualSearchFile={setVisualFile}
          onSaveToGarage={handleSaveGarage}
          saveFeedback={saveFeedback}
          filters={filters}
          onFiltersChange={setFilters}
          bounds={bounds}
          resultCount={results.length}
        />

        <section aria-live="polite" className="mt-6 min-h-[280px]">
          {results.length === 0 ? (
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0d10] px-6 py-14 text-center">
              <Package className="mx-auto h-10 w-10 text-zinc-600" />
              <p className="mt-4 text-base font-semibold text-white">
                No parts match right now
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
                Clear filters, widen your search, or pick another category.
                Full catalog loads by default—try removing category ticks in
                Filters.
              </p>
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((part) => (
                <li key={part.id}>
                  <ProductCard
                    part={part}
                    vehicle={vehicle}
                    universalSearchActive={universalActive}
                    garageComplete={garageReady}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
