import { UseFormReturn, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormValues } from "../page";
import { Wifi, Wind, Tv, Waves, ShieldCheck, Building2 } from "lucide-react";

const amenitiesList = [
  { label: "High-speed WiFi", icon: Wifi },
  { label: "Air Conditioning", icon: Wind },
  { label: "Smart TV", icon: Tv },
  { label: "Private Bathroom", icon: Waves },
  { label: "Security System", icon: ShieldCheck },
  { label: "Washing Machine", icon: Building2 },
];

export default function StepAmenities({
  form,
}: {
  form: UseFormReturn<FormValues>;
}) {
  const selected = useWatch({
    control: form.control,
    name: "amenities",
    defaultValue: [],
  }) || [];

  const toggle = (label: string) => {
    const newVal = selected.includes(label)
      ? selected.filter((l: string) => l !== label)
      : [...selected, label];
    form.setValue("amenities", newVal, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {amenitiesList.map((item) => (
          <button
            key={item.label}
            type="button"
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
