"use client";

import { Home as HomeIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { House } from "@/context/map-context";

interface HouseMarkerProps {
  house: House;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (id: number | null) => void;
  onClick: (id: number | null) => void;
}

export function HouseMarker({
  house,
  isHovered,
  onHover,
  onClick,
}: HouseMarkerProps) {
  return (
    <div
      onMouseEnter={() => onHover(house.id)}
      onMouseLeave={() => onHover(null)}
      onClick={(e) => {
        e.stopPropagation();
        onClick(house.id);
      }}
      className={cn(
        "relative group cursor-pointer transition-all duration-300",
        isHovered ? "scale-110 z-50" : "z-10"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border shadow-2xl transition-all duration-300",
          isHovered
            ? "bg-blue-600 border-blue-400 scale-105 shadow-blue-500/50"
            : "bg-slate-900/90 border-white/10 backdrop-blur-md"
        )}
      >
        <HomeIcon
          className={cn(
            "h-3.5 w-3.5",
            isHovered ? "text-white" : "text-blue-400"
          )}
        />
        <div className="flex items-center gap-1">
          <span className="text-xs font-black text-white tracking-tight">
            {house.price}
            <span className="text-[9px] opacity-70 ml-0.5">TND</span>
          </span>
          <span className="h-3 w-px bg-white/20 mx-0.5" />
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">
            {house.roomType}
          </span>
        </div>
      </div>
      <div
        className={cn(
          "absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b transition-colors duration-300",
          isHovered
            ? "bg-blue-600 border-blue-400"
            : "bg-slate-900/90 border-white/10"
        )}
      />
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 0.2, scale: 1.5 }}
          className="absolute inset-0 rounded-full bg-blue-500 -z-10"
        />
      )}
    </div>
  );
}
