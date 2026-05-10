"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMapInteraction } from "@/context/map-context";
import {
  MapPin,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyHero } from "./property/property-hero";
import { PropertyStats } from "./property/property-stats";
import { PropertyAmenities } from "./property/property-amenities";
import { PropertyHost } from "./property/property-host";

export function PropertyDetails() {
  const { selectedHouseId, setSelectedHouseId, filteredHouses } = useMapInteraction();
  const house = filteredHouses.find((h) => h.id === selectedHouseId);

  return (
    <Sheet 
      open={!!selectedHouseId && !!house} 
      onOpenChange={(open) => !open && setSelectedHouseId(null)}
    >
      <SheetContent className="sm:max-w-md bg-slate-950 border-white/5 text-white p-0 overflow-y-auto custom-scrollbar">
        <SheetHeader className="sr-only">
          <SheetTitle>{house?.title || "Property Details"}</SheetTitle>
          <SheetDescription>
            Detailed information about the selected student housing property.
          </SheetDescription>
        </SheetHeader>
        {house && (
          <div className="flex flex-col h-full">
            <PropertyHero house={house} />

            <div className="p-6 flex flex-col gap-6">
              <SheetHeader className="text-left">
                <div className="flex justify-between items-start">
                  <div>
                    <SheetTitle className="text-2xl font-black text-white leading-tight">
                      {house.title}
                    </SheetTitle>
                    <div className="flex items-center gap-1 text-slate-400 text-sm mt-1">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      {house.location}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-black text-blue-400">
                      {house.price}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      TND / Month
                    </span>
                  </div>
                </div>
              </SheetHeader>

              <PropertyStats />

              {/* Description */}
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest text-[10px]">
                  Description
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  Located in the heart of {house.location.split(",")[0]}, this{" "}
                  {house.type.toLowerCase()} offers everything a student needs.
                  Modern finishes, quiet environment for studying, and close
                  proximity to public transport and major universities.
                </p>
              </div>

              <PropertyAmenities />

              <PropertyHost />
            </div>

            {/* Footer Actions */}
            <div className="mt-auto p-6 border-t border-white/5 bg-slate-950/50 backdrop-blur-md grid grid-cols-5 gap-3 sticky bottom-0">
              <Button
                variant="outline"
                className="col-span-1 h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button className="col-span-4 h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20">
                Schedule Visit
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
