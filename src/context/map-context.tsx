"use client";

import React, { createContext, useContext, useState } from "react";

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
    coordinates: { longitude: 10.17, latitude: 36.82 },
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
    coordinates: { longitude: 10.15, latitude: 36.83 },
  },
  {
    id: 3,
    title: "Luxury Room - Marsa",
    price: "700",
    location: "La Marsa, Tunis",
    rating: 4.9,
    type: "Private Room",
    roomType: "S+1",
    imageColor: "bg-emerald-500/20",
    coordinates: { longitude: 10.32, latitude: 36.88 },
  },
];

type MapContextType = {
  hoveredHouseId: number | null;
  setHoveredHouseId: (id: number | null) => void;
  selectedHouseId: number | null;
  setSelectedHouseId: (id: number | null) => void;
  searchResult: { longitude: number; latitude: number; name: string } | null;
  setSearchResult: (result: { longitude: number; latitude: number; name: string } | null) => void;
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

  return (
    <MapContext.Provider
      value={{
        hoveredHouseId,
        setHoveredHouseId,
        selectedHouseId,
        setSelectedHouseId,
        searchResult,
        setSearchResult,
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
