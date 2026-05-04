"use client";

import {
  Heart,
  Map as MapIcon,
  Settings,
  Home,
  LucideIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { useMapInteraction } from "@/context/map-context";
import { SearchSection } from "./sidebar/search-section";
import { FilterControls } from "./sidebar/filter-controls";
import { HouseCard } from "./sidebar/house-card";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    filters,
    setFilters,
    filteredHouses,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    savedHouseIds,
  } = useMapInteraction();

  const { setOpen } = useSidebar();

  const displayedHouses =
    activeTab === "explorer"
      ? filteredHouses
      : filteredHouses.filter((h) => savedHouseIds.includes(h.id));

  const navItems: { title: string; icon: LucideIcon; id: string }[] = [
    {
      title: "Map Explorer",
      icon: MapIcon,
      id: "explorer",
    },
    {
      title: "Saved Items",
      icon: Heart,
      id: "saved",
    },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-white/5 bg-slate-950/80 backdrop-blur-2xl"
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

      <SidebarContent className="bg-transparent overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col">
        {/* Search & Filters */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel className="text-slate-500 font-bold uppercase tracking-widest text-[9px] mb-2 px-2 flex justify-between items-center w-full">
            Search & Filters
            {(filters.priceRange !== "any" ||
              filters.roomType !== "any" ||
              searchQuery) && (
              <button
                onClick={() => {
                  setFilters({ priceRange: "any", roomType: "any" });
                  setSearchQuery("");
                }}
                className="text-blue-500 hover:text-blue-400 transition-colors lowercase font-medium"
              >
                reset
              </button>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-3 px-2 relative">
            <SearchSection />
            <FilterControls />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-white/5 mx-4 my-2" />

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-500 font-bold uppercase tracking-widest text-[9px] px-4">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeTab === item.id}
                    onClick={() => {
                      setActiveTab(item.id as "explorer" | "saved");
                      setOpen(true);
                    }}
                    tooltip={item.title}
                    className="mx-2 group-data-[collapsible=icon]:mx-0 w-[calc(100%-1rem)] transition-all duration-300 hover:bg-white/5 data-[active=true]:bg-blue-600 data-[active=true]:text-white rounded-xl"
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className="font-semibold">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-white/5 mx-4 my-2" />

        {/* Nearby Houses */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel className="text-slate-500 font-bold uppercase tracking-widest text-[9px] px-4 flex justify-between items-center w-full">
            {activeTab === "explorer" ? "Nearby Listings" : "Saved Nests"}
            {activeTab === "explorer" && (
              <span className="text-blue-500 text-[10px] normal-case font-medium hover:underline cursor-pointer">
                View all
              </span>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2 py-2 flex flex-col gap-3">
            {displayedHouses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                  {activeTab === "explorer" ? (
                    <Home className="h-8 w-8 text-slate-500" />
                  ) : (
                    <Heart className="h-8 w-8 text-slate-500" />
                  )}
                </div>
                <p className="text-sm font-bold text-white">
                  {activeTab === "explorer"
                    ? "No results found"
                    : "No saved nests"}
                </p>
                <p className="text-[10px] text-slate-500 mt-1 max-w-[150px] mx-auto">
                  {activeTab === "explorer"
                    ? "Try adjusting your filters to find more properties"
                    : "Heart a property to keep it here for later"}
                </p>
              </div>
            ) : (
              displayedHouses.map((house) => (
                <HouseCard key={house.id} house={house} />
              ))
            )}
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
