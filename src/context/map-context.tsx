"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

export type House = {
  id: number;
  title: string;
  price: string;
  location: string;
  rating: number;
  type: string;
  roomType: string;
  imageColor: string;
  coordinates: {
    longitude: number;
    latitude: number;
  };
};

export const HOUSES: House[] = [
  {
    id: 1,
    title: "Modern Studio near ENIT",
    price: "450",
    location: "Belvédère, Tunis",
    rating: 4.8,
    type: "Studio",
    roomType: "S+0",
    imageColor: "bg-blue-500/20",
    coordinates: { longitude: 10.175, latitude: 36.822 },
  },
  {
    id: 2,
    title: "Shared Apartment - Manar 2",
    price: "350",
    location: "El Manar, Tunis",
    rating: 4.5,
    type: "Shared",
    roomType: "S+2",
    imageColor: "bg-purple-500/20",
    coordinates: { longitude: 10.152, latitude: 36.831 },
  },
  {
    id: 3,
    title: "Luxury Room - Marsa",
    price: "750",
    location: "La Marsa, Tunis",
    rating: 4.9,
    type: "Private Room",
    roomType: "S+1",
    imageColor: "bg-emerald-500/20",
    coordinates: { longitude: 10.324, latitude: 36.885 },
  },
  {
    id: 4,
    title: "Student Room near ESPRIT",
    price: "380",
    location: "Ghazela, Ariana",
    rating: 4.6,
    type: "Private Room",
    roomType: "S+3",
    imageColor: "bg-orange-500/20",
    coordinates: { longitude: 10.188, latitude: 36.892 },
  },
  {
    id: 5,
    title: "Cosy Studio - Cite El Khadra",
    price: "550",
    location: "Cite El Khadra, Tunis",
    rating: 4.7,
    type: "Studio",
    roomType: "S+0",
    imageColor: "bg-pink-500/20",
    coordinates: { longitude: 10.198, latitude: 36.838 },
  },
  {
    id: 6,
    title: "Large Shared Flat - Bardo",
    price: "300",
    location: "Le Bardo, Tunis",
    rating: 4.2,
    type: "Shared",
    roomType: "S+3",
    imageColor: "bg-indigo-500/20",
    coordinates: { longitude: 10.138, latitude: 36.808 },
  },
  {
    id: 7,
    title: "Premium Loft - Berges du Lac",
    price: "950",
    location: "Lac 1, Tunis",
    rating: 4.9,
    type: "Studio",
    roomType: "S+1",
    imageColor: "bg-cyan-500/20",
    coordinates: { longitude: 10.238, latitude: 36.835 },
  },
  {
    id: 8,
    title: "Affordable Room - Ariana Centre",
    price: "280",
    location: "Ariana Centre",
    rating: 4.1,
    type: "Private Room",
    roomType: "S+4",
    imageColor: "bg-rose-500/20",
    coordinates: { longitude: 10.192, latitude: 36.862 },
  },
];

export type Filters = {
  priceRange: "any" | "low" | "mid" | "high";
  roomType: "any" | "studio" | "shared" | "private";
};

type MapContextType = {
  hoveredHouseId: number | null;
  setHoveredHouseId: (id: number | null) => void;
  selectedHouseId: number | null;
  setSelectedHouseId: (id: number | null) => void;
  searchResult: { longitude: number; latitude: number; name: string } | null;
  setSearchResult: (
    result: { longitude: number; latitude: number; name: string } | null,
  ) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  filteredHouses: House[];
  savedHouseIds: number[];
  toggleSaveHouse: (id: number) => void;
  activeTab: "explorer" | "saved";
  setActiveTab: (tab: "explorer" | "saved") => void;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [hoveredHouseId, setHoveredHouseId] = useState<number | null>(null);
  const [selectedHouseId, setSelectedHouseId] = useState<number | null>(null);
  const [searchResult, setSearchResult] = useState<{
    longitude: number;
    latitude: number;
    name: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"explorer" | "saved">("explorer");

  const [savedHouseIds, setSavedHouseIds] = useState<number[]>([]);
  const mountedRef = useRef(false);

  // Load from localStorage once on the client after hydration
  useEffect(() => {
    setTimeout(() => {
      const saved = localStorage.getItem("student-nest-saved");
      if (saved) {
        setSavedHouseIds(JSON.parse(saved));
      }
    }, 0);
    mountedRef.current = true;
  }, []);

  // Persist to localStorage on changes, but skip the initial mount render
  useEffect(() => {
    if (mountedRef.current) {
      localStorage.setItem("student-nest-saved", JSON.stringify(savedHouseIds));
    }
  }, [savedHouseIds]);

  const toggleSaveHouse = (id: number) => {
    setSavedHouseIds((prev) =>
      prev.includes(id)
        ? prev.filter((houseId) => houseId !== id)
        : [...prev, id],
    );
  };

  const [filters, setFilters] = useState<Filters>({
    priceRange: "any",
    roomType: "any",
  });

  const filteredHouses = HOUSES.filter((house) => {
    const price = parseInt(house.price);
    const matchesPrice =
      filters.priceRange === "any" ||
      (filters.priceRange === "low" && price < 400) ||
      (filters.priceRange === "mid" && price >= 400 && price <= 600) ||
      (filters.priceRange === "high" && price > 600);

    const matchesType =
      filters.roomType === "any" ||
      house.type.toLowerCase().includes(filters.roomType.toLowerCase());

    return matchesPrice && matchesType;
  });

  return (
    <MapContext.Provider
      value={{
        hoveredHouseId,
        setHoveredHouseId,
        selectedHouseId,
        setSelectedHouseId,
        searchResult,
        setSearchResult,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        filteredHouses,
        savedHouseIds,
        toggleSaveHouse,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMapInteraction() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapInteraction must be used within a MapProvider");
  }
  return context;
}
