import { z } from "zod";

export const StrapiCollectionSchema = (SchemaItem: z.ZodTypeAny) =>
  z
    .object({
      data: SchemaItem,
      meta: z.unknown(),
    })
    .transform((res) => res.data);

export function parseOrThrow<T extends z.ZodTypeAny>(schema: T, data: unknown) {
  const r = schema.safeParse(data);
  if (!r.success) {
    // дерево удобно, когда вложенные структуры
    console.error(z.treeifyError(r.error));
    throw new Error("Invalid API response");
  }
  return r.data;
}
