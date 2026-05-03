import {
  Heart,
  Map as MapIcon,
  Search,
  Settings,
  Home,
  Star,
  MapPin,
} from "lucide-react";

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

const HOUSES = [
  {
    id: 1,
    title: "Modern Studio near ENIT",
    price: "450",
    location: "Belvédère, Tunis",
    rating: 4.8,
    type: "Studio",
    imageColor: "bg-blue-500/20",
  },
  {
    id: 2,
    title: "Shared Apartment - Manar 2",
    price: "350",
    location: "El Manar, Tunis",
    rating: 4.5,
    type: "Shared",
    imageColor: "bg-purple-500/20",
  },
  {
    id: 3,
    title: "Luxury Room - Marsa",
    price: "700",
    location: "La Marsa, Tunis",
    rating: 4.9,
    type: "Private Room",
    imageColor: "bg-emerald-500/20",
  },
];

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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

      <SidebarContent className="bg-transparent custom-scrollbar">
        {/* Search & Filters */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel className="text-slate-500 font-bold uppercase tracking-widest text-[9px] mb-2 px-2">
            Search & Filters
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-3 px-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <SidebarInput
                placeholder="Search district..."
                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500/50 rounded-xl"
              />
            </div>

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
                className="group flex flex-col gap-2 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-blue-500/10"
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
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/5 font-medium">
                      {house.type}
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
