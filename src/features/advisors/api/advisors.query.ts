export const advisorsLandingQuer = {
  fields: ["title", "paragraph"],
  populate: {
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

export const advisorsItemQuery = {
  fields: ["name", "slug", "job", "location", "linkedin", "twitter"],
  populate: {
    image: { fields: ["url", "alternativeText", "width", "height"] },
    biography: {
      populate: {
        fields: ["content"],
      },
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

// team.query.ts
export const advisorBySlugQuery = (slug: string) => ({
  filters: { slug: { $eq: slug } },
  pagination: { pageSize: 1 },
  fields: ["name", "slug", "job", "location", "linkedin", "twitter"],
  populate: {
    image: { fields: ["url", "alternativeText", "width", "height"] },
    biography: {
      populate: {
        fields: ["content"],
      },
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
});
