import Link from "next/link";
import {
  Car,
  ChevronRight,
  CreditCard,
  Package,
  QrCode,
  ScanSearch,
  Shield,
  Warehouse,
} from "lucide-react";
import { HomeHeroSearch } from "@/components/HomeHeroSearch";
import { PartsExploreSection } from "@/components/PartsExploreSection";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,191,0,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,191,0,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-[#FFBF00]/[0.07] blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[280px] w-[380px] rounded-full bg-blue-500/[0.04] blur-[90px]"
        aria-hidden
      />

      {/* Sticky catalog search — sits below the fixed navbar (h-14) */}
      <div className="sticky top-14 z-40 border-b border-white/[0.07] bg-[#090A0C]/92 backdrop-blur-xl supports-[backdrop-filter]:bg-[#090A0C]/78">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <HomeHeroSearch />
        </div>
      </div>

      <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-20 pt-10 sm:gap-16 sm:px-6 sm:pb-28 sm:pt-12">
        <PartsExploreSection />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0d10] p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#FFBF00]/25 bg-[#FFBF00]/10 text-[#FFBF00]">
                <ScanSearch className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h2 className="text-base font-semibold text-white">
                  VIN intelligence
                </h2>
                <p className="text-xs text-zinc-500">
                  Decode WMI → brand context for search &amp; checkout.
                </p>
              </div>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-zinc-500">
              Enter a 17-character VIN on the shop to bias results toward the
              correct manufacturer line — wired for full decode APIs next.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <label className="sr-only" htmlFor="vin-input">
                Vehicle identification number
              </label>
              <input
                id="vin-input"
                name="vin"
                placeholder="17-char VIN"
                maxLength={17}
                className="font-mono min-h-12 flex-1 rounded-xl border border-white/[0.1] bg-[#090A0C] px-4 text-sm text-white uppercase placeholder:text-zinc-600 outline-none ring-[#FFBF00]/30 focus:border-[#FFBF00]/45 focus:ring-2"
              />
              <Link
                href="/shop"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#FFBF00]/35 bg-[#FFBF00]/10 px-6 text-sm font-semibold text-[#FFBF00] transition-colors hover:bg-[#FFBF00]/15"
              >
                Open shop
                <ChevronRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <p className="mt-4 font-mono text-[11px] text-zinc-600">
              Characters I, O, Q omitted per ISO VIN rules
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0d10] p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#FFBF00]">
                  <CreditCard className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-white">
                    Digital Mulkiya
                  </h2>
                  <p className="text-xs text-zinc-500">Garage preview</p>
                </div>
              </div>
              <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Demo
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-zinc-500">
              Fleet plates and chassis references attach to orders—preview how
              SpareHub presents linked vehicles at checkout.
            </p>

            <ul className="space-y-3">
              <li>
                <article className="group rounded-xl border border-white/[0.06] bg-[#090A0C] p-4 transition-colors hover:border-[#FFBF00]/25">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#FFBF00]">
                        <Car className="h-5 w-5" aria-hidden />
                      </div>
                      <div>
                        <p className="font-mono text-sm font-medium tracking-wide text-white">
                          D · 12345
                        </p>
                        <p className="text-xs text-zinc-500">
                          Toyota Land Cruiser · 2022
                        </p>
                      </div>
                    </div>
                    <QrCode
                      className="h-9 w-9 shrink-0 text-zinc-600 opacity-80 group-hover:text-[#FFBF00]/80"
                      aria-hidden
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-2 border-t border-white/[0.05] pt-3 font-mono text-[11px] text-zinc-500">
                    <Shield className="h-3.5 w-3.5 text-emerald-500/90" />
                    Chassis JTNBU43E ···· 98214
                  </div>
                </article>
              </li>
              <li>
                <article className="flex items-center gap-3 rounded-xl border border-dashed border-white/[0.1] bg-transparent px-4 py-5 text-sm text-zinc-600">
                  <Warehouse className="h-5 w-5 shrink-0 text-zinc-700" />
                  Save vehicles from Shop → My Garage in the nav bar.
                </article>
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0c0d10] to-[#090a0c] p-8 text-center">
          <Package className="mx-auto h-8 w-8 text-[#FFBF00]" aria-hidden />
          <p className="mt-4 text-lg font-semibold text-white">
            Ready for the full marketplace?
          </p>
          <p className="mx-auto mt-2 max-w-lg text-sm text-zinc-500">
            Browse with smart search and optional YMMV filters — all prices in AED.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FFBF00] px-8 py-3 text-sm font-semibold text-[#090A0C] transition-opacity hover:opacity-95"
          >
            Enter marketplace
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </main>
  );
}
