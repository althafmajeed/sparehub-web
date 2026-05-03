"use client";

import Link from "next/link";
import { Package, ShoppingCart, Truck } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog";
import { summarizeFitment } from "@/lib/catalog";
import { useCart } from "@/lib/cart-context";
import type { VehicleSelection } from "@/lib/fitment";
import {
  formatFitmentBadge,
  matchesVehicleFitment,
} from "@/lib/fitment";
import { calculatePrice } from "@/lib/utils";

type ProductCardProps = {
  part: CatalogProduct;
  vehicle: VehicleSelection;
  universalSearchActive: boolean;
  garageComplete: boolean;
};

export function ProductCard({
  part,
  vehicle,
  universalSearchActive,
  garageComplete,
}: ProductCardProps) {
  const { addItem } = useCart();
  const aed = calculatePrice(part.usd);
  const fitsGarage =
    garageComplete && matchesVehicleFitment(part.fitments, vehicle);

  let primaryBadge: string;
  if (universalSearchActive) {
    primaryBadge = summarizeFitment(part);
  } else if (garageComplete) {
    primaryBadge = formatFitmentBadge(vehicle);
  } else {
    primaryBadge = part.category;
  }

  const detailHref = `/shop/product/${encodeURIComponent(part.id)}`;

  return (
    <article className="group flex h-full flex-col rounded-xl border border-white/[0.08] bg-[#0c0d10] shadow-sm transition-all hover:border-[#FFBF00]/30 hover:shadow-[0_0_0_1px_rgba(255,191,0,0.08)]">
      <Link
        href={detailHref}
        className="flex flex-1 flex-col p-5 outline-none ring-[#FFBF00]/40 focus-visible:ring-2"
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="max-w-full rounded-full border border-[#FFBF00]/35 bg-[#FFBF00]/10 px-2.5 py-0.5 text-[11px] font-medium leading-snug text-[#FFBF00]">
            {primaryBadge}
          </span>
          {fitsGarage && universalSearchActive && (
            <span className="rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-300">
              Matches garage
            </span>
          )}
          {part.availability === "special_order" ? (
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-200">
              Special order
            </span>
          ) : (
            <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-300">
              In stock
            </span>
          )}
        </div>
        <div className="mb-4 flex items-start justify-between gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#FFBF00]/25 bg-[#FFBF00]/10 text-[#FFBF00] transition-colors group-hover:bg-[#FFBF00]/15">
            <Package className="h-5 w-5" aria-hidden />
          </div>
          <div className="text-right font-mono text-[11px] leading-tight text-zinc-500">
            <div>{part.sku}</div>
            <div className="text-zinc-400">OEM {part.oemCode}</div>
          </div>
        </div>
        <h2 className="flex-1 text-base font-medium leading-snug text-white group-hover:text-[#FFBF00]">
          {part.name}
        </h2>
        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-zinc-500">
          <Truck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-600" />
          {part.shippingEstimate}
        </p>
        <div className="mt-4 border-t border-white/[0.06] pt-4">
          <p className="font-mono text-lg font-semibold tabular-nums text-[#FFBF00]">
            AED {aed.toLocaleString("en-AE", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </Link>
      <div className="border-t border-white/[0.06] px-5 pb-5">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            addItem(part);
          }}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#FFBF00]/35 bg-[#FFBF00]/10 py-2.5 text-sm font-semibold text-[#FFBF00] transition-colors hover:bg-[#FFBF00]/20"
        >
          <ShoppingCart className="h-4 w-4" aria-hidden />
          Add to cart
        </button>
      </div>
    </article>
  );
}
