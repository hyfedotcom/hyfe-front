import { z } from "zod";

export function parseOrThrow<T extends z.ZodTypeAny>(schema: T, data: unknown) {
  const r = schema.safeParse(data);
  if (!r.success) {
    console.error(z.treeifyError(r.error));
    throw new Error("Invalid API response");
  }
  return r.data;
}
