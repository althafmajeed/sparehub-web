/**
 * UAE-focused vehicle matrix (Japanese, Korean, European, American, GCC-demand Chinese).
 * Years are expanded into the fitment tree at runtime — not every global variant,
 * but broad showroom coverage for exploration & search. Swap for TecDoc/API feeds in prod.
 */
export type ModelSpec = {
  name: string;
  yearFrom: number;
  yearTo: number;
  engines: string[];
};

export type BrandSpec = {
  make: string;
  /** GCC-relevant Chinese / regional brands flagged for filtering UI */
  segment?: "japanese" | "korean" | "european" | "american" | "chinese" | "luxury";
  models: ModelSpec[];
};

export const UAE_VEHICLE_MATRIX: BrandSpec[] = [
  {
    make: "Toyota",
    segment: "japanese",
    models: [
      {
        name: "Land Cruiser",
        yearFrom: 2016,
        yearTo: 2025,
        engines: ["4.6L V8", "5.7L V8", "3.5L V6 TT", "3.3L V6 TT"],
      },
      {
        name: "Camry",
        yearFrom: 2018,
        yearTo: 2025,
        engines: ["2.5L I4", "3.5L V6", "2.5L Hybrid"],
      },
      {
        name: "Corolla",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["1.6L I4", "2.0L I4", "1.8L Hybrid"],
      },
      {
        name: "Hilux",
        yearFrom: 2018,
        yearTo: 2025,
        engines: ["2.7L I4", "4.0L V6", "2.8L Diesel"],
      },
      {
        name: "Prado",
        yearFrom: 2018,
        yearTo: 2025,
        engines: ["4.0L V6", "2.8L Diesel"],
      },
    ],
  },
  {
    make: "Nissan",
    segment: "japanese",
    models: [
      {
        name: "Patrol",
        yearFrom: 2010,
        yearTo: 2025,
        engines: ["4.8L I6", "5.6L V8"],
      },
      {
        name: "X-Trail",
        yearFrom: 2018,
        yearTo: 2025,
        engines: ["2.5L I4", "e-Power Hybrid"],
      },
      {
        name: "Altima",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["2.5L I4", "2.0L Turbo"],
      },
      {
        name: "Navara",
        yearFrom: 2018,
        yearTo: 2025,
        engines: ["2.5L Diesel", "2.3L TT Diesel"],
      },
    ],
  },
  {
    make: "Honda",
    segment: "japanese",
    models: [
      {
        name: "Accord",
        yearFrom: 2018,
        yearTo: 2025,
        engines: ["1.5L Turbo", "2.0L Turbo", "2.0L Hybrid"],
      },
      {
        name: "Civic",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["1.5L Turbo", "2.0L I4"],
      },
      {
        name: "CR-V",
        yearFrom: 2018,
        yearTo: 2025,
        engines: ["1.5L Turbo", "2.0L Hybrid"],
      },
    ],
  },
  {
    make: "Mazda",
    segment: "japanese",
    models: [
      {
        name: "CX-5",
        yearFrom: 2018,
        yearTo: 2025,
        engines: ["2.0L I4", "2.5L I4", "2.5L Turbo"],
      },
      {
        name: "CX-9",
        yearFrom: 2018,
        yearTo: 2025,
        engines: ["2.5L Turbo"],
      },
      {
        name: "6",
        yearFrom: 2018,
        yearTo: 2025,
        engines: ["2.5L I4", "2.5L Turbo"],
      },
    ],
  },
  {
    make: "Mitsubishi",
    segment: "japanese",
    models: [
      {
        name: "Pajero",
        yearFrom: 2015,
        yearTo: 2025,
        engines: ["3.5L V6", "3.8L V6"],
      },
      {
        name: "Outlander",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["2.5L I4", "PHEV"],
      },
      {
        name: "L200",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["2.4L Diesel"],
      },
    ],
  },
  {
    make: "Lexus",
    segment: "luxury",
    models: [
      {
        name: "LX",
        yearFrom: 2018,
        yearTo: 2025,
        engines: ["5.7L V8", "3.5L V6 TT"],
      },
      {
        name: "RX",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["3.5L V6", "2.4L Turbo Hybrid"],
      },
    ],
  },
  {
    make: "Infiniti",
    segment: "luxury",
    models: [
      {
        name: "QX80",
        yearFrom: 2018,
        yearTo: 2025,
        engines: ["5.6L V8"],
      },
      {
        name: "QX50",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["2.0L VC-Turbo"],
      },
    ],
  },
  {
    make: "Isuzu",
    segment: "japanese",
    models: [
      {
        name: "D-Max",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["3.0L Diesel", "1.9L Diesel"],
      },
      {
        name: "MU-X",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["3.0L Diesel"],
      },
    ],
  },
  {
    make: "Hyundai",
    segment: "korean",
    models: [
      {
        name: "Tucson",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["2.5L I4", "1.6T Hybrid"],
      },
      {
        name: "Santa Fe",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["2.5L Turbo", "2.2L Diesel"],
      },
      {
        name: "Elantra",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["2.0L I4", "1.6L I4"],
      },
      {
        name: "Palisade",
        yearFrom: 2020,
        yearTo: 2025,
        engines: ["3.8L V6"],
      },
    ],
  },
  {
    make: "Kia",
    segment: "korean",
    models: [
      {
        name: "Sportage",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["2.5L I4", "1.6T Hybrid"],
      },
      {
        name: "Sorento",
        yearFrom: 2020,
        yearTo: 2025,
        engines: ["2.5L Turbo", "3.5L V6"],
      },
      {
        name: "Telluride",
        yearFrom: 2020,
        yearTo: 2025,
        engines: ["3.8L V6"],
      },
    ],
  },
  {
    make: "Genesis",
    segment: "luxury",
    models: [
      {
        name: "G80",
        yearFrom: 2021,
        yearTo: 2025,
        engines: ["2.5L Turbo", "3.5L TT"],
      },
      {
        name: "GV80",
        yearFrom: 2021,
        yearTo: 2025,
        engines: ["2.5L Turbo", "3.5L TT"],
      },
    ],
  },
  {
    make: "Mercedes-Benz",
    segment: "european",
    models: [
      {
        name: "G-Class",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["4.0L V8 TT", "G63 AMG"],
      },
      {
        name: "GLE",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["3.0L I6", "4.0L V8"],
      },
      {
        name: "C-Class",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["2.0L Turbo", "AMG 3.0L TT"],
      },
    ],
  },
  {
    make: "BMW",
    segment: "european",
    models: [
      {
        name: "X5",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["3.0L I6", "4.4L V8 TT"],
      },
      {
        name: "X7",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["3.0L I6", "4.4L V8 TT"],
      },
      {
        name: "5 Series",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["2.0L Turbo", "3.0L I6"],
      },
    ],
  },
  {
    make: "Audi",
    segment: "european",
    models: [
      {
        name: "Q7",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["3.0L V6", "SQ7 4.0T"],
      },
      {
        name: "Q8",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["3.0L V6", "RS 4.0T"],
      },
      {
        name: "A6",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["2.0L Turbo", "3.0L V6"],
      },
    ],
  },
  {
    make: "Volkswagen",
    segment: "european",
    models: [
      {
        name: "Touareg",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["3.0L V6", "3.0L TDI"],
      },
      {
        name: "Teramont",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["2.0L Turbo", "VR6"],
      },
    ],
  },
  {
    make: "Porsche",
    segment: "luxury",
    models: [
      {
        name: "Cayenne",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["3.0L V6", "4.0L TT V8"],
      },
      {
        name: "Macan",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["2.0L Turbo", "2.9L TT"],
      },
    ],
  },
  {
    make: "Land Rover",
    segment: "european",
    models: [
      {
        name: "Range Rover",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["3.0L I6", "4.4L V8"],
      },
      {
        name: "Defender",
        yearFrom: 2020,
        yearTo: 2025,
        engines: ["3.0L I6", "5.0L V8"],
      },
    ],
  },
  {
    make: "Ford",
    segment: "american",
    models: [
      {
        name: "F-150",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["3.5L EcoBoost", "5.0L V8"],
      },
      {
        name: "Explorer",
        yearFrom: 2020,
        yearTo: 2025,
        engines: ["2.3L EcoBoost", "3.0L TT"],
      },
      {
        name: "Everest",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["2.0L Bi-Turbo Diesel", "3.2L Diesel"],
      },
    ],
  },
  {
    make: "Chevrolet",
    segment: "american",
    models: [
      {
        name: "Tahoe",
        yearFrom: 2021,
        yearTo: 2025,
        engines: ["5.3L V8", "6.2L V8"],
      },
      {
        name: "Silverado",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["5.3L V8", "6.2L V8"],
      },
    ],
  },
  {
    make: "Jeep",
    segment: "american",
    models: [
      {
        name: "Wrangler",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["3.6L V6", "2.0L Turbo", "392 V8"],
      },
      {
        name: "Grand Cherokee",
        yearFrom: 2021,
        yearTo: 2025,
        engines: ["3.6L V6", "5.7L V8", "4xe"],
      },
    ],
  },
  {
    make: "RAM",
    segment: "american",
    models: [
      {
        name: "1500",
        yearFrom: 2019,
        yearTo: 2025,
        engines: ["5.7L HEMI", "3.6L V6", "TRX 6.2L"],
      },
    ],
  },
  {
    make: "GAC",
    segment: "chinese",
    models: [
      {
        name: "GS8",
        yearFrom: 2021,
        yearTo: 2025,
        engines: ["2.0T I4 Turbo", "2.0T Hybrid"],
      },
      {
        name: "GS3",
        yearFrom: 2021,
        yearTo: 2025,
        engines: ["1.5T I4"],
      },
      {
        name: "Empow",
        yearFrom: 2022,
        yearTo: 2025,
        engines: ["1.5T I4", "2.0T I4"],
      },
    ],
  },
  {
    make: "MG",
    segment: "chinese",
    models: [
      {
        name: "ZS",
        yearFrom: 2020,
        yearTo: 2025,
        engines: ["1.5L I4", "1.3T Turbo"],
      },
      {
        name: "RX5",
        yearFrom: 2020,
        yearTo: 2025,
        engines: ["1.5T I4", "PHEV"],
      },
      {
        name: "HS",
        yearFrom: 2020,
        yearTo: 2025,
        engines: ["2.0T I4"],
      },
    ],
  },
  {
    make: "Geely",
    segment: "chinese",
    models: [
      {
        name: "Coolray",
        yearFrom: 2021,
        yearTo: 2025,
        engines: ["1.5T I4"],
      },
      {
        name: "Tugella",
        yearFrom: 2021,
        yearTo: 2025,
        engines: ["2.0T I4"],
      },
      {
        name: "Monjaro",
        yearFrom: 2022,
        yearTo: 2025,
        engines: ["2.0T I4"],
      },
    ],
  },
  {
    make: "BYD",
    segment: "chinese",
    models: [
      {
        name: "Atto 3",
        yearFrom: 2022,
        yearTo: 2025,
        engines: ["EV", "Extended Range"],
      },
      {
        name: "Han",
        yearFrom: 2023,
        yearTo: 2025,
        engines: ["EV AWD", "DM-i Hybrid"],
      },
      {
        name: "Seal",
        yearFrom: 2023,
        yearTo: 2025,
        engines: ["EV RWD", "EV AWD"],
      },
    ],
  },
  {
    make: "Chery",
    segment: "chinese",
    models: [
      {
        name: "Tiggo 8 Pro",
        yearFrom: 2021,
        yearTo: 2025,
        engines: ["1.6T I4", "2.0T I4"],
      },
      {
        name: "Arrizo 8",
        yearFrom: 2023,
        yearTo: 2025,
        engines: ["1.6T I4"],
      },
      {
        name: "Omoda 5",
        yearFrom: 2023,
        yearTo: 2025,
        engines: ["1.6T I4"],
      },
    ],
  },
  {
    make: "Haval",
    segment: "chinese",
    models: [
      {
        name: "H6",
        yearFrom: 2021,
        yearTo: 2025,
        engines: ["2.0T I4", "1.5T I4"],
      },
      {
        name: "Jolion",
        yearFrom: 2021,
        yearTo: 2025,
        engines: ["1.5T I4"],
      },
      {
        name: "H9",
        yearFrom: 2022,
        yearTo: 2025,
        engines: ["2.0T I4"],
      },
    ],
  },
  {
    make: "Changan",
    segment: "chinese",
    models: [
      {
        name: "CS75 Plus",
        yearFrom: 2021,
        yearTo: 2025,
        engines: ["1.5T I4", "2.0T I4"],
      },
      {
        name: "UNI-K",
        yearFrom: 2022,
        yearTo: 2025,
        engines: ["2.0T I4"],
      },
    ],
  },
  {
    make: "Jetour",
    segment: "chinese",
    models: [
      {
        name: "T2",
        yearFrom: 2023,
        yearTo: 2025,
        engines: ["2.0T I4"],
      },
      {
        name: "X70 Plus",
        yearFrom: 2022,
        yearTo: 2025,
        engines: ["1.6T I4"],
      },
    ],
  },
  {
    make: "JAC",
    segment: "chinese",
    models: [
      {
        name: "T8",
        yearFrom: 2021,
        yearTo: 2025,
        engines: ["2.0T Diesel"],
      },
      {
        name: "JS4",
        yearFrom: 2022,
        yearTo: 2025,
        engines: ["1.5T I4"],
      },
    ],
  },
  {
    make: "Great Wall",
    segment: "chinese",
    models: [
      {
        name: "Poer",
        yearFrom: 2021,
        yearTo: 2025,
        engines: ["2.0T Diesel"],
      },
      {
        name: "Wingle 7",
        yearFrom: 2020,
        yearTo: 2025,
        engines: ["2.0T Diesel"],
      },
    ],
  },
];

/** Sorted brand names for explorer UI */
export const UAE_BRAND_NAMES = UAE_VEHICLE_MATRIX.map((b) => b.make).sort((a, b) =>
  a.localeCompare(b),
);

export const UAE_CHINESE_BRANDS = UAE_VEHICLE_MATRIX.filter(
  (b) => b.segment === "chinese",
)
  .map((b) => b.make)
  .sort((a, b) => a.localeCompare(b));
