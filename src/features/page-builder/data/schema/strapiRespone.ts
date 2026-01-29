import { z } from "zod";

export const StrapiResponse = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    meta: z.unknown(),
  });
