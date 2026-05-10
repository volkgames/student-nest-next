"use server";

import { database } from "@/db";
import { property } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function getAllProperties() {
  const properties = await database.query.property.findMany({
    where: eq(property.status, "published"),
    with: {
      owner: {
        columns: {
          name: true,
          email: true,
        },
      },
    },
  });
  return properties;
}

export async function incrementPropertyView(id: string) {
  try {
    await database
      .update(property)
      .set({
        views: sql`${property.views} + 1`,
      })
      .where(eq(property.id, id));
  } catch (error) {
    console.log(error);
  }
}
