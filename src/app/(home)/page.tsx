import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(home)/components/app-sidebar";
import MainMap from "./components/main-map";
import { MapProvider } from "@/context/map-context";

export default function Home() {
  return (
    <MapProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="relative">
          <header className="absolute top-4 left-4 z-20">
            <SidebarTrigger className="h-10 w-10 bg-slate-950/80 backdrop-blur-md border border-white/10 text-white shadow-2xl hover:bg-slate-900 transition-all rounded-xl" />
          </header>
          <MainMap />
        </SidebarInset>
      </SidebarProvider>
    </MapProvider>
  );
}
