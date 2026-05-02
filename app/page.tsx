import Link from "next/link";
import {
  Car,
  ChevronRight,
  CreditCard,
  QrCode,
  ScanSearch,
  Shield,
} from "lucide-react";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,159,10,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,159,10,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl space-y-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#FF9F0A]">
            Mozaco LLC
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Parts precision.
            <span className="block text-zinc-400">Built for the GCC fleet.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-zinc-400">
            SpareHub pairs VIN intelligence with a digital mulkiya garage—order
            the right component the first time.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-md bg-[#FF9F0A] px-5 py-2.5 text-sm font-semibold text-[#090A0C] transition-opacity hover:opacity-90"
            >
              Browse catalog
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0d10] p-6 shadow-[0_0_0_1px_rgba(255,159,10,0.06)]">
            <div className="mb-5 flex items-center gap-2 text-sm font-medium text-white">
              <ScanSearch className="h-5 w-5 text-[#FF9F0A]" aria-hidden />
              VIN search
            </div>
            <p className="mb-4 text-sm text-zinc-500">
              Decode fitment from the factory plate—trim, engine, and market
              code in one lookup.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <label className="sr-only" htmlFor="vin-input">
                Vehicle identification number
              </label>
              <input
                id="vin-input"
                name="vin"
                placeholder="e.g. 1HGBH41JXMN109186"
                maxLength={17}
                className="font-mono min-h-11 flex-1 rounded-md border border-white/[0.1] bg-[#090A0C] px-4 text-sm text-white uppercase placeholder:text-zinc-600 outline-none ring-[#FF9F0A]/40 focus:border-[#FF9F0A]/50 focus:ring-2"
              />
              <button
                type="button"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-[#FF9F0A]/40 bg-[#FF9F0A]/10 px-5 text-sm font-semibold text-[#FF9F0A] transition-colors hover:bg-[#FF9F0A]/15"
              >
                <ScanSearch className="h-4 w-4" aria-hidden />
                Decode
              </button>
            </div>
            <p className="mt-3 font-mono text-xs text-zinc-600">
              17 characters · no I, O, or Q
            </p>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0d10] p-6 shadow-[0_0_0_1px_rgba(255,159,10,0.06)]">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <CreditCard className="h-5 w-5 text-[#FF9F0A]" aria-hidden />
                Digital Mulkiya · garage preview
              </div>
              <span className="rounded border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                Demo
              </span>
            </div>
            <p className="mb-5 text-sm text-zinc-500">
              Linked vehicles appear here—plate, chassis, and policy context for
              checkout.
            </p>

            <ul className="space-y-3">
              <li>
                <article className="group rounded-lg border border-white/[0.06] bg-[#090A0C] p-4 transition-colors hover:border-[#FF9F0A]/20">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/[0.08] bg-white/[0.03] text-[#FF9F0A]">
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
                      className="h-9 w-9 shrink-0 text-zinc-600 opacity-80 group-hover:text-[#FF9F0A]/80"
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
                <article className="rounded-lg border border-dashed border-white/[0.08] bg-transparent p-4 text-center text-sm text-zinc-600">
                  Add a vehicle after your first VIN decode to populate this row.
                </article>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
