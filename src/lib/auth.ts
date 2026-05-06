import { betterAuth } from "better-auth";
import { env } from "@/env";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { database } from "@/db";
import * as schema from "@/db/schema";
import { headers } from "next/headers";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseUrl: env.BETTER_AUTH_URL,
  database: drizzleAdapter(database, {
    provider: "pg",
    schema: {
      ...schema,
      user: schema.user,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "student",
      },
    },
  },
  plugins: [nextCookies()],
});

export async function getCurrentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user as schema.User;
}
