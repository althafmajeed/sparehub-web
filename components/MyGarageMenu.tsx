"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Car, ChevronDown, Trash2 } from "lucide-react";
import {
  listSavedVehicles,
  removeSavedVehicle,
  sessionApplyVehicle,
  type SavedVehicle,
} from "@/lib/garage-storage";
import { isGarageComplete } from "@/lib/fitment";

export function MyGarageMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [vehicles, setVehicles] = useState<SavedVehicle[]>([]);

  const refresh = useCallback(() => {
    setVehicles(listSavedVehicles());
  }, []);

  useEffect(() => {
    refresh();
    const onStorage = () => refresh();
    const onCustom = () => refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener("sparehub-garage", onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("sparehub-garage", onCustom as EventListener);
    };
  }, [refresh]);

  const applyVehicle = (v: SavedVehicle) => {
    if (!isGarageComplete(v)) return;
    sessionApplyVehicle({
      year: v.year,
      make: v.make,
      model: v.model,
      engine: v.engine,
    });
    setOpen(false);
    router.push("/shop");
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-white"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        My Garage
        <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            role="menu"
            className="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-xl border border-white/[0.1] bg-[#0c0d10] shadow-xl shadow-black/40"
          >
            <div className="border-b border-white/[0.06] px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Saved vehicles
              </p>
              <p className="mt-1 text-[11px] text-zinc-600">
                Apply a profile on the shop to preload YMMV fitment.
              </p>
            </div>
            <ul className="max-h-72 overflow-y-auto py-2">
              {vehicles.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-zinc-600">
                  No vehicles yet. Complete fitment on{" "}
                  <Link
                    href="/shop"
                    className="text-[#FFBF00] underline-offset-2 hover:underline"
                    onClick={() => setOpen(false)}
                  >
                    Shop
                  </Link>{" "}
                  and tap &quot;Save to My Garage&quot;.
                </li>
              ) : (
                vehicles.map((v) => (
                  <li
                    key={v.id}
                    className="flex items-start gap-2 border-b border-white/[0.04] px-3 py-2 last:border-0"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded border border-white/[0.08] bg-[#090A0C] text-[#FFBF00]">
                      <Car className="h-4 w-4" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        {v.label}
                      </p>
                      <p className="font-mono text-[11px] text-zinc-500">
                        {v.engine}
                      </p>
                      <button
                        type="button"
                        onClick={() => applyVehicle(v)}
                        className="mt-1 text-xs font-semibold text-[#FFBF00] hover:underline"
                      >
                        Use on Shop
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        removeSavedVehicle(v.id);
                        refresh();
                      }}
                      className="shrink-0 rounded p-1.5 text-zinc-600 hover:bg-white/[0.06] hover:text-red-400"
                      aria-label={`Remove ${v.label}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
