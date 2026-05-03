import { Suspense } from "react";
import { ShopPageClient } from "@/components/ShopPageClient";

function ShopFallback() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-6 sm:px-6 lg:py-8">
      <div className="mb-5 h-5 w-28 rounded bg-zinc-800/80" />
      <div className="mb-6 h-44 rounded-xl bg-zinc-900/90" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-72 rounded-xl bg-zinc-900/75" />
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopFallback />}>
      <ShopPageClient />
    </Suspense>
  );
}
