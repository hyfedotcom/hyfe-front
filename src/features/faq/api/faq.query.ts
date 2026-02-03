export const faqLandingQuery = {
  fields: ["title", "paragraph"],
  populate: {
    faq_groups: {
      fields: [" group_name"],
    },
    seo: {
      fields: [
        "meta_title",
        "meta_description",
        "keywords",
        "meta_robots",
        "canonical_URL",
        "structured_data",
      ],
      populate: {
        meta_image: { fields: ["url", "alternativeText", "width", "height"] },
      },
    },
  },
};

export const faqItemQuery = {
  fields: ["question", "answer"],
  populate: {
    faq_group: {
      fields: ["group_name"],
    },
  },
};
