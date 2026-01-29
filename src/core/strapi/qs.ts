import qs from "qs";

export type StrapiQuery = Record<string, unknown>;

export function toStrapiQuery(query?: StrapiQuery) {
  if (!query) return "";
  return qs.stringify(query, {
    encodeValuesOnly: true,
    skipNulls: true,
  });
}
