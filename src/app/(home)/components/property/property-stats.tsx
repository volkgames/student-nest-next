"use client";

import { User, Calendar, ShieldCheck } from "lucide-react";

export function PropertyStats() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-white/5 border border-white/5 p-3 rounded-2xl flex flex-col items-center justify-center gap-1">
        <User className="h-4 w-4 text-blue-400" />
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
          Capacity
        </span>
        <span className="text-xs font-bold text-white">1 Student</span>
      </div>
      <div className="bg-white/5 border border-white/5 p-3 rounded-2xl flex flex-col items-center justify-center gap-1">
        <Calendar className="h-4 w-4 text-blue-400" />
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
          Min Stay
        </span>
        <span className="text-xs font-bold text-white">6 Months</span>
      </div>
      <div className="bg-white/5 border border-white/5 p-3 rounded-2xl flex flex-col items-center justify-center gap-1">
        <ShieldCheck className="h-4 w-4 text-blue-400" />
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
          Verified
        </span>
        <span className="text-xs font-bold text-white">Landlord</span>
      </div>
    </div>
  );
}
