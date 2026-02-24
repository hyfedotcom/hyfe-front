import { HeaderRawschema } from "./raw";
import { z } from "zod";

export const HeaderSchema = HeaderRawschema.transform((res) => ({
  header: res.header,
}));

export type HeaderType = z.infer<typeof HeaderSchema>["header"];
