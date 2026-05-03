import type { ReactNode } from "react";
import Link from "next/link";
import {
  Armchair,
  Car,
  CarFront,
  Cpu,
  Fuel,
  Funnel,
  MoveVertical,
  Settings2,
  Shield,
  Snowflake,
  Wind,
} from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/fitment";
import { UAE_BRAND_NAMES, UAE_CHINESE_BRANDS } from "@/lib/uae-vehicle-matrix";

const iconCls = "h-5 w-5 stroke-[1.35]";

const CATEGORY_ICON: Partial<
  Record<(typeof PRODUCT_CATEGORIES)[number], ReactNode>
> = {
  Engine: <Fuel className={iconCls} aria-hidden />,
  Transmission: <Settings2 className={iconCls} aria-hidden />,
  Brakes: <Shield className={iconCls} aria-hidden />,
  Suspension: <MoveVertical className={iconCls} aria-hidden />,
  "Electrical (ELV)": <Cpu className={iconCls} aria-hidden />,
  "Body Parts": <CarFront className={iconCls} aria-hidden />,
  "AC & Cooling": <Snowflake className={iconCls} aria-hidden />,
  Exhaust: <Wind className={iconCls} aria-hidden />,
  "Filters & Service": <Funnel className={iconCls} aria-hidden />,
  Interior: <Armchair className={iconCls} aria-hidden />,
};

export function PartsExploreSection() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-base font-semibold tracking-tight text-white">
          Explore spare parts by category
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Jump into the catalog with filters applied — OEM-style part numbers on each listing.
        </p>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {PRODUCT_CATEGORIES.map((cat) => (
            <li key={cat}>
              <Link
                href={`/shop?category=${encodeURIComponent(cat)}`}
                className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#0c0d10]/90 px-4 py-3.5 text-left text-sm font-medium text-zinc-200 transition-colors hover:border-[#FFBF00]/35 hover:bg-[#FFBF00]/[0.06] hover:text-white"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-[#090A0C] text-[#FFBF00] shadow-inner">
                  {CATEGORY_ICON[cat] ?? (
                    <Car className={iconCls} aria-hidden />
                  )}
                </span>
                <span className="leading-snug">{cat}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          UAE brands · showroom coverage
        </h3>
        <p className="mt-2 text-xs text-zinc-600">
          Japanese, Korean, European, American, and GCC-demand Chinese marques — select to search inventory for that brand.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {UAE_BRAND_NAMES.map((name) => (
            <Link
              key={name}
              href={`/shop?brand=${encodeURIComponent(name)}&q=${encodeURIComponent(name)}`}
              className="rounded-full border border-white/[0.08] bg-[#090A0C] px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-[#FFBF00]/40 hover:text-[#FFBF00]"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Chinese brands (UAE)
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {UAE_CHINESE_BRANDS.map((name) => (
            <Link
              key={name}
              href={`/shop?brand=${encodeURIComponent(name)}&q=${encodeURIComponent(name)}`}
              className="rounded-full border border-[#FFBF00]/20 bg-[#FFBF00]/[0.06] px-3 py-1.5 text-xs font-medium text-[#FFBF00] transition-colors hover:bg-[#FFBF00]/15"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
