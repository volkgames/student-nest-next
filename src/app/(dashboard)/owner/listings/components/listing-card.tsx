"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Zap, MapPin, Edit, ExternalLink, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { deletePropertyAction } from "../actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ListingCardProps {
  house: Property;
  index: number;
}

export function ListingCard({ house, index }: ListingCardProps) {

  const { execute: deleteProperty, isPending: isDeleting } = useAction(
    deletePropertyAction,
    {
      onSuccess: ({ data }) => {
        if (data?.success) {
          toast.success("Property deleted successfully");
        } else if (data?.error) {
          toast.error(data.error);
        }
      },
    },
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col lg:flex-row items-center gap-6 group hover:bg-white/[0.07] transition-all"
    >
      {/* Thumbnail */}
      <div
        className={cn(
          "h-32 w-full lg:w-48 rounded-2xl shrink-0 relative overflow-hidden flex items-center justify-center",
          house.imageColor?.startsWith("bg-") ? house.imageColor : "",
        )}
        style={{
          backgroundColor: house.imageColor?.startsWith("bg-")
            ? undefined
            : house.imageColor || undefined,
        }}
      >
        {house.images?.[0] ? (
          <Image
            src={house.images[0]}
            alt={house.title ?? ""}
            fill
            className="absolute inset-0 w-full h-full object-cover"
            sizes="(max-width: 1024px) 100vw, 192px"
          />
        ) : (
          <Zap className="h-8 w-8 text-white/20" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-2">
          <span className="px-2 py-0.5 rounded-lg bg-black/50 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest">
            {house.roomType}
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
              house.status === "published"
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
              {house.pricePerMonth}/month
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
          asChild
          className="flex-1 lg:flex-none h-10 w-full lg:w-10 p-0 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl"
        >
          <Link href={`/owner/listings/${house.id}`}>
            <Edit className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          onClick={() => window.open(`/?id=${house.id}`, "_blank")}
          className="flex-1 lg:flex-none h-10 w-full lg:w-10 p-0 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              disabled={isDeleting}
              className="flex-1 lg:flex-none h-10 w-full lg:w-10 p-0 text-slate-500 hover:text-red-500 hover:bg-red-500/5 rounded-xl"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-slate-900 border-white/10 rounded-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Delete Property?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400">
                Are you sure you want to delete &quot;{house.title}&quot;? This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteProperty({ id: house.id })}
                className="bg-red-600 hover:bg-red-500 text-white rounded-xl"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.div>
  );
}
