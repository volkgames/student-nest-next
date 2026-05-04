"use client";

import { motion } from "framer-motion";
import { 
  Heart, 
  MapPin, 
  Star, 
  Zap, 
  ExternalLink,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const savedHouses = [
  { 
    id: 1, 
    title: "Modern Studio - INSAT", 
    price: "450 DT", 
    location: "Ariana", 
    rating: 4.8, 
    distance: "0.8km", 
    imageColor: "bg-blue-600",
    tags: ["Walkable", "Safe"]
  },
  { 
    id: 2, 
    title: "Shared Apt - ESPRIT", 
    price: "350 DT", 
    location: "Ghazela", 
    rating: 4.5, 
    distance: "1.2km", 
    imageColor: "bg-emerald-600",
    tags: ["High WiFi", "Balcony"]
  },
  { 
    id: 3, 
    title: "Luxury Loft - Marsa", 
    price: "850 DT", 
    location: "La Marsa", 
    rating: 4.9, 
    distance: "4.5km", 
    imageColor: "bg-indigo-600",
    tags: ["Premium"]
  },
];

export default function SavedNestsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight text-shadow-sm">Saved Nests</h1>
          <p className="text-slate-500 text-sm">Your favorite properties across Tunisia</p>
        </div>
        <Link href="/">
          <Button variant="outline" className="h-11 border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl px-6 transition-all font-bold">
            <Search className="mr-2 h-4 w-4" />
            Find More
          </Button>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedHouses.map((house, i) => (
          <motion.div
            key={house.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:bg-white/[0.07] transition-all relative"
          >
            {/* Image Placeholder */}
            <div className={cn("h-48 w-full relative", house.imageColor)}>
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 right-4">
                <Button size="icon" className="h-9 w-9 rounded-full bg-red-500/20 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                  <Heart className="h-4 w-4 fill-current" />
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                {house.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-lg bg-black/40 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-lg font-bold text-white truncate group-hover:text-blue-500 transition-colors">
                  {house.title}
                </h3>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="text-[10px] font-black">{house.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="text-[10px] font-bold uppercase tracking-tight">{house.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3 text-blue-500" />
                  <span className="text-[10px] font-bold text-white">{house.distance} to campus</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest leading-none">Price</span>
                  <span className="text-lg font-black text-white">{house.price}<span className="text-xs text-slate-500 font-medium">/mo</span></span>
                </div>
                <Link href="/">
                  <Button className="h-10 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 px-4 transition-all">
                    View on Map
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Card */}
      <div className="bg-linear-to-br from-blue-600/20 to-transparent border border-blue-500/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
          <Heart className="h-6 w-6" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white">Compare your favorites</h4>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">You have {savedHouses.length} nests saved. We recommend visiting at least 2 before making a decision.</p>
        </div>
      </div>
    </div>
  );
}
