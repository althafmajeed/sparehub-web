import Link from "next/link";
import { getProductById } from "@/lib/catalog";
import { ProductDetailView } from "@/components/ProductDetailView";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const decoded = decodeURIComponent(id);
  const product = getProductById(decoded);
  if (!product) {
    return (
      <main className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-lg font-semibold text-white">Part not found</p>
        <p className="mt-2 text-sm text-zinc-500">
          This SKU may have been discontinued from the demo catalog.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block text-[#FFBF00] hover:underline"
        >
          Return to shop
        </Link>
      </main>
    );
  }

  return <ProductDetailView product={product} />;
}
