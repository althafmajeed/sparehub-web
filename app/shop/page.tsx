import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { calculatePrice } from "@/lib/utils";

const parts = [
  {
    sku: "OE-TYC-88310",
    name: "Radiator assembly — GCC spec",
    usd: 428,
  },
  {
    sku: "FIL-MAN-HU816X",
    name: "Oil filter cartridge",
    usd: 24.5,
  },
  {
    sku: "BRK-AKE-098647",
    name: "Front brake pad set",
    usd: 112,
  },
  {
    sku: "ELC-BOS-028021",
    name: "Alternator 150A rebuilt",
    usd: 389,
  },
  {
    sku: "SUS-MOO-90603",
    name: "Lower control arm LH",
    usd: 198,
  },
  {
    sku: "ACD-DEN-47112",
    name: "A/C compressor clutch kit",
    usd: 267,
  },
];

export default function ShopPage() {
  return (
    <main className="relative flex flex-1 flex-col px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-[#FF9F0A]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Spare parts catalog
          </h1>
          <p className="mt-2 max-w-xl text-zinc-400">
            Sample grid layout. List prices in USD; AED includes our standard 15%
            markup over spot FX.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {parts.map((part) => {
            const aed = calculatePrice(part.usd);
            return (
              <li key={part.sku}>
                <article className="flex h-full flex-col rounded-xl border border-white/[0.08] bg-[#0c0d10] p-5 transition-colors hover:border-[#FF9F0A]/25">
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-[#FF9F0A]/25 bg-[#FF9F0A]/10 text-[#FF9F0A]">
                      <Package className="h-5 w-5" aria-hidden />
                    </div>
                    <span className="font-mono text-[11px] leading-tight text-zinc-500">
                      {part.sku}
                    </span>
                  </div>
                  <h2 className="flex-1 text-base font-medium leading-snug text-white">
                    {part.name}
                  </h2>
                  <div className="mt-4 border-t border-white/[0.06] pt-4">
                    <p className="font-mono text-lg font-semibold tabular-nums text-[#FF9F0A]">
                      AED {aed.toLocaleString("en-AE", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="font-mono mt-1 text-xs text-zinc-500">
                      USD {part.usd.toFixed(2)} list
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
