"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CatalogProduct } from "@/lib/catalog-product-type";
import { getProductById } from "@/lib/catalog";

export type CartLine = {
  productId: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  items: { line: CartLine; product: CatalogProduct | undefined }[];
  totalQty: number;
  addItem: (product: CatalogProduct, qty?: number) => void;
  removeLine: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "sparehub-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartLine[];
      if (Array.isArray(parsed)) {
        queueMicrotask(() => setLines(parsed));
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const addItem = useCallback((product: CatalogProduct, qty = 1) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.productId === product.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = {
          ...next[i],
          qty: Math.min(99, next[i].qty + qty),
        };
        return next;
      }
      return [...prev, { productId: product.id, qty }];
    });
  }, []);

  const removeLine = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    const q = Math.max(0, Math.min(99, Math.floor(qty)));
    setLines((prev) => {
      if (q === 0) return prev.filter((l) => l.productId !== productId);
      const i = prev.findIndex((l) => l.productId === productId);
      if (i < 0) return [...prev, { productId, qty: q }];
      const next = [...prev];
      next[i] = { ...next[i], qty: q };
      return next;
    });
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const items = useMemo(() => {
    return lines.map((line) => ({
      line,
      product: getProductById(line.productId),
    }));
  }, [lines]);

  const totalQty = useMemo(
    () => lines.reduce((s, l) => s + l.qty, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      items,
      totalQty,
      addItem,
      removeLine,
      setQty,
      clear,
    }),
    [lines, items, totalQty, addItem, removeLine, setQty, clear],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
