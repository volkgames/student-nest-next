"use client";

import { Star, MapPin, Home, Heart, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { House, useMapInteraction } from "@/context/map-context";
import { Button } from "@/components/ui/button";
import { calculateDistance, formatDistance, estimateWalkingTime } from "@/lib/distance";
import Image from "next/image";

interface HouseCardProps {
  house: House;
}

export function HouseCard({ house }: HouseCardProps) {
  const {
    hoveredHouseId,
    setHoveredHouseId,
    selectedHouseId,
    setSelectedHouseId,
    savedHouseIds,
    toggleSaveHouse,
    searchResult,
  } = useMapInteraction();

  const isSaved = savedHouseIds.includes(house.id);

  const distanceKm = searchResult
    ? calculateDistance(
        searchResult.latitude,
        searchResult.longitude,
        house.coordinates.latitude,
        house.coordinates.longitude
      )
    : null;

  const walkingTime = distanceKm ? estimateWalkingTime(distanceKm) : null;

  return (
    <div
      onMouseEnter={() => setHoveredHouseId(house.id)}
      onMouseLeave={() => setHoveredHouseId(null)}
      onClick={() => setSelectedHouseId(house.id)}
      className={cn(
        "group flex flex-col gap-2 p-3 rounded-2xl bg-white/5 border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/10",
        hoveredHouseId === house.id
          ? "border-blue-500/50 bg-white/10 scale-[1.02]"
          : "border-white/5 hover:border-blue-500/50 hover:bg-white/10",
        selectedHouseId === house.id &&
          "ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950",
      )}
    >
      <div
        className={cn(
          "relative h-24 w-full rounded-xl overflow-hidden flex items-center justify-center transition-transform group-hover:scale-[1.02]",
          house.imageColor.startsWith("bg-") ? house.imageColor : ""
        )}
        style={{
          backgroundColor: house.imageColor.startsWith("bg-") ? undefined : house.imageColor
        }}
      >
        {house.images && house.images.length > 0 ? (
          <Image
            src={house.images[0]}
            alt={house.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 192px"
          />
        ) : (
          <Home className="h-8 w-8 text-white/20" />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveHouse(house.id);
          }}
          className={cn(
            "absolute top-2 right-2 h-8 w-8 rounded-full backdrop-blur-md border transition-all duration-300",
            isSaved
              ? "bg-red-500/20 border-red-500/50 text-red-500"
              : "bg-black/20 border-white/10 text-white hover:bg-white/10"
          )}
        >
          <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
        </Button>

        {distanceKm !== null && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-600/90 backdrop-blur-md text-white text-[9px] font-bold shadow-lg">
            <Zap className="h-2.5 w-2.5 fill-current" />
            {formatDistance(distanceKm)} · {walkingTime}m walk
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-bold text-white line-clamp-1">
            {house.title}
          </h4>
          <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded-md">
            <Star className="h-2.5 w-2.5 fill-current" />
            {house.rating}
          </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <MapPin className="h-3 w-3" />
          {house.location}
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-black text-blue-400">
              {house.price}
            </span>
            <span className="text-[10px] text-slate-500 font-medium italic">
              TND/mo
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-blue-400 border border-blue-500/20 font-bold uppercase tracking-tighter">
            {house.roomType}
          </span>
        </div>
      </div>
    </div>
  );
}
