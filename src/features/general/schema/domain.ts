import { HeaderRawschema } from "./raw";

export const HeaderSchema = HeaderRawschema.transform((res) => ({
  header: res.header,
}));
