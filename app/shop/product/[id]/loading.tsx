export default function ProductLoading() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="mb-8 h-5 w-32 animate-pulse rounded bg-zinc-800/80" />
      <div className="rounded-2xl border border-white/[0.06] bg-[#0c0d10] p-6 sm:p-8">
        <div className="flex flex-wrap gap-4">
          <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-zinc-800/80" />
          <div className="min-w-0 flex-1 space-y-3">
            <div className="h-3 w-24 animate-pulse rounded bg-zinc-800/70" />
            <div className="h-8 max-w-md animate-pulse rounded bg-zinc-800/90" />
            <div className="h-6 w-48 animate-pulse rounded bg-zinc-800/60" />
          </div>
        </div>
        <div className="mt-8 grid gap-4 border-t border-white/[0.06] pt-8 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-16 animate-pulse rounded bg-zinc-800/60" />
              <div className="h-5 w-full animate-pulse rounded bg-zinc-800/80" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
