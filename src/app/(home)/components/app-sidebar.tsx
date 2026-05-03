"use client";

import {
  Heart,
  Map as MapIcon,
  Search,
  Settings,
  Home,
  Star,
  MapPin,
  GraduationCap,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { HOUSES, useMapInteraction } from "@/context/map-context";

const data = {
  navMain: [
    {
      title: "Navigation",
      items: [
        {
          title: "Map Explorer",
          url: "#",
          icon: MapIcon,
          isActive: true,
        },
        {
          title: "Saved Items",
          url: "#",
          icon: Heart,
        },
      ],
    },
  ],
};

interface SearchSuggestion {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: string;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    hoveredHouseId,
    setHoveredHouseId,
    selectedHouseId,
    setSelectedHouseId,
    setSearchResult,
  } = useMapInteraction();

  const [searchQuery, setSearchQuery] = useState("");
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
    <Sidebar
      collapsible="icon"
      className="border-r border-white/5 bg-slate-950/80 backdrop-blur-2xl overflow-visible"
      {...props}
    >
      <SidebarHeader className="h-16 flex items-center justify-center border-b border-white/5">
        <div className="flex items-center gap-3 px-4 group-data-[collapsible=icon]:px-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
            <Home className="h-5 w-5" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-lg font-bold tracking-tight text-white leading-none">
              Student<span className="text-blue-500 font-black">Nest</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">
              Tunisia Campus
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-transparent custom-scrollbar overflow-visible">
        {/* Search & Filters */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden overflow-visible">
          <SidebarGroupLabel className="text-slate-500 font-bold uppercase tracking-widest text-[9px] mb-2 px-2">
            Search & Filters
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-3 px-2 relative overflow-visible">
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
              <div className="absolute top-11 left-2 right-2 z-[100] bg-slate-900/98 border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-3xl max-h-[400px] overflow-y-auto custom-scrollbar border-t-blue-500/50">
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
                            : "bg-slate-800 text-slate-400",
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

            <div className="grid grid-cols-2 gap-2">
              <Select defaultValue="any">
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

              <Select defaultValue="any">
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
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-white/5 mx-4 my-2" />

        {/* Navigation */}
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-slate-500 font-bold uppercase tracking-widest text-[9px] px-4">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive}
                      tooltip={item.title}
                      className="mx-2 group-data-[collapsible=icon]:mx-0 w-[calc(100%-1rem)] transition-all duration-300 hover:bg-white/5 data-[active=true]:bg-blue-600 data-[active=true]:text-white rounded-xl"
                    >
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span className="font-semibold">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarSeparator className="bg-white/5 mx-4 my-2" />

        {/* Nearby Houses */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel className="text-slate-500 font-bold uppercase tracking-widest text-[9px] px-4 flex justify-between items-center w-full">
            Nearby Listings
            <span className="text-blue-500 text-[10px] normal-case font-medium hover:underline cursor-pointer">
              View all
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2 py-2 flex flex-col gap-3">
            {HOUSES.map((house) => (
              <div
                key={house.id}
                onMouseEnter={() => setHoveredHouseId(house.id)}
                onMouseLeave={() => setHoveredHouseId(null)}
                onClick={() => setSelectedHouseId(house.id)}
                className={cn(
                  "group flex flex-col gap-2 p-3 rounded-2xl bg-white/5 border transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/10",
                  hoveredHouseId === house.id
                    ? "border-blue-500/50 bg-white/10 scale-[1.02]"
                    : "border-white/5 hover:border-blue-500/50 hover:bg-white/10",
                  selectedHouseId === house.id &&
                    "ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950",
                )}
              >
                <div
                  className={`h-24 w-full rounded-xl ${house.imageColor} flex items-center justify-center transition-transform group-hover:scale-[1.02]`}
                >
                  <Home className="h-8 w-8 text-white/20" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-white line-clamp-1">
                      {house.title}
                    </h4>
                    <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.5 rounded-md">
                      <Star className="h-2.5 w-2.5 fill-current" />
                      {house.rating}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin className="h-3 w-3" />
                    {house.location}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-black text-blue-400">
                        {house.price}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium italic">
                        TND/mo
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-blue-400 border border-blue-500/20 font-bold uppercase tracking-tighter">
                      {house.roomType}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/5 p-4 bg-transparent">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Settings"
              className="hover:bg-white/5 text-slate-400 rounded-xl"
            >
              <a href="#" className="flex items-center gap-3">
                <Settings className="h-5 w-5" />
                <span className="font-medium">Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
