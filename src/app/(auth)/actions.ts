/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/safe-action";
import { headers } from "next/headers";

import { loginSchema, signupSchema } from "./schema";

export const loginAction = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    let role: string | undefined;
    try {
      const response = await auth.api.signInEmail({
        body: {
          email,
          password,
        },
        headers: await headers(),
      });

      if (!response) {
        return { error: "Invalid credentials" };
      }

      role = response.user.role;
    } catch (error: any) {
      return { error: error.message || "Failed to sign in" };
    }

    revalidatePath("/", "layout");
    if (role === "owner") {
      redirect("/owner");
    } else {
      redirect("/student");
    }
  });

export const signupAction = actionClient
  .inputSchema(signupSchema)
  .action(async ({ parsedInput: { email, password, name, role: inputRole } }) => {
    let role: string | undefined;
    try {
      const response = await auth.api.signUpEmail({
        body: {
          email,
          password,
          name,
          role: inputRole,
        },
        headers: await headers(),
      });

      if (!response) {
        return { error: "Failed to create account" };
      }

      role = response.user.role;
    } catch (error: any) {
      return { error: error.message || "Failed to sign up" };
    }

    revalidatePath("/", "layout");
    if (role === "owner") {
      redirect("/owner");
    } else {
      redirect("/student");
    }
  });

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });
  revalidatePath("/", "layout");
  redirect("/");
}
