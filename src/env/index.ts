import { z } from "zod";

const envSchema = z.object({
  API_URL: z.string().url(),
  APP_ENV: z.enum(["development", "staging", "production"]),
  NODE_ENV: z.enum(["development", "production", "test"]),
  ANALYTICS_ID: z.string().optional(),
  DEBUG_MODE: z.boolean().default(false),
});

export const env = envSchema.parse({
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV,
  NODE_ENV: process.env.NODE_ENV,
  ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE === "true",
});
