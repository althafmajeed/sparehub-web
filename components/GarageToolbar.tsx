"use client";

import { useEffect, useState } from "react";
import {
  CarFront,
  ChevronDown,
  Plus,
  RefreshCw,
} from "lucide-react";
import type { VehicleSelection } from "@/lib/fitment";
import {
  getEngines,
  getMakes,
  getModels,
  getYears,
  isGarageComplete,
  resetCascadeFromMake,
  resetCascadeFromModel,
  resetCascadeFromYear,
} from "@/lib/fitment";
import {
  listSavedVehicles,
  type SavedVehicle,
} from "@/lib/garage-storage";

function SelectMini(props: {
  label: string;
  value: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  const { label, value, placeholder, options, onChange, disabled } = props;
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono w-full rounded-lg border border-white/[0.1] bg-[#090A0C] py-2 pl-2 pr-7 text-xs text-white outline-none focus:border-[#FFBF00]/45 focus:ring-1 focus:ring-[#FFBF00]/30 disabled:opacity-40"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

type GarageToolbarProps = {
  vehicle: VehicleSelection;
  onVehicleChange: (v: VehicleSelection) => void;
  onSaveToGarage?: () => void;
  saveFeedback?: boolean;
};

export function GarageToolbar({
  vehicle,
  onVehicleChange,
  onSaveToGarage,
  saveFeedback,
}: GarageToolbarProps) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState<SavedVehicle[]>([]);

  const refreshSaved = () => setSaved(listSavedVehicles());

  useEffect(() => {
    queueMicrotask(() => refreshSaved());
    const onCustom = () => refreshSaved();
    window.addEventListener("sparehub-garage", onCustom);
    return () => window.removeEventListener("sparehub-garage", onCustom);
  }, []);

  const years = getYears();
  const makes = getMakes(vehicle.year);
  const models = getModels(vehicle.year, vehicle.make);
  const engines = getEngines(vehicle.year, vehicle.make, vehicle.model);
  const ready = isGarageComplete(vehicle);

  const applySaved = (v: SavedVehicle) => {
    onVehicleChange({
      year: v.year,
      make: v.make,
      model: v.model,
      engine: v.engine,
    });
    setOpen(false);
  };

  const labelShort = ready
    ? `${vehicle.year} ${vehicle.make} ${vehicle.model}`
    : "Garage";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-11 max-w-[200px] shrink-0 items-center gap-2 truncate rounded-xl border border-white/[0.12] bg-[#090A0C] px-3 text-sm font-medium text-zinc-200 transition-colors hover:border-[#FFBF00]/35 hover:text-white sm:max-w-[260px]"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <CarFront className="h-4 w-4 shrink-0 text-[#FFBF00]" aria-hidden />
        <span className="min-w-0 truncate">{labelShort}</span>
        <ChevronDown className="h-4 w-4 shrink-0 opacity-60" aria-hidden />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[55] cursor-default bg-black/40 backdrop-blur-[1px]"
            aria-label="Close garage"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-label="Garage and vehicle"
            className="absolute right-0 top-full z-[60] mt-2 w-[min(calc(100vw-2rem),360px)] rounded-xl border border-white/[0.1] bg-[#0c0d10] p-4 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65)]"
          >
            <div className="mb-4 flex items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                My garage
              </p>
              <button
                type="button"
                onClick={() => refreshSaved()}
                className="rounded p-1 text-zinc-500 hover:bg-white/[0.06] hover:text-white"
                aria-label="Refresh saved list"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            {saved.length > 0 ? (
              <ul className="mb-4 max-h-36 space-y-1 overflow-y-auto">
                {saved.map((v) => (
                  <li key={v.id}>
                    <button
                      type="button"
                      onClick={() => applySaved(v)}
                      className="w-full rounded-lg border border-transparent px-3 py-2 text-left text-sm text-white transition-colors hover:border-[#FFBF00]/25 hover:bg-[#FFBF00]/[0.06]"
                    >
                      <span className="font-medium">{v.label}</span>
                      <span className="mt-0.5 block font-mono text-[11px] text-zinc-500">
                        {v.engine}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-4 text-xs text-zinc-600">
                No saved vehicles yet. Build YMMV below and tap Save.
              </p>
            )}

            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Add / switch vehicle
            </p>
            <div className="grid grid-cols-2 gap-2">
              <SelectMini
                label="Year"
                value={vehicle.year != null ? String(vehicle.year) : ""}
                placeholder="Year"
                options={years.map((y) => ({
                  value: String(y),
                  label: String(y),
                }))}
                onChange={(v) =>
                  onVehicleChange(
                    resetCascadeFromYear(vehicle, v ? Number(v) : null),
                  )
                }
                disabled={false}
              />
              <SelectMini
                label="Make"
                value={vehicle.make ?? ""}
                placeholder={vehicle.year ? "Make" : "Year"}
                options={makes.map((m) => ({ value: m, label: m }))}
                onChange={(v) =>
                  onVehicleChange(resetCascadeFromMake(vehicle, v || null))
                }
                disabled={!vehicle.year}
              />
              <SelectMini
                label="Model"
                value={vehicle.model ?? ""}
                placeholder={vehicle.make ? "Model" : "Make"}
                options={models.map((m) => ({ value: m, label: m }))}
                onChange={(v) =>
                  onVehicleChange(resetCascadeFromModel(vehicle, v || null))
                }
                disabled={!vehicle.make}
              />
              <SelectMini
                label="Engine"
                value={vehicle.engine ?? ""}
                placeholder={vehicle.model ? "Engine" : "Model"}
                options={engines.map((e) => ({ value: e, label: e }))}
                onChange={(v) =>
                  onVehicleChange({ ...vehicle, engine: v || null })
                }
                disabled={!vehicle.model}
              />
            </div>

            {ready && onSaveToGarage && (
              <button
                type="button"
                onClick={() => {
                  onSaveToGarage();
                  refreshSaved();
                }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFBF00] py-2.5 text-xs font-semibold text-[#090A0C]"
              >
                <Plus className="h-4 w-4" aria-hidden />
                {saveFeedback ? "Saved to garage" : "Save this vehicle"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
