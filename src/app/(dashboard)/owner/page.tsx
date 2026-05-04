"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Building2, Users, Eye, TrendingUp, Clock } from "lucide-react";

const stats = [
  {
    label: "Total Earnings",
    value: "2,450 DT",
    change: "+12.5%",
    icon: TrendingUp,
    color: "text-emerald-400",
  },
  {
    label: "Total Views",
    value: "12,840",
    change: "+8.2%",
    icon: Eye,
    color: "text-blue-400",
  },
  {
    label: "Active Listings",
    value: "4",
    change: "0%",
    icon: Building2,
    color: "text-indigo-400",
  },
  {
    label: "Pending Visits",
    value: "12",
    change: "+24%",
    icon: Users,
    color: "text-amber-400",
  },
];

const recentBookings = [
  {
    student: "Sami Ben Ali",
    house: "Modern Studio - INSAT",
    date: "Today, 2:30 PM",
    status: "Pending",
  },
  {
    student: "Leila Dridi",
    house: "Shared Apt - Ariana",
    date: "Tomorrow, 10:00 AM",
    status: "Confirmed",
  },
  {
    student: "Yassine Mansour",
    house: "Luxury Loft - Marsa",
    date: "May 6, 4:00 PM",
    status: "Cancelled",
  },
];

export default function OwnerOverview() {
  return (
    <div className="space-y-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 p-6 rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon className="h-16 w-16" />
            </div>
            <div className="flex flex-col gap-1 relative z-10">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {stat.label}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">
                  {stat.value}
                </span>
                <span className={cn("text-[10px] font-bold", stat.color)}>
                  {stat.change}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart & Recent Bookings Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Mock Chart */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-white">
                Performance Overview
              </h3>
              <p className="text-xs text-slate-500">
                Monthly traffic and engagement for your nests
              </p>
            </div>
            <select className="bg-white/5 border border-white/10 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>

          <div className="h-64 w-full flex items-end justify-between px-2 pt-10">
            {[40, 65, 45, 90, 70, 85].map((height, i) => (
              <div
                key={i}
                className="w-16 flex flex-col items-center gap-4 group"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                  className="w-full bg-linear-to-t from-indigo-600/20 to-indigo-500 rounded-xl relative"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {height * 10}
                  </div>
                </motion.div>
                <span className="text-[10px] font-bold text-slate-600">
                  Month {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Visits */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Recent Visits</h3>
            <button className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest hover:text-indigo-400 transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentBookings.map((booking, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all group"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {booking.student}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {booking.house}
                    </span>
                  </div>
                  <StatusBadge status={booking.status} />
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="h-3 w-3" />
                  <span className="text-[10px] font-bold uppercase tracking-tight">
                    {booking.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Confirmed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tighter border",
        colors[status as keyof typeof colors],
      )}
    >
      {status}
    </span>
  );
}
