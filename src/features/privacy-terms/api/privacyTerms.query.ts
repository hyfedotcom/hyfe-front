const seoPopulate = {
  fields: [
    "meta_title",
    "meta_description",
    "keywords",
    "meta_robots",
    "canonical_URL",
    "structured_data",
  ],
  populate: {
    meta_image: {
      fields: ["url", "alternativeText", "width", "height"],
    },
  },
};

export const privacyTermIndexableSlugsQuery = {
  fields: ["slug"],
  pagination: { pageSize: 1000 },
  populate: {
    seo: {
      fields: ["meta_robots"],
    },
  },
};

export const privacyTermBySlugQuery = (slug: string) => ({
  filters: { slug: { $eq: slug } },
  fields: ["content_only", "name", "slug", "date","text_orientation"],
  populate: {
    rich_text: {
      fields: ["content"],
    },
    seo: seoPopulate,
  },
});
