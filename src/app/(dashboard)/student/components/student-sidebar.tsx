"use client";

import {
  LayoutDashboard,
  Heart,
  CalendarCheck,
  MessageSquare,
  Settings,
  LogOut,
  Search,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/(auth)/actions";

const studentNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/student" },
  { label: "Explorer", icon: Search, href: "/" },
  { label: "Saved Nests", icon: Heart, href: "/student/saved" },
  { label: "My Visits", icon: CalendarCheck, href: "/student/bookings" },
  { label: "Messages", icon: MessageSquare, href: "/student/messages" },
  { label: "Settings", icon: Settings, href: "/student/settings" },
];

export function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/5 flex flex-col relative z-20 bg-slate-950/50 backdrop-blur-xl">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
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
        <button 
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
