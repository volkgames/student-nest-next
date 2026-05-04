"use client";

import { motion } from "framer-motion";
import { 
  User, 
  Bell, 
  Shield, 
  Smartphone,
  CreditCard, 
  LogOut,
  Camera,
  ChevronRight,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "subscription", label: "Student Plan", icon: CreditCard },
];

export default function StudentSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Settings</h1>
        <p className="text-slate-500 text-sm">Manage your student profile and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Navigation Sidebar */}
        <div className="flex lg:flex-col gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all shrink-0",
                section.id === "profile" 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                  : "text-slate-500 hover:text-white hover:bg-white/5"
              )}
            >
              <section.icon className="h-4 w-4" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <div className="h-24 w-24 rounded-3xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-black text-2xl border border-blue-500/20">
                  SB
                </div>
                <button className="absolute -bottom-2 -right-2 h-9 w-9 bg-blue-600 border-4 border-slate-950 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-white">Sami Ben Ali</h3>
                <p className="text-sm text-slate-500 mb-2">Student at INSAT · Tunis</p>
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
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <Input defaultValue="Sami Ben Ali" className="h-11 bg-white/5 border-white/5 text-white rounded-xl focus:ring-blue-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Student Email</label>
                <Input defaultValue="sami.ba@insat.u-carthage.tn" className="h-11 bg-white/5 border-white/5 text-white rounded-xl focus:ring-blue-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">University</label>
                <Input defaultValue="INSAT" className="h-11 bg-white/5 border-white/5 text-white rounded-xl focus:ring-blue-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Major</label>
                <Input defaultValue="Software Engineering" className="h-11 bg-white/5 border-white/5 text-white rounded-xl focus:ring-blue-500/50" />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button className="h-11 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all">
                Save Changes
              </Button>
            </div>
          </motion.div>

          {/* Security & Preferences */}
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden divide-y divide-white/5">
            <div className="p-6 flex items-center justify-between hover:bg-white/2 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Mobile Notifications</h4>
                  <p className="text-xs text-slate-500">Get instant alerts for approved visits</p>
                </div>
              </div>
              <div className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase border border-emerald-500/20">On</div>
            </div>

            <div className="p-6 flex items-center justify-between hover:bg-white/2 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-500/10 text-slate-400 flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Privacy Mode</h4>
                  <p className="text-xs text-slate-500">Hide your university from non-verified owners</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-700 group-hover:text-white transition-colors" />
            </div>
          </div>

          <div className="pt-4">
            <button className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest ml-1">
              <LogOut className="h-4 w-4" />
              Sign Out from all devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
