import type { VehicleSelection } from "@/lib/fitment";
import { isGarageComplete, vehicleFingerprint } from "@/lib/fitment";

const STORAGE_KEY = "sparehub-my-garage-v1";
const SESSION_ACTIVE = "sparehub-active-vehicle-v1";

export type SavedVehicle = VehicleSelection & {
  id: string;
  label: string;
  savedAt: number;
};

function readAll(): SavedVehicle[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedVehicle[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(list: SavedVehicle[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function listSavedVehicles(): SavedVehicle[] {
  return readAll().sort((a, b) => b.savedAt - a.savedAt);
}

export function saveVehicleToGarage(v: VehicleSelection): SavedVehicle | null {
  if (!isGarageComplete(v)) return null;
  const fp = vehicleFingerprint(v);
  if (!fp) return null;

  const list = readAll();
  const label = `${v.year} ${v.make} ${v.model}`;
  const existing = list.find(
    (x) => vehicleFingerprint(x) === fp,
  );
  if (existing) {
    return existing;
  }

  const entry: SavedVehicle = {
    ...v,
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `gv-${Date.now()}`,
    label,
    savedAt: Date.now(),
  };
  writeAll([entry, ...list]);
  return entry;
}

export function removeSavedVehicle(id: string) {
  writeAll(readAll().filter((x) => x.id !== id));
}

/** Queue vehicle for shop page to hydrate on load */
export function sessionApplyVehicle(v: VehicleSelection) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(SESSION_ACTIVE, JSON.stringify(v));
}

export function sessionConsumeVehicle(): VehicleSelection | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_ACTIVE);
    if (!raw) return null;
    window.sessionStorage.removeItem(SESSION_ACTIVE);
    return JSON.parse(raw) as VehicleSelection;
  } catch {
    return null;
  }
}
