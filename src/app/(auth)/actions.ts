/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import * as z from "zod";
import { headers } from "next/headers";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(["student", "owner"]),
});

export const loginAction = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      await auth.api.signInEmail({
        body: {
          email,
          password,
        },
        headers: await headers(),
      });
    } catch (error: any) {
      return { error: error.message || "Failed to sign in" };
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
  });

export const signupAction = actionClient
  .inputSchema(signupSchema)
  .action(async ({ parsedInput: { email, password, name, role } }) => {
    try {
      await auth.api.signUpEmail({
        body: {
          email,
          password,
          name,
          role,
        },
        headers: await headers(),
      });
    } catch (error: any) {
      return { error: error.message || "Failed to sign up" };
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
  });

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });
  revalidatePath("/", "layout");
  redirect("/login");
}
