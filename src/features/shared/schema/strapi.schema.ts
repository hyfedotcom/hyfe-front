import { z } from "zod";

export const StrapiCollectionSchema = <S extends z.ZodTypeAny>(SchemaItem: S) =>
  z
    .object({
      data: SchemaItem,
      meta: z.unknown(),
    })
    .transform((res) => (res as { data: z.output<S> }).data);

export function parseOrThrow<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
): z.infer<T> {
  const r = schema.safeParse(data);
  if (!r.success) {
    // дерево удобно, когда вложенные структуры
    console.error(z.treeifyError(r.error));
    throw new Error("Invalid API response");
  }
  return r.data;
}

export const SlugsSchema = z.array(
  z.looseObject({
    slug: z.string(),
  }),
);
