"use client";

import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col relative overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
      
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-20">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <Home className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white leading-none">
            Student<span className="text-blue-500 font-black">Nest</span>
          </span>
        </Link>
        
        <div className="text-sm text-slate-500 font-medium hidden sm:block">
          Trusted by <span className="text-blue-500">2,000+</span> students in Tunisia
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[480px]"
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-8 text-center">
        <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold">
          © 2026 Student Nest Tunisia · Premium Housing Network
        </p>
      </footer>
    </div>
  );
}
