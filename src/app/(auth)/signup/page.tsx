"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Building2, 
  ArrowRight, 
  Mail, 
  Lock, 
  User,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Role = "student" | "owner" | null;

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Title Section */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-white tracking-tight">
          {step === 1 ? "Choose your role" : "Create your account"}
        </h1>
        <p className="text-slate-400 text-sm">
          {step === 1 
            ? "Tell us how you'll be using Student Nest" 
            : `Joining as a ${role === 'student' ? 'Student' : 'Property Owner'}`}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 gap-4"
          >
            {/* Student Role */}
            <button
              onClick={() => {
                setRole("student");
                setStep(2);
              }}
              className={cn(
                "group relative p-6 bg-white/5 border border-white/10 rounded-3xl text-left transition-all hover:bg-white/10 hover:border-blue-500/50",
                role === "student" && "border-blue-500 bg-blue-500/5"
              )}
            >
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">I&apos;m a Student</h3>
                  <p className="text-sm text-slate-500">I want to find and book my perfect nest.</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-slate-600 group-hover:text-blue-500 transition-colors" />
              </div>
            </button>

            {/* Owner Role */}
            <button
              onClick={() => {
                setRole("owner");
                setStep(2);
              }}
              className={cn(
                "group relative p-6 bg-white/5 border border-white/10 rounded-3xl text-left transition-all hover:bg-white/10 hover:border-indigo-500/50",
                role === "owner" && "border-indigo-500 bg-indigo-500/5"
              )}
            >
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Building2 className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">I&apos;m an Owner</h3>
                  <p className="text-sm text-slate-500">I want to list and manage my properties.</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-slate-600 group-hover:text-indigo-500 transition-colors" />
              </div>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
              <button 
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3 w-3" />
                Change Role
              </button>

              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                    <Input
                      placeholder="John Doe"
                      className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500/50 rounded-xl transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500/50 rounded-xl transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Create Password
                  </label>
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

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "w-full h-12 font-bold rounded-xl shadow-lg transition-all group/btn",
                      role === "student" ? "bg-blue-600 hover:bg-blue-500 shadow-blue-600/20" : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20"
                    )}
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Create Account
                        <CheckCircle2 className="ml-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-500 font-bold hover:text-blue-400 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
