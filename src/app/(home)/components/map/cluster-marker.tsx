"use client";

import { Layers } from "lucide-react";
import { motion } from "framer-motion";

interface ClusterMarkerProps {
  longitude: number;
  latitude: number;
  pointCount: number;
  onClick: () => void;
}

export function ClusterMarker({ pointCount, onClick }: ClusterMarkerProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="relative flex items-center justify-center cursor-pointer group"
    >
      <div className="absolute inset-0 bg-blue-500/40 rounded-full animate-ping opacity-20" />
      <div className="h-10 w-10 bg-slate-900 border-2 border-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-2xl shadow-blue-500/30 z-10">
        {pointCount}
      </div>
      <div className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
        <Layers className="h-2 w-2 text-white" />
      </div>
    </motion.div>
  );
}
