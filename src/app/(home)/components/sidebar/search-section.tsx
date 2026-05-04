"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, MapPin, GraduationCap } from "lucide-react";
import { SidebarInput } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useMapInteraction } from "@/context/map-context";

interface SearchSuggestion {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: string;
}

export function SearchSection() {
  const { setSearchResult, searchQuery, setSearchQuery } = useMapInteraction();
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsSearching(true);
      try {
        const url = `/api/places?input=${encodeURIComponent(searchQuery)}`;
        const response = await fetch(url);
        const data = await response.json();
        setSuggestions(data.results || []);
      } catch (error) {
        console.error("OSM search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    if (suggestion.latitude && suggestion.longitude) {
      setSearchResult({
        longitude: suggestion.longitude,
        latitude: suggestion.latitude,
        name: suggestion.name,
      });
    }

    setSearchQuery("");
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col gap-3 px-2 relative overflow-visible">
      <div className="relative">
        {isSearching ? (
          <Loader2 className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-500 animate-spin" />
        ) : (
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
        )}
        <SidebarInput
          placeholder="Search district or university..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500/50 rounded-xl"
        />
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute top-11 left-2 right-2 z-100 bg-slate-900/98 border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-3xl max-h-[400px] overflow-y-auto custom-scrollbar border-t-blue-500/50">
          {suggestions.map((suggestion) => {
            const name = suggestion.name?.toLowerCase() || "";
            const address = suggestion.address?.toLowerCase() || "";
            const type = suggestion.type?.toLowerCase() || "";

            const isEducation =
              type.includes("university") ||
              type.includes("school") ||
              type.includes("college") ||
              type.includes("établissement") ||
              name.includes("university") ||
              name.includes("faculté") ||
              name.includes("école") ||
              name.includes("college") ||
              name.includes("insat") ||
              name.includes("esprit") ||
              name.includes("iset") ||
              name.includes("ihec") ||
              name.includes("isg") ||
              name.includes("ensi") ||
              name.includes("enit") ||
              name.includes("sup'com") ||
              name.includes("ipt") ||
              address.includes("université");

            return (
              <button
                key={suggestion.id}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 text-left transition-colors border-b border-white/5 last:border-0"
              >
                <div
                  className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                    isEducation
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-slate-800 text-slate-400"
                  )}
                >
                  {isEducation ? (
                    <GraduationCap className="h-4 w-4" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold text-white truncate">
                    {suggestion.name}
                  </span>
                  <span className="text-[10px] text-slate-500 truncate">
                    {suggestion.address}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
