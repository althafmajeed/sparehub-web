"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { calculatePrice } from "@/lib/utils";

export default function CartPage() {
  const { items, setQty, removeLine, totalQty, clear } = useCart();

  const subtotal = items.reduce((sum, { line, product }) => {
    if (!product) return sum;
    return sum + calculatePrice(product.usd) * line.qty;
  }, 0);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Cart
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Review spare parts before checkout.
          </p>
        </div>
        <Link
          href="/shop"
          className="text-sm font-medium text-[#FFBF00] hover:underline"
        >
          Continue shopping
        </Link>
      </div>

      {totalQty === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/[0.12] px-8 py-16 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-zinc-600" />
          <p className="mt-4 text-lg font-medium text-white">Your cart is empty</p>
          <p className="mt-2 text-sm text-zinc-500">
            Browse the catalog and tap Add to cart on any part.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex rounded-xl bg-[#FFBF00] px-6 py-3 text-sm font-semibold text-[#090A0C]"
          >
            Go to shop
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.08] bg-[#0c0d10]">
            {items.map(({ line, product }) => {
              if (!product) {
                return (
                  <li
                    key={line.productId}
                    className="flex items-center justify-between gap-4 px-4 py-4 text-sm text-zinc-500"
                  >
                    Unknown product ({line.productId})
                    <button
                      type="button"
                      onClick={() => removeLine(line.productId)}
                      className="text-red-400 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                );
              }
              const lineTotal =
                calculatePrice(product.usd) * line.qty;
              return (
                <li
                  key={line.productId}
                  className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/shop/product/${encodeURIComponent(product.id)}`}
                      className="font-medium text-white hover:text-[#FFBF00]"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 font-mono text-xs text-zinc-500">
                      {product.sku} · OEM {product.oemCode}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center rounded-lg border border-white/[0.1]">
                      <button
                        type="button"
                        className="p-2 text-zinc-400 hover:bg-white/[0.05] hover:text-white"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          setQty(line.productId, line.qty - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-[2rem] text-center font-mono text-sm text-white">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        className="p-2 text-zinc-400 hover:bg-white/[0.05] hover:text-white"
                        aria-label="Increase quantity"
                        onClick={() =>
                          setQty(line.productId, line.qty + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="min-w-[100px] text-right font-mono text-sm font-semibold tabular-nums text-[#FFBF00]">
                      AED{" "}
                      {lineTotal.toLocaleString("en-AE", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeLine(line.productId)}
                      className="rounded-lg p-2 text-zinc-600 hover:bg-red-500/10 hover:text-red-400"
                      aria-label="Remove line"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-[#0c0d10] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-zinc-500">Subtotal (AED)</p>
              <p className="font-mono text-2xl font-semibold tabular-nums text-white">
                {subtotal.toLocaleString("en-AE", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => clear()}
                className="rounded-xl border border-white/[0.12] px-5 py-3 text-sm font-medium text-zinc-400 hover:border-white/[0.2] hover:text-white"
              >
                Clear cart
              </button>
              <button
                type="button"
                className="rounded-xl bg-[#FFBF00] px-8 py-3 text-sm font-semibold text-[#090A0C] opacity-90"
                disabled
                title="Connect payment gateway in production"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-zinc-600">
            Checkout is disabled in this demo — wire your payment &amp; order API here.
          </p>
        </>
      )}
    </main>
  );
}
