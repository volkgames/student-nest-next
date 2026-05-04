"use client";

import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

interface SearchResultMarkerProps {
  name: string;
}

export function SearchResultMarker({ name }: SearchResultMarkerProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative group cursor-pointer"
    >
      <div className="absolute inset-0 bg-blue-500/40 rounded-full animate-ping scale-150" />
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600 border border-blue-400 text-white shadow-2xl shadow-blue-500/50">
        <GraduationCap className="h-5 w-5" />
        <span className="text-xs font-bold whitespace-nowrap">
          {name}
        </span>
      </div>
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-blue-600 border-r border-b border-blue-400" />
    </motion.div>
  );
}
