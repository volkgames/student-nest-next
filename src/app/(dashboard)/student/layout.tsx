"use client";

import {
  Home,
  LayoutDashboard,
  Heart,
  CalendarCheck,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  Search,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const studentNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/student" },
  { label: "Explorer", icon: Search, href: "/" },
  { label: "Saved Nests", icon: Heart, href: "/student/saved" },
  { label: "My Visits", icon: CalendarCheck, href: "/student/bookings" },
  { label: "Messages", icon: MessageSquare, href: "/student/messages" },
  { label: "Settings", icon: Settings, href: "/student/settings" },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 flex text-white font-sans overflow-hidden">
      {/* Student Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col relative z-20 bg-slate-950/50 backdrop-blur-xl">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Home className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Student<span className="text-blue-500 font-black">Nest</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {studentNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5",
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    isActive
                      ? "text-white"
                      : "text-slate-500 group-hover:text-blue-400",
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <div className="px-4 py-3 bg-blue-600/10 rounded-2xl border border-blue-500/20 mb-4">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
              Student Status
            </p>
            <p className="text-xs font-bold text-white">Verified Account</p>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative h-screen">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 relative z-10 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-white">Student Dashboard</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              Find your next nest, Sami 🎓
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <Bell className="h-5 w-5 text-slate-400" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-950" />
            </button>
            <div className="flex items-center gap-3 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10">
              <div className="h-8 w-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                SB
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold">Sami Ben Ali</span>
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">
                  INSAT Student
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar relative z-0">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
