"use client";

import { motion } from "framer-motion";
import {
  User as UserIcon,
  Bell,
  Shield,
  CreditCard,
  LogOut,
  Camera,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { signOut } from "@/app/(auth)/actions";
import type { User } from "@/db/schema";

const sections = [
  { id: "profile", label: "Profile", icon: UserIcon },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "subscription", label: "Student Plan", icon: CreditCard },
];

export function StudentSettingsForm({ user }: { user: User }) {
  const [activeSection, setActiveSection] = useState("profile");

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "ST";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
      {/* Navigation Sidebar */}
      <div className="flex lg:flex-col gap-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all shrink-0",
              activeSection === section.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "text-slate-500 hover:text-white hover:bg-white/5",
            )}
          >
            <section.icon className="h-4 w-4" />
            {section.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="lg:col-span-3 space-y-8">
        {activeSection === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <div className="h-24 w-24 rounded-3xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-black text-2xl border border-blue-500/20">
                  {initials}
                </div>
                <button className="absolute -bottom-2 -right-2 h-9 w-9 bg-blue-600 border-4 border-slate-950 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-white">{user.name}</h3>
                <p className="text-sm text-slate-500 mb-2">
                  Student · Verified
                </p>
                <div className="flex gap-2 justify-center sm:justify-start">
                  <span className="px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase border border-blue-500/20 flex items-center gap-1">
                    <GraduationCap className="h-2.5 w-2.5" />
                    Verified Student
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <Input
                  defaultValue={user.name}
                  className="h-11 bg-white/5 border-white/5 text-white rounded-xl focus:ring-blue-500/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <Input
                  defaultValue={user.email}
                  disabled
                  className="h-11 bg-white/5 border-white/5 text-slate-400 rounded-xl focus:ring-blue-500/50 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button className="h-11 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all">
                Save Changes
              </Button>
            </div>
          </motion.div>
        )}

        {/* Placeholder for other sections */}
        {activeSection !== "profile" && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-20 text-center">
            <p className="text-slate-500">
              Section {activeSection} is coming soon.
            </p>
          </div>
        )}

        <div className="pt-4">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest ml-1"
          >
            <LogOut className="h-4 w-4" />
            Sign Out from all devices
          </button>
        </div>
      </div>
    </div>
  );
}
