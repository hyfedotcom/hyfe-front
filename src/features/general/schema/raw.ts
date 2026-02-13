import { z } from "zod";

export const HeaderRawschema = z.looseObject({
  header: z.looseObject({
    header_banner: z.looseObject({
      label: z.string(),
      url: z.string(),
    }),
  }),
});
