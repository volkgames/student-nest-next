import { betterAuth } from "better-auth";
import { env } from "@/env";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { database } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseUrl: env.BETTER_AUTH_URL,
  database: drizzleAdapter(database, {
    provider: "pg",
    schema: {
      ...schema,
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
});
