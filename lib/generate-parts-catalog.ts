import type { CatalogProduct } from "@/lib/catalog-product-type";
import {
  FITMENT_TREE,
  type FitmentRecord,
  type ProductCategory,
} from "@/lib/fitment";
import { aggregateVehicleCombos } from "@/lib/vehicle-tree";

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pickUsd(seed: string, base: number): number {
  const v = hashStr(seed) % 180;
  return Math.round((base * (0.72 + v / 250)) * 100) / 100;
}

type LineDef = {
  category: ProductCategory;
  name: string;
  baseUsd: number;
  oemSuffix: (serial: number) => string;
};

const PART_LINES: LineDef[] = [
  {
    category: "Brakes",
    name: "Front brake pad set — ceramic",
    baseUsd: 92,
    oemSuffix: (s) => `${581000 + (s % 9000)}-${((s % 89) + 10).toString().padStart(2, "0")}`,
  },
  {
    category: "Brakes",
    name: "Rear brake pad set",
    baseUsd: 78,
    oemSuffix: (s) => `${430400 + (s % 7000)}-${((s % 79) + 20).toString().padStart(2, "0")}`,
  },
  {
    category: "Engine",
    name: "Engine oil filter cartridge",
    baseUsd: 22,
    oemSuffix: (s) => `${26300 + (s % 5000)}-${((s % 39) + 10)}X${((s % 8) + 1)}00`,
  },
  {
    category: "Engine",
    name: "Air filter assembly",
    baseUsd: 38,
    oemSuffix: (s) => `${17801 + (s % 3000)}-${((s % 49) + 10)}${((s % 9) + 1)}`,
  },
  {
    category: "Transmission",
    name: "Automatic transmission filter kit",
    baseUsd: 48,
    oemSuffix: (s) => `${31726 + (s % 2000)}-${((s % 29) + 1)}XA`,
  },
  {
    category: "Suspension",
    name: "Front shock absorber — LH",
    baseUsd: 165,
    oemSuffix: (s) => `${48510 + (s % 8000)}-${((s % 59) + 30)}`,
  },
  {
    category: "Suspension",
    name: "Lower control arm — front RH",
    baseUsd: 210,
    oemSuffix: (s) => `${48068 + (s % 9000)}-${((s % 69) + 10)}`,
  },
  {
    category: "Electrical (ELV)",
    name: "Alternator — remanufactured 150A",
    baseUsd: 385,
    oemSuffix: (s) => `${27300 + (s % 7000)}-${((s % 99) + 1)}`,
  },
  {
    category: "Body Parts",
    name: "Front bumper cover — primed",
    baseUsd: 295,
    oemSuffix: (s) => `${86511 + (s % 4000)}-${((s % 39) + 10)}${((s % 7) + 1)}00`,
  },
  {
    category: "AC & Cooling",
    name: "A/C condenser assembly",
    baseUsd: 268,
    oemSuffix: (s) => `${97606 + (s % 6000)}-${((s % 49) + 10)}`,
  },
  {
    category: "Exhaust",
    name: "Rear muffler / resonator assembly",
    baseUsd: 198,
    oemSuffix: (s) => `${28700 + (s % 5000)}-${((s % 89) + 10)}`,
  },
  {
    category: "Filters & Service",
    name: "Cabin pollen filter",
    baseUsd: 28,
    oemSuffix: (s) => `${97133 + (s % 3000)}-${((s % 19) + 1)}L`,
  },
  {
    category: "Interior",
    name: "Floor mat set — velour OEM pattern",
    baseUsd: 118,
    oemSuffix: (s) => `${84260 + (s % 2000)}-${((s % 29) + 10)}`,
  },
];

function fitmentsForCombo(c: {
  make: string;
  model: string;
  engine: string;
  years: number[];
}): FitmentRecord[] {
  return c.years.map((year) => ({
    year,
    make: c.make,
    model: c.model,
    engine: c.engine,
  }));
}

export function buildGeneratedCatalog(): CatalogProduct[] {
  const combos = aggregateVehicleCombos(FITMENT_TREE);
  const out: CatalogProduct[] = [];
  let serial = 1;

  for (const combo of combos) {
    const fit = fitmentsForCombo(combo);
    const keyBase = `${combo.make}|${combo.model}|${combo.engine}`;

    for (let li = 0; li < PART_LINES.length; li++) {
      const line = PART_LINES[li];
      const seed = `${keyBase}|${line.name}|${li}`;
      const id = `gen-${serial}`;
      const sku = `SH-${combo.make.slice(0, 3).toUpperCase()}-${serial.toString(36).toUpperCase()}-${li}`;
      const oemCode = line.oemSuffix(serial);
      const usd = pickUsd(seed, line.baseUsd);
      const condRoll = hashStr(seed) % 10;
      const condition =
        condRoll < 7 ? "New (OEM)" : condRoll < 9 ? "New (Aftermarket)" : "Refurbished";
      const availability = hashStr(seed + "av") % 12 === 0 ? "special_order" : "in_stock";

      out.push({
        id,
        sku,
        oemCode,
        name: `${line.name} · ${combo.make} ${combo.model}`,
        usd,
        category: line.category,
        condition,
        availability,
        fitments: fit,
        shippingEstimate:
          availability === "special_order"
            ? "Special order · advisor confirms chassis cut"
            : "DIP / DXB corridor · stock-dependent ETA",
      });
      serial += 1;
    }
  }

  return out;
}
