"use server";

import { auth } from "@/lib/auth";
import { database } from "@/db";
import { property } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const createPropertySchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  pricePerMonth: z.number().positive(),
  location: z.string().min(5),
  latitude: z.string(),
  longitude: z.string(),
  images: z.array(z.string()).min(1),
  imageColor: z.string().optional(),
  amenities: z.array(z.string()),
  roomType: z.string(),
  status: z.enum(["draft", "published"]).optional(),
});

const saveDraftSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  pricePerMonth: z.number().optional(),
  location: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  images: z.array(z.string()).optional(),
  imageColor: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  roomType: z.string().optional(),
});

export const createPropertyAction = actionClient
  .inputSchema(createPropertySchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "owner") {
      throw new Error("Unauthorized: Only owners can create listings");
    }

    try {
      const [newProperty] = await database
        .insert(property)
        .values({
          id: crypto.randomUUID(),
          ...parsedInput,
          status: parsedInput.status || "published",
          ownerId: session.user.id,
        })
        .returning();

      revalidatePath("/owner/listings");
      revalidatePath("/");
      
      return { success: true, propertyId: newProperty.id };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create listing";
      console.error("Error creating property:", error);
      return { error: errorMessage };
    }
  });

export const saveDraftAction = actionClient
  .inputSchema(saveDraftSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "owner") {
      throw new Error("Unauthorized: Only owners can create listings");
    }

    try {
      const [newProperty] = await database
        .insert(property)
        .values({
          id: crypto.randomUUID(),
          ...parsedInput,
          status: "draft",
          ownerId: session.user.id,
        })
        .returning();

      revalidatePath("/owner/listings");
      revalidatePath("/");

      return { success: true, propertyId: newProperty.id };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to save draft";
      console.error("Error saving draft:", error);
      return { error: errorMessage };
    }
  });
