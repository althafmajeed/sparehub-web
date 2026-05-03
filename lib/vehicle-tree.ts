import type { FitmentTree } from "@/lib/fitment";

export type VehicleCombo = {
  make: string;
  model: string;
  engine: string;
  years: number[];
};

/** Roll up model years per make / model / engine for catalog generation */
export function aggregateVehicleCombos(tree: FitmentTree): VehicleCombo[] {
  const map = new Map<string, VehicleCombo>();

  for (const yStr of Object.keys(tree)) {
    const y = Number(yStr);
    for (const make of Object.keys(tree[y])) {
      for (const model of Object.keys(tree[y][make])) {
        for (const engine of tree[y][make][model]) {
          const key = `${make}|${model}|${engine}`;
          const cur = map.get(key);
          if (!cur) {
            map.set(key, { make, model, engine, years: [y] });
          } else if (!cur.years.includes(y)) {
            cur.years.push(y);
          }
        }
      }
    }
  }

  for (const c of map.values()) {
    c.years.sort((a, b) => a - b);
  }

  return [...map.values()].sort((a, b) =>
    `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`),
  );
}
