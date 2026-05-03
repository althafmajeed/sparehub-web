"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function CartNavButton() {
  const { totalQty } = useCart();

  return (
    <Link
      href="/cart"
      className="relative inline-flex h-10 items-center justify-center rounded-lg px-3 text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-white"
      aria-label={`Shopping cart, ${totalQty} items`}
    >
      <ShoppingCart className="h-5 w-5" aria-hidden />
      {totalQty > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FFBF00] px-1 font-mono text-[10px] font-bold leading-none text-[#090A0C]">
          {totalQty > 99 ? "99+" : totalQty}
        </span>
      )}
    </Link>
  );
}
