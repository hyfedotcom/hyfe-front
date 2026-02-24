import StrapiFetch from "@/core/strapi/strapiFetch";
import {
  GeneralFooterQuery,
  GeneralLegacyQuery,
  GeneralQuery,
} from "./general.query";
import {
  parseOrThrow,
  StrapiCollectionSchema,
} from "@/features/shared/schema/strapi.schema";
import { HeaderSchema } from "../schema/domain";

function isPopulateValidationError(error: unknown) {
  return (
    error instanceof Error &&
    /ValidationError/i.test(error.message) &&
    /Invalid key/i.test(error.message)
  );
}

export default async function getGeneral() {
  let generalRaw;

  try {
    generalRaw = await StrapiFetch({
      path: "/api/general",
      query: GeneralQuery,
      tags: ["general"],
    });
  } catch (fullQueryError) {
    if (!isPopulateValidationError(fullQueryError)) {
      throw fullQueryError;
    }

    try {
      generalRaw = await StrapiFetch({
        path: "/api/general",
        query: GeneralFooterQuery,
        tags: ["general"],
      });
    } catch (footerQueryError) {
      if (!isPopulateValidationError(footerQueryError)) {
        throw footerQueryError;
      }

      generalRaw = await StrapiFetch({
        path: "/api/general",
        query: GeneralLegacyQuery,
        tags: ["general"],
      });
    }
  }

  const general = parseOrThrow(
    StrapiCollectionSchema(HeaderSchema),
    generalRaw,
  );

  return general;
}
