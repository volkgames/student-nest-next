"use client";

import { UseFormReturn, useWatch } from "react-hook-form";
import { FormValues } from "../page";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Camera, Loader2, X } from "lucide-react";
import Image from "next/image";
import { env } from "@/env";
import { extractDominantColor } from "@/lib/image-utils";

export default function StepPhotos({
  form,
}: {
  form: UseFormReturn<FormValues>;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const images =
    useWatch({
      control: form.control,
      name: "images",
      defaultValue: [],
    }) || [];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newImages = [...images];
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        );

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          },
        );

        const result = await res.json();

        if (result.secure_url) {
          newImages.push(result.secure_url);
        } else {
          console.error("Cloudinary upload error:", result);
          throw new Error(result.error?.message || "Upload failed");
        }
      }
      form.setValue("images", newImages, {
        shouldValidate: true,
        shouldDirty: true,
      });

      // Extract color from the first image
      if (newImages.length > 0) {
        const color = await extractDominantColor(newImages[0]);
        form.setValue("imageColor", color);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error?.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8">
      <div className="space-y-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleUpload}
        />
        <div
          onClick={() => fileInputRef.current?.click()}
          className="h-48 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-3 hover:bg-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group"
        >
          {isUploading ? (
            <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
          ) : (
            <div className="h-12 w-12 rounded-2xl bg-white/5 text-slate-500 flex items-center justify-center group-hover:scale-110 group-hover:text-indigo-400 transition-all">
              <Camera className="h-6 w-6" />
            </div>
          )}
          <div className="text-center">
            <p className="text-sm font-bold text-white">
              {isUploading ? "Uploading photos..." : "Click to upload photos"}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              PNG, JPG or WebP (max 10MB each)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {images.map((url: string) => (
            <div
              key={url}
              className="aspect-square relative rounded-2xl overflow-hidden border border-white/10 group"
            >
              <Image
                src={url}
                alt="Property"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 25vw"
              />
              <button
                type="button"
                onClick={() =>
                  form.setValue(
                    "images",
                    images.filter((i: string) => i !== url),
                    { shouldValidate: true, shouldDirty: true },
                  )
                }
                className="absolute top-2 right-2 h-6 w-6 bg-red-500 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
