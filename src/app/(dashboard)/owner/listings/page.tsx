"use client";

import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  MapPin,
  Zap,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";

const myHouses = [
  {
    id: 1,
    title: "Modern Studio - INSAT",
    price: "450 DT",
    location: "Centre Urbain Nord",
    type: "Studio",
    status: "Published",
    views: 1240,
    bookings: 8,
    imageColor: "bg-blue-600",
  },
  {
    id: 2,
    title: "Shared Apartment - Ariana",
    price: "350 DT",
    location: "Ariana Ville",
    type: "Room",
    status: "Published",
    views: 890,
    bookings: 4,
    imageColor: "bg-emerald-600",
  },
  {
    id: 3,
    title: "Luxury Loft - Marsa",
    price: "850 DT",
    location: "La Marsa",
    type: "Loft",
    status: "Draft",
    views: 0,
    bookings: 0,
    imageColor: "bg-indigo-600",
  },
];

export default function MyListings() {
  return (
    <div className="space-y-8">
      {/* Header Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            My Listings
          </h1>
          <p className="text-slate-500 text-sm">
            Manage and monitor your properties across Tunisia
          </p>
        </div>
        <Link href="/owner/listings/new">
          <Button className="h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 px-6 transition-all group">
            <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform" />
            Add New Property
          </Button>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white/5 border border-white/10 p-4 rounded-3xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search listings..."
            className="pl-10 bg-white/5 border-white/5 text-white placeholder:text-slate-600 focus-visible:ring-indigo-500/50 rounded-xl"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-white/5 border-white/5 text-white hover:bg-white/10 rounded-xl px-4"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <select className="bg-white/5 border border-white/5 text-sm font-bold text-slate-400 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 gap-4">
        {myHouses.map((house, i) => (
          <motion.div
            key={house.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col lg:flex-row items-center gap-6 group hover:bg-white/[0.07] transition-all"
          >
            {/* Thumbnail Mock */}
            <div
              className={cn(
                "h-32 w-full lg:w-48 rounded-2xl shrink-0 relative overflow-hidden",
                house.imageColor,
              )}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-2 left-2">
                <span className="px-2 py-0.5 rounded-lg bg-black/50 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest">
                  {house.type}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col gap-1 min-w-0 w-full">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-white truncate group-hover:text-indigo-400 transition-colors">
                  {house.title}
                </h3>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border",
                    house.status === "Published"
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-slate-500/10 text-slate-500 border-slate-500/20",
                  )}
                >
                  {house.status}
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="text-[10px] font-bold uppercase tracking-tight">
                    {house.location}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3 text-amber-500" />
                  <span className="text-[10px] font-bold text-white">
                    {house.price}/month
                  </span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-6 mt-4">
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                    Total Views
                  </span>
                  <span className="text-sm font-black text-white">
                    {house.views}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                    Bookings
                  </span>
                  <span className="text-sm font-black text-white">
                    {house.bookings}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex lg:flex-col gap-2 w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-white/5 pt-4 lg:pt-0 lg:pl-6">
              <Button
                variant="ghost"
                className="flex-1 lg:flex-none h-10 w-full lg:w-10 p-0 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="flex-1 lg:flex-none h-10 w-full lg:w-10 p-0 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="flex-1 lg:flex-none h-10 w-full lg:w-10 p-0 text-slate-500 hover:text-red-500 hover:bg-red-500/5 rounded-xl"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
