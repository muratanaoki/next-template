import { z } from "zod";

const envSchema = z.object({
  API_URL: z.string().url(),
  ENVIRONMENT: z.enum(["development", "staging", "production"]),
  ANALYTICS_ID: z.string().optional(),
});

export const env = envSchema.parse({
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  ENVIRONMENT: process.env.NODE_ENV,
  ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
});