"use client";

import { User, Star } from "lucide-react";

export function PropertyHost() {
  return (
    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
          <User className="h-6 w-6 text-slate-400" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white">Ahmed K.</span>
          <span className="text-[10px] text-slate-500 font-medium italic">
            Professional Host
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="h-2 w-2 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
    </div>
  );
}
