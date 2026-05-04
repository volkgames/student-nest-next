"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMapInteraction } from "@/context/map-context";

export function FilterControls() {
  const { filters, setFilters } = useMapInteraction();

  return (
    <div className="grid grid-cols-2 gap-2">
      <Select
        value={filters.priceRange}
        onValueChange={(value: string) =>
          setFilters({
            ...filters,
            priceRange: value as typeof filters.priceRange,
          })
        }
      >
        <SelectTrigger className="bg-white/5 border-white/10 text-white text-xs h-9 rounded-xl focus:ring-blue-500/50">
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-white/10 text-white">
          <SelectItem value="any">Any Price</SelectItem>
          <SelectItem value="low">Under 400</SelectItem>
          <SelectItem value="mid">400 - 600</SelectItem>
          <SelectItem value="high">600+</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.roomType}
        onValueChange={(value: string) =>
          setFilters({
            ...filters,
            roomType: value as typeof filters.roomType,
          })
        }
      >
        <SelectTrigger className="bg-white/5 border-white/10 text-white text-xs h-9 rounded-xl focus:ring-blue-500/50">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-white/10 text-white">
          <SelectItem value="any">Any Type</SelectItem>
          <SelectItem value="studio">Studio</SelectItem>
          <SelectItem value="shared">Shared</SelectItem>
          <SelectItem value="private">Private</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
