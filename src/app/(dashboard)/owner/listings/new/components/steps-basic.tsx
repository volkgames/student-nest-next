import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@/components/ui/select";
import { DollarSign } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../page";

export default function StepBasics({ form }: { form: UseFormReturn<FormValues> }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Property Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Modern Studio near INSAT" className="h-12 bg-white/5 border-white/5 text-white rounded-xl focus:ring-indigo-500/50" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="roomType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Property Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full h-12 py-6 bg-slate-900 border-white/5 text-white rounded-xl">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-slate-900 border-white/10 text-white">
                  <SelectItem value="Studio">Studio</SelectItem>
                  <SelectItem value="Shared Apartment">Shared Apartment</SelectItem>
                  <SelectItem value="Single Room">Single Room</SelectItem>
                  <SelectItem value="Whole House">Whole House</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pricePerMonth"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Price per Month (DT)</FormLabel>
              <FormControl>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-4 h-4 w-4 text-slate-500" />
                  <Input 
                    type="number" 
                    className="pl-11 h-12 bg-white/5 border-white/5 text-white rounded-xl focus:ring-indigo-500/50" 
                    {...field} 
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val === "" ? 0 : Number(val));
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Description</FormLabel>
            <FormControl>
              <textarea
                className="w-full min-h-[150px] bg-white/5 border border-white/5 text-sm text-white rounded-2xl p-4 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="Describe your property..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}