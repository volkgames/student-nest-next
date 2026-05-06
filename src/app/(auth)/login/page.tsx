"use client";

import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, StickyNote, Home } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAction } from "next-safe-action/hooks";
import { loginAction } from "../actions";
import { loginSchema } from "../schema";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { execute, result, isPending } = useAction(loginAction);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    execute(values);
  }

  const isLoading = isPending;
  const serverError = result.data?.error;

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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 relative z-10">
            {serverError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-medium text-center">
                {serverError}
              </div>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                      <Input
                        {...field}
                        type="email"
                        placeholder="name@student.tn"
                        className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500/50 rounded-xl transition-all"
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="ml-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <FormLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Password
                    </FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-[10px] font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-wider"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-blue-500/50 rounded-xl transition-all"
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="ml-1" />
                </FormItem>
              )}
            />

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
        </Form>

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
