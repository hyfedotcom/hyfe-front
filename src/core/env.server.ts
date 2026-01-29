import "server-only";
import { z } from "zod";

const ServerEnvSchema = z.object({
  STRAPI_URL: z.string().url(),
  STRAPI_TOKEN: z.string().min(10),
  STRAPI_REVALIDATE_TOKEN: z.string().min(10),
  NEXT_PUBLIC_SITE_URL: z.string().min(10),
  NEWS_FORM_ID: z.string(),
  HUB_ID: z.string(),
  NEWS_FORM_TOKEN: z.string(),
  PREVIEW_SECRET: z.string(),
});

export const serverEnv = ServerEnvSchema.parse({
  STRAPI_URL: process.env.STRAPI_URL,
  STRAPI_TOKEN: process.env.STRAPI_TOKEN,
  STRAPI_REVALIDATE_TOKEN: process.env.STRAPI_REVALIDATE_TOKEN,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEWS_FORM_ID: process.env.NEWS_FORM_ID,
  NEWS_FORM_TOKEN: process.env.NEWS_FORM_TOKEN,
  HUB_ID: process.env.HUB_ID,
  PREVIEW_SECRET: process.env.PREVIEW_SECRET,
});
