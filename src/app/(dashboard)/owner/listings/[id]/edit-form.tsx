"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAction } from "next-safe-action/hooks";
import { updatePropertyAction } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import StepBasics from "../new/components/steps-basic";
import StepLocation from "../new/components/step-location";
import StepAmenities from "../new/components/step-amenities";
import StepPhotos from "../new/components/step-photos";
import { Property } from "@/db/schema";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  pricePerMonth: z.number().positive("Price must be positive"),
  location: z.string().min(5, "Address must be at least 5 characters"),
  latitude: z.string(),
  longitude: z.string(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  imageColor: z.string().optional(),
  amenities: z.array(z.string()),
  roomType: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditPropertyForm({ initialData }: { initialData: Property }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const mapRef = useRef<MapRef>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title ?? "",
      description: initialData.description ?? "",
      pricePerMonth: initialData.pricePerMonth ?? 0,
      location: initialData.location ?? "",
      latitude: initialData.latitude ?? "36.8065",
      longitude: initialData.longitude ?? "10.1815",
      images: initialData.images ?? [],
      imageColor: initialData.imageColor ?? "bg-indigo-500/20",
      amenities: initialData.amenities ?? [],
      roomType: initialData.roomType ?? "Studio",
    },
  });

  const { execute, isPending } = useAction(updatePropertyAction, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success("Property updated successfully!");
        setStep(5);
        setTimeout(() => router.push("/owner/listings"), 2000);
      } else if (data?.error) {
        toast.error(data.error);
      }
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "An error occurred");
    },
  });

  const onSubmit = (values: FormValues) => {
    execute({ id: initialData.id, ...values });
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    if (step === 1)
      fieldsToValidate = ["title", "description", "pricePerMonth", "roomType"];
    if (step === 2) fieldsToValidate = ["location", "latitude", "longitude"];
    if (step === 3) fieldsToValidate = ["amenities"];
    if (step === 4) fieldsToValidate = ["images"];

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) setStep((s) => Math.min(s + 1, 4));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  if (step === 5) return <SuccessState />;

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-20">
      {/* Header & Progress */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Edit Property
            </h1>
            <p className="text-slate-500 text-sm">
              Update the details of your property listing
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-indigo-500">{step}</span>
            <span className="text-slate-600 font-bold">/4</span>
          </div>
        </div>

        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "25%" }}
            animate={{ width: `${(step / 4) * 100}%` }}
            className="h-full bg-linear-to-r from-indigo-600 to-purple-600 shadow-[0_0_15px_rgba(79,70,229,0.5)]"
          />
        </div>
      </div>

      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSubmit={form.handleSubmit(onSubmit as any)}
          className="space-y-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && <StepBasics form={form} />}
              {step === 2 && <StepLocation form={form} mapRef={mapRef} />}
              {step === 3 && <StepAmenities form={form} />}
              {step === 4 && <StepPhotos form={form} />}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="pt-10 flex justify-between items-center border-t border-white/5">
            <Button
              type="button"
              variant="ghost"
              onClick={prevStep}
              disabled={step === 1 || isPending}
              className="h-12 px-6 text-slate-500 hover:text-white rounded-xl font-bold uppercase tracking-widest text-[10px]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {step < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all"
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isPending}
                className="h-12 px-10 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    Update Listing
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-20 text-center space-y-6"
    >
      <div className="h-20 w-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-white">Listing Updated!</h2>
        <p className="text-slate-500">
          Your changes have been saved. Redirecting...
        </p>
      </div>
    </motion.div>
  );
}
