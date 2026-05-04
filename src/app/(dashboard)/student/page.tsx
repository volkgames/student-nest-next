"use client";

import { motion } from "framer-motion";
import { 
  Heart, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Zap, 
  Star,
  Search,
  ArrowRight,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mySavedHouses = [
  { id: 1, title: "Modern Studio - INSAT", price: "450 DT", location: "Ariana", rating: 4.8, distance: "0.8km", imageColor: "bg-blue-600" },
  { id: 2, title: "Shared Apt - ESPRIT", price: "350 DT", location: "Ghazela", rating: 4.5, distance: "1.2km", imageColor: "bg-emerald-600" },
];

const myRequests = [
  { id: 1, house: "Modern Studio - INSAT", owner: "Ahmed Aloui", date: "May 5, 2026", time: "2:30 PM", status: "Approved" },
  { id: 2, house: "Shared Apt - Ariana", owner: "Sami Ben Ali", date: "May 7, 2026", time: "10:00 AM", status: "Pending" },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-10 pb-20">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">My Student Nest</h1>
          <p className="text-slate-500 text-sm">Manage your housing search and visit requests</p>
        </div>
        <Link href="/">
          <Button className="h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 px-6 transition-all group">
            <Search className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform" />
            Explore More Houses
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: My Requests */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Visit Requests
            </h2>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Tracking</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {myRequests.map((request, i) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.07] transition-all group"
              >
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                      <Clock className="h-7 w-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-500 transition-colors">{request.house}</h3>
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <span className="font-medium">Hosted by {request.owner}</span>
                        <span className="h-1 w-1 bg-slate-700 rounded-full" />
                        <span className="font-bold text-blue-500/70">{request.date} @ {request.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={request.status} />
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State Mock */}
          {myRequests.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-center bg-white/5 border border-dashed border-white/10 rounded-3xl">
              <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-slate-600" />
              </div>
              <p className="text-white font-bold">No visit requests yet</p>
              <p className="text-slate-500 text-xs mt-1">Start exploring the map to find your next home!</p>
            </div>
          )}
        </div>

        {/* Right: Saved Nests Summary */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Saved Nests
            </h2>
            <Link href="/explore" className="text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:underline">View All</Link>
          </div>

          <div className="space-y-4">
            {mySavedHouses.map((house, i) => (
              <motion.div
                key={house.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-4 hover:bg-white/[0.07] transition-all group relative overflow-hidden"
              >
                <div className="flex gap-4 items-center">
                  <div className={cn("h-16 w-16 rounded-2xl shrink-0 flex items-center justify-center", house.imageColor)}>
                    <Zap className="h-6 w-6 text-white/30" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{house.title}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase mt-1">
                      <MapPin className="h-3 w-3" />
                      {house.location}
                      <span className="h-1 w-1 bg-slate-700 rounded-full" />
                      <Star className="h-3 w-3 text-amber-500 fill-current" />
                      {house.rating}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-700 group-hover:text-blue-500 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Tip */}
          <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10 space-y-3">
              <CheckCircle2 className="h-8 w-8 text-white/50" />
              <h4 className="text-sm font-bold leading-tight">Verified Listings Only</h4>
              <p className="text-[10px] opacity-70 leading-relaxed font-medium">
                Every property on Student Nest is manually verified by our team to ensure your safety and comfort.
              </p>
            </div>
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
    <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border", colors[status as keyof typeof colors])}>
      {status}
    </span>
  );
}
