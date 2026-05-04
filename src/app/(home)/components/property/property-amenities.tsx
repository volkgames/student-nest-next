"use client";

import { Wifi, Wind, Utensils, Coffee } from "lucide-react";

export function PropertyAmenities() {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-bold text-white uppercase tracking-widest text-[10px]">
        Amenities
      </h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 text-slate-300">
          <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Wifi className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold">High-speed WiFi</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300">
          <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Wind className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold">Air Conditioning</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300">
          <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Utensils className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold">Fully Equipped Kitchen</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300">
          <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Coffee className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold">Study Space</span>
        </div>
      </div>
    </div>
  );
}
