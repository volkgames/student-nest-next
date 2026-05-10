import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(home)/components/app-sidebar";
import MainMap from "./components/main-map";
import { MapProvider } from "@/context/map-context";
import { PropertyDetails } from "./components/property-details";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <MapProvider>
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarInset className="relative flex flex-1 flex-col overflow-hidden">
          <header className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
            <div className="pointer-events-auto">
              <SidebarTrigger className="h-10 w-10 bg-slate-950/80 backdrop-blur-md border border-white/10 text-white shadow-2xl hover:bg-slate-900 transition-all rounded-xl" />
            </div>
            {!user ? (
              <div className="pointer-events-auto flex items-center gap-3">
                <Link
                  href="/login"
                  className="h-10 px-5 flex items-center justify-center bg-slate-950/80 backdrop-blur-md border border-white/10 text-white text-xs font-bold shadow-2xl hover:bg-slate-900 transition-all rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="h-10 px-5 flex items-center justify-center bg-blue-600 border border-blue-500/50 text-white text-xs font-bold shadow-2xl hover:bg-blue-500 transition-all rounded-xl shadow-blue-500/20"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="pointer-events-auto flex items-center gap-3">
                <Link
                  href={user.role === "owner" ? "/owner" : "/student"}
                  className="h-10 px-5 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-bold shadow-2xl hover:bg-white/20 transition-all rounded-xl"
                >
                  Dashboard
                </Link>
              </div>
            )}
          </header>
          <MainMap />
        </SidebarInset>
        <PropertyDetails />
      </SidebarProvider>
    </MapProvider>
  );
}
