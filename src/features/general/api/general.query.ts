const HeaderLegacyPopulate = {
  header_banner: {
    fields: ["label", "url"],
  },
};

const HeaderLinkFields = ["label", "description", "url"] as const;

const HeaderLinkPopulate = {
  icon: {
    fields: ["url", "alternativeText"],
  },
};

const HeaderProductLinkPopulate = {
  ...HeaderLinkPopulate,
  image: {
    fields: ["url", "alternativeText"],
  },
};

const HeaderFullPopulate = {
  ...HeaderLegacyPopulate,
  product_items: {
    fields: HeaderLinkFields,
    populate: HeaderProductLinkPopulate,
  },
  solutions_items: {
    fields: HeaderLinkFields,
    populate: HeaderLinkPopulate,
  },
  company_items: {
    fields: HeaderLinkFields,
    populate: HeaderLinkPopulate,
  },
  resource_quick_links: {
    fields: HeaderLinkFields,
    populate: HeaderLinkPopulate,
  },
  resource_sections: {
    fields: ["title", "description", "all_url"],
    populate: {
      items: {
        fields: HeaderLinkFields,
        populate: HeaderLinkPopulate,
      },
    },
  },
  cta: {
    fields: ["label", "url"],
  },
};

const FooterPopulate = {
  fields: ["copyright_text"],
  populate: {
    navigation_groups: {
      fields: ["title"],
      populate: {
        links: {
          fields: ["label", "url"],
        },
      },
    },
    legal_links: {
      fields: ["label", "url"],
    },
  },
};

export const GeneralLegacyQuery = {
  populate: {
    header: {
      populate: HeaderLegacyPopulate,
    },
  },
};

export const GeneralFooterQuery = {
  populate: {
    ...GeneralLegacyQuery.populate,
    footer: FooterPopulate,
  },
};

export const GeneralQuery = {
  populate: {
    ...GeneralFooterQuery.populate,
    header: {
      populate: HeaderFullPopulate,
    },
  },
};
