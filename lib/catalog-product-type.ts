import type {
  FitmentRecord,
  PartCondition,
  ProductCategory,
  StockAvailability,
} from "@/lib/fitment";

/** Shared row shape for seed + generated inventory */
export type CatalogProduct = {
  id: string;
  sku: string;
  oemCode: string;
  name: string;
  usd: number;
  category: ProductCategory;
  condition: PartCondition;
  availability: StockAvailability;
  fitments: FitmentRecord[];
  shippingEstimate: string;
};
