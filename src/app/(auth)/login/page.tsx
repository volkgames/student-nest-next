"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, StickyNote, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    // Add logic later
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <div className="space-y-8">
      {/* Title Section */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-white tracking-tight">
          Welcome back
        </h1>
        <p className="text-slate-400 text-sm">
          Enter your credentials to access your nest
        </p>
      </div>

      {/* Card */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
        {/* Decorative inner glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors" />

        <form onSubmit={onSubmit} className="space-y-5 relative z-10">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <Input
                type="email"
                placeholder="name@student.tn"
                className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500/50 rounded-xl transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[10px] font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-wider"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500/50 rounded-xl transition-all"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all group/btn"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
            <span className="bg-[#0f172a] px-4 text-slate-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-11 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl transition-all"
          >
            <Home className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button
            variant="outline"
            className="h-11 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl transition-all"
          >
            <StickyNote className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </div>

      <p className="text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-blue-500 font-bold hover:text-blue-400 transition-colors"
        >
          Create one for free
        </Link>
      </p>
    </div>
  );
}
