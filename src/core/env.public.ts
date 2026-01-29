import { z } from "zod";

const PublicEnvSchema = z.object({
  NEXT_PUBLIC_STRAPI_URL: z.string().url(),
  NEXT_PUBLIC_SITE_URL: z.string().min(10),
});

export const publicEnv = PublicEnvSchema.parse({
  NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
