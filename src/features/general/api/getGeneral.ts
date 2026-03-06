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

const GENERAL_FALLBACK = {
  header: {
    header_banner: {
      label: "",
      url: "",
    },
    product_items: [],
    solutions_items: [],
    company_items: [],
    resource_quick_links: [],
    resource_sections: [],
    cta: null,
  },
  footer: null,
};

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

  if (!generalRaw) {
    console.error("getGeneral: empty CMS payload, using fallback");
    return GENERAL_FALLBACK;
  }

  try {
    return parseOrThrow(StrapiCollectionSchema(HeaderSchema), generalRaw);
  } catch (error) {
    console.error("getGeneral: invalid CMS payload, using fallback", error);
    return GENERAL_FALLBACK;
  }
}
