"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, ScanSearch, Sparkles } from "lucide-react";

export function HomeHeroSearch() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const submit = () => {
    const q = value.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  };

  return (
    <div className="relative">
      <label htmlFor="hero-catalog-search" className="sr-only">
        Search parts by name, vehicle, VIN, or part number
      </label>
      <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.1] bg-[#08090b]/90 p-2 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:flex-row sm:items-center">
        <div className="relative min-h-[52px] flex-1">
          <Sparkles
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#FFBF00]/90"
            aria-hidden
          />
          <input
            id="hero-catalog-search"
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            placeholder="Search parts — name, OEM code, model (e.g. Hyundai Tucson), or VIN…"
            className="w-full rounded-xl border border-transparent bg-[#090A0C] py-3.5 pl-12 pr-4 text-[15px] text-white placeholder:text-zinc-600 outline-none ring-[#FFBF00]/25 transition-[box-shadow,border-color] focus:border-[#FFBF00]/35 focus:ring-2"
            autoComplete="off"
          />
        </div>
        <button
          type="button"
          onClick={submit}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#FFBF00] px-8 py-3.5 text-sm font-semibold text-[#090A0C] transition-[transform,opacity] hover:opacity-95 active:scale-[0.99]"
        >
          Search catalog
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
        <span className="inline-flex items-center gap-1.5">
          <ScanSearch className="h-3.5 w-3.5 text-zinc-600" aria-hidden />
          Typo-friendly matching on brands &amp; SKUs
        </span>
        <span className="hidden sm:inline text-zinc-700">·</span>
        <span>Examples: hyundai, brake pad, 581012X000, KMH…</span>
      </p>
    </div>
  );
}
