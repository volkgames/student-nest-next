"use client";

import { Star, Home, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { House, useMapInteraction } from "@/context/map-context";
import { Button } from "@/components/ui/button";

interface PropertyHeroProps {
  house: House;
}

export function PropertyHero({ house }: PropertyHeroProps) {
  const { savedHouseIds, toggleSaveHouse } = useMapInteraction();
  const isSaved = savedHouseIds.includes(house.id);

  return (
    <div className={cn("relative h-64 w-full", house.imageColor)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <Home className="h-16 w-16 text-white/10" />
      </div>
      <div className="absolute top-4 left-4">
        <div className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg">
          <Star className="h-3 w-3 fill-current" />
          {house.rating}
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleSaveHouse(house.id)}
          className={cn(
            "h-10 w-10 rounded-xl backdrop-blur-md border transition-all duration-300",
            isSaved
              ? "bg-red-500/20 border-red-500/50 text-red-500"
              : "bg-black/20 border-white/10 text-white hover:bg-white/10"
          )}
        >
          <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
        </Button>
      </div>
      <div className="absolute bottom-4 left-4">
        <span className="text-xs px-3 py-1 rounded-full bg-blue-600 text-white font-bold uppercase tracking-tighter shadow-lg shadow-blue-500/20">
          {house.roomType}
        </span>
      </div>
    </div>
  );
}
