"use server";

import { database } from "@/db";
import { property } from "@/db/schema";
import { authenticatedAction } from "@/lib/safe-action";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const getMyListings = authenticatedAction.action(
  async ({ ctx: { user } }) => {
    const myListings = await database.query.property.findMany({
      where: eq(property.ownerId, user.id),
    });
    return myListings;
  },
);

export const deletePropertyAction = authenticatedAction
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id }, ctx: { user } }) => {
    try {
      await database
        .delete(property)
        .where(and(eq(property.id, id), eq(property.ownerId, user.id)));

      revalidatePath("/owner/listings");

      return { success: true };
    } catch (error) {
      console.error("Delete property error:", error);
      return { error: "Failed to delete property" };
    }
  });

export const getPropertyById = authenticatedAction
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id }, ctx: { user } }) => {
    const item = await database.query.property.findFirst({
      where: eq(property.id, id),
    });

    if (!item) return { error: "Property not found" };
    if (item.ownerId !== user.id) return { error: "Unauthorized" };

    return { success: true, property: item };
  });

export const updatePropertyAction = authenticatedAction
  .schema(
    z.object({
      id: z.string(),
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
    }),
  )
  .action(async ({ parsedInput: { id, ...data }, ctx: { user } }) => {
    try {
      await database
        .update(property)
        .set(data)
        .where(and(eq(property.id, id), eq(property.ownerId, user.id)));

      revalidatePath("/owner/listings");
      revalidatePath("/");
      return { success: true };
    } catch (error) {
      console.error("Update property error:", error);
      return { error: "Failed to update property" };
    }
  });
