"use client";

import { motion } from "framer-motion";
import {
  Clock,
  User,
  MapPin,
  XCircle,
  Info,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const myBookings = [
  {
    id: 1,
    house: "Modern Studio - INSAT",
    owner: "Ahmed Aloui",
    date: "May 5, 2026",
    time: "2:30 PM",
    status: "Approved",
    location: "Centre Urbain Nord, Ariana",
  },
  {
    id: 2,
    house: "Shared Apt - Ariana",
    owner: "Sami Ben Ali",
    date: "May 7, 2026",
    time: "10:00 AM",
    status: "Pending",
    location: "Ariana Ville",
  },
  {
    id: 3,
    house: "Luxury Loft - Marsa",
    owner: "Mouna Dridi",
    date: "May 10, 2026",
    time: "4:00 PM",
    status: "Cancelled",
    location: "La Marsa",
  },
];

export default function StudentBookingsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            My Visits
          </h1>
          <p className="text-slate-500 text-sm">
            Track your upcoming property viewings and requests
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Requests List */}
        <div className="lg:col-span-2 space-y-6">
          {myBookings.map((booking, i) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.07] transition-all group"
            >
              <div className="flex flex-col sm:flex-row items-center gap-8">
                {/* Date Card */}
                <div className="h-20 w-20 rounded-2xl bg-white/5 flex flex-col items-center justify-center border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all group-hover:scale-105">
                  <span className="text-[10px] font-black uppercase text-slate-500 group-hover:text-blue-200">
                    May
                  </span>
                  <span className="text-2xl font-black text-white">
                    {booking.date.split(" ")[1].replace(",", "")}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-500 transition-colors">
                      {booking.house}
                    </h3>
                    <StatusBadge status={booking.status} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                      <User className="h-3 w-3" />
                      Hosted by {booking.owner}
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                      <MapPin className="h-3 w-3" />
                      {booking.location}
                    </div>
                  </div>
                </div>

                {/* Time & Actions */}
                <div className="flex flex-row sm:flex-col items-center gap-3 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-white/5 pt-4 sm:pt-0 sm:pl-8">
                  <div className="flex-1 flex flex-col items-center sm:items-end">
                    <div className="flex items-center gap-2 text-white">
                      <Clock className="h-3.5 w-3.5 text-blue-500" />
                      <span className="text-sm font-black">{booking.time}</span>
                    </div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                      {booking.date}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-red-500"
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Info Panels */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-500" />
              Visit Checklist
            </h3>
            <ul className="space-y-4">
              {[
                "Check WiFi signal strength",
                "Ask about water & electricity bills",
                "Verify the proximity to your bus stop",
                "Take photos of the current state",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-xs text-slate-400 font-medium leading-relaxed"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-blue-400" />
              <h4 className="text-sm font-bold text-white">Need help?</h4>
            </div>
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
              If an owner asks for payment before the visit, please report it
              immediately. Never pay for a visit on Student Nest.
            </p>
            <Button className="w-full h-9 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    Approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border",
        colors[status as keyof typeof colors],
      )}
    >
      {status}
    </span>
  );
}
