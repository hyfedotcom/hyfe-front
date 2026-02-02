export const careersQuery = {
  fields: ["title", "paragraph"],
  populate: {
    images: {
      fields: ["url", "alternativeText", "width", "height"],
    },
    vacancies: {
      fields: [
        "title",
        "slug",
        "excerpt",
        "location_type",
        "time_zone",
        "apply_link",
        "employment_type",
      ],
      populate: {
        rich_text: {
          fields: ["content"],
        },
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
        meta_image: {
          fields: ["url", "alternativeText", "width", "height"],
        },
      },
    },
  },
};
