"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Package,
  ShoppingCart,
  Truck,
} from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog-product-type";
import { summarizeFitment } from "@/lib/catalog";
import { useCart } from "@/lib/cart-context";
import { calculatePrice } from "@/lib/utils";

export function ProductDetailView({ product }: { product: CatalogProduct }) {
  const { addItem } = useCart();
  const aed = calculatePrice(product.usd);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-10">
      <Link
        href="/shop"
        className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-[#FFBF00]"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to shop
      </Link>

      <div className="rounded-2xl border border-white/[0.08] bg-[#0c0d10] p-6 sm:p-8">
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#FFBF00]/25 bg-[#FFBF00]/10 text-[#FFBF00]">
            <Package className="h-7 w-7" aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-[#FFBF00]">
              {product.category}
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {product.name}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.availability === "special_order" ? (
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-200">
                  Special order
                </span>
              ) : (
                <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                  In stock
                </span>
              )}
              <span className="rounded-full border border-white/[0.08] bg-[#090A0C] px-2.5 py-1 text-xs text-zinc-400">
                {summarizeFitment(product)}
              </span>
            </div>
          </div>
        </div>

        <dl className="mt-8 grid gap-4 border-t border-white/[0.06] pt-8 font-mono text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-zinc-500">
              SKU
            </dt>
            <dd className="mt-1 text-white">{product.sku}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-zinc-500">
              OEM / Part number
            </dt>
            <dd className="mt-1 text-white">{product.oemCode}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-zinc-500">
              Condition
            </dt>
            <dd className="mt-1 text-white">{product.condition}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-zinc-500">
              Logistics
            </dt>
            <dd className="mt-1 flex items-start gap-2 text-zinc-300">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600" />
              {product.shippingEstimate}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-3xl font-semibold tabular-nums text-[#FFBF00]">
              AED {aed.toLocaleString("en-AE", { minimumFractionDigits: 2 })}
            </p>
            <p className="mt-1 text-xs text-zinc-500">VAT where applicable at checkout</p>
          </div>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFBF00] px-8 py-3.5 text-sm font-semibold text-[#090A0C] transition-opacity hover:opacity-95"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden />
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}
