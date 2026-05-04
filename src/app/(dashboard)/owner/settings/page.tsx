"use client";

import { motion } from "framer-motion";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  LogOut,
  Camera,
  ChevronRight,
  Globe,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Settings</h1>
        <p className="text-slate-500 text-sm">Manage your profile and account preferences</p>
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
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
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
                <div className="h-24 w-24 rounded-3xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-black text-2xl border border-indigo-500/20">
                  AA
                </div>
                <button className="absolute -bottom-2 -right-2 h-9 w-9 bg-indigo-600 border-4 border-slate-950 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-white">Ahmed Aloui</h3>
                <p className="text-sm text-slate-500 mb-2">Member since May 2024</p>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase border border-emerald-500/20">Verified</span>
                  <span className="px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-500 text-[9px] font-black uppercase border border-indigo-500/20">Pro Owner</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <Input defaultValue="Ahmed Aloui" className="h-11 bg-white/5 border-white/5 text-white rounded-xl focus:ring-indigo-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <Input defaultValue="ahmed.aloui@host.tn" className="h-11 bg-white/5 border-white/5 text-white rounded-xl focus:ring-indigo-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                <Input defaultValue="+216 22 456 789" className="h-11 bg-white/5 border-white/5 text-white rounded-xl focus:ring-indigo-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Location</label>
                <Input defaultValue="Ariana, Tunisia" className="h-11 bg-white/5 border-white/5 text-white rounded-xl focus:ring-indigo-500/50" />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button className="h-11 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all">
                Save Changes
              </Button>
            </div>
          </motion.div>

          {/* Preferences */}
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden divide-y divide-white/5">
            <div className="p-6 flex items-center justify-between hover:bg-white/2 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Language Preference</h4>
                  <p className="text-xs text-slate-500">Currently set to English (US)</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-700 group-hover:text-white transition-colors" />
            </div>

            <div className="p-6 flex items-center justify-between hover:bg-white/2 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Two-Factor Authentication</h4>
                  <p className="text-xs text-slate-500">Add an extra layer of security to your account</p>
                </div>
              </div>
              <div className="px-2 py-1 rounded-lg bg-red-500/10 text-red-500 text-[8px] font-black uppercase border border-red-500/20">Off</div>
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
