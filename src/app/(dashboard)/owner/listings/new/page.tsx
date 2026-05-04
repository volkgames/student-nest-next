"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  MapPin,
  Wifi,
  Tv,
  Wind,
  Waves,
  ShieldCheck,
  Camera,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// const steps = [
//   { id: 1, title: "Basic Info", icon: Building2 },
//   { id: 2, title: "Location", icon: MapPin },
//   { id: 3, title: "Amenities", icon: Wifi },
//   { id: 4, title: "Photos", icon: Camera },
// ];

export default function NewPropertyPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-20">
      {/* Header & Progress */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Add New Property
            </h1>
            <p className="text-slate-500 text-sm">
              Fill in the details to list your house on Student Nest
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-indigo-500">{step}</span>
            <span className="text-slate-600 font-bold">/4</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${(step / 4) * 100}%` }}
            className="h-full bg-linear-to-r from-indigo-600 to-purple-600 shadow-[0_0_15px_rgba(79,70,229,0.5)]"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && <StepBasics />}
          {step === 2 && <StepLocation />}
          {step === 3 && <StepAmenities />}
          {step === 4 && <StepPhotos />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="pt-10 flex justify-between items-center border-t border-white/5">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={step === 1}
          className="h-12 px-6 text-slate-500 hover:text-white rounded-xl font-bold uppercase tracking-widest text-[10px]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {step < 4 ? (
          <Button
            onClick={nextStep}
            className="h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all"
          >
            Next Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={() => setIsLoading(true)}
            disabled={isLoading}
            className="h-12 px-10 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all"
          >
            {isLoading ? "Publishing..." : "Publish Listing"}
            <CheckCircle2 className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

function StepBasics() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Property Title
          </label>
          <Input
            placeholder="e.g. Modern Studio near INSAT"
            className="h-12 bg-white/5 border-white/5 text-white rounded-xl focus:ring-indigo-500/50"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              Property Type
            </label>
            <select className="w-full h-12 bg-white/5 border border-white/5 text-sm font-bold text-white rounded-xl px-4 focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <option>Studio</option>
              <option>Shared Apartment</option>
              <option>Single Room</option>
              <option>Whole House</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
              Price per Month (DT)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-4 h-4 w-4 text-slate-500" />
              <Input
                type="number"
                placeholder="450"
                className="pl-11 h-12 bg-white/5 border-white/5 text-white rounded-xl focus:ring-indigo-500/50"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Description
          </label>
          <textarea
            placeholder="Describe your property, rules, and surroundings..."
            className="w-full min-h-[150px] bg-white/5 border border-white/5 text-sm text-white rounded-2xl p-4 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>
    </div>
  );
}

function StepLocation() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Full Address
          </label>
          <Input
            placeholder="e.g. 123 Rue de l'Independance, Ariana"
            className="h-12 bg-white/5 border-white/5 text-white rounded-xl focus:ring-indigo-500/50"
          />
        </div>

        {/* Mock Map Picker */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
            Pin on Map
          </label>
          <div className="h-64 bg-slate-900 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/9.5,36.8,12/600x300?access_token=mock')] bg-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-500" />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-lg animate-bounce">
                <MapPin className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">
                Click to set location
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-600 uppercase">
              Latitude
            </span>
            <Input
              disabled
              placeholder="36.8456"
              className="h-10 bg-white/5 border-transparent text-slate-500 text-xs rounded-lg cursor-not-allowed"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-slate-600 uppercase">
              Longitude
            </span>
            <Input
              disabled
              placeholder="10.1982"
              className="h-10 bg-white/5 border-transparent text-slate-500 text-xs rounded-lg cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const amenitiesList = [
  { label: "High-speed WiFi", icon: Wifi },
  { label: "Air Conditioning", icon: Wind },
  { label: "Smart TV", icon: Tv },
  { label: "Private Bathroom", icon: Waves },
  { label: "Security System", icon: ShieldCheck },
  { label: "Washing Machine", icon: Building2 },
];

function StepAmenities() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {amenitiesList.map((item) => (
          <button
            key={item.label}
            onClick={() => toggle(item.label)}
            className={cn(
              "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group",
              selected.includes(item.label)
                ? "bg-indigo-600/10 border-indigo-500/50 text-white"
                : "bg-white/5 border-white/5 text-slate-500 hover:bg-white/10",
            )}
          >
            <div
              className={cn(
                "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                selected.includes(item.label)
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "bg-white/5",
              )}
            >
              <item.icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-bold">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepPhotos() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8">
      <div className="space-y-4">
        <div className="h-48 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-3 hover:bg-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group">
          <div className="h-12 w-12 rounded-2xl bg-white/5 text-slate-500 flex items-center justify-center group-hover:scale-110 group-hover:text-indigo-400 transition-all">
            <Camera className="h-6 w-6" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-white">
              Click to upload photos
            </p>
            <p className="text-xs text-slate-500 mt-1">
              PNG, JPG or WebP (max 10MB each)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-square bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-slate-700"
            >
              <Camera className="h-6 w-6 opacity-20" />
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
        <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest text-center leading-relaxed">
          Properties with real, high-quality photos get 4x more visit requests
          in Tunisia.
        </p>
      </div>
    </div>
  );
}
