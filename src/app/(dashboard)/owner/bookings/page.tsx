"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const bookings = [
  {
    id: 1,
    student: "Sami Ben Ali",
    university: "INSAT",
    house: "Modern Studio - INSAT",
    date: "Today",
    time: "2:30 PM",
    status: "Pending",
    avatar: "SB",
  },
  {
    id: 2,
    student: "Leila Dridi",
    university: "ESPRIT",
    house: "Shared Apt - Ariana",
    date: "Tomorrow",
    time: "10:00 AM",
    status: "Confirmed",
    avatar: "LD",
  },
  {
    id: 3,
    student: "Yassine Mansour",
    university: "ENIT",
    house: "Luxury Loft - Marsa",
    date: "May 6, 2026",
    time: "4:00 PM",
    status: "Cancelled",
    avatar: "YM",
  },
];

export default function BookingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Visit Bookings
          </h1>
          <p className="text-slate-500 text-sm">
            Schedule and manage visits from potential student tenants
          </p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <Button
            variant="ghost"
            className="h-9 px-4 bg-white/10 text-white rounded-lg text-xs font-bold"
          >
            List View
          </Button>
          <Button
            variant="ghost"
            className="h-9 px-4 text-slate-500 hover:text-white rounded-lg text-xs font-bold"
          >
            Calendar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Bookings List */}
        <div className="lg:col-span-2 space-y-4">
          {bookings.map((booking, i) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.07] transition-all group relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                {/* Avatar */}
                <div className="h-16 w-16 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black text-xl shrink-0 group-hover:scale-110 transition-transform">
                  {booking.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                    <h3 className="text-lg font-bold text-white">
                      {booking.student}
                    </h3>
                    <span className="px-2 py-0.5 rounded-lg bg-white/5 text-slate-500 text-[9px] font-black uppercase tracking-widest border border-white/5">
                      {booking.university}
                    </span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500">
                    <MapPin className="h-3 w-3" />
                    <span className="text-xs font-medium">{booking.house}</span>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center sm:items-end shrink-0">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="text-xs font-bold">{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">{booking.time}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2">
                  <Button
                    variant="ghost"
                    className="h-10 w-10 p-0 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white rounded-xl transition-all"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-10 w-10 p-0 bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                  >
                    <XCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Small Calendar Mock */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                May 2026
              </h3>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg hover:bg-white/5"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg hover:bg-white/5"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <span
                  key={d}
                  className="text-[10px] font-bold text-slate-600 mb-2"
                >
                  {d}
                </span>
              ))}
              {Array.from({ length: 31 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "aspect-square flex items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer",
                    i + 1 === 4
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                      : "text-slate-400 hover:bg-white/5",
                    [4, 5, 6].includes(i + 1) &&
                      "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-indigo-400 after:rounded-full",
                  )}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <h4 className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">
              Weekly Summary
            </h4>
            <div className="text-2xl font-black mb-4">12 Planned Visits</div>
            <p className="text-[10px] opacity-70 leading-relaxed font-medium">
              You have 3 more visits this week compared to last week. Good job!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
