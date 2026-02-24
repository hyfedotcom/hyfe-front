export const AboutQuery = {
  populate: {
    sections: {
      on: {
        "shared.hero-content": {
          fields: ["title"],
          populate: {
            content: {
              fields: ["paragraph"],
            },
          },
        },
        "shared.content-image-split": {
          fields: ["title", "variant"],
          populate: {
            content: {
              fields: ["paragraph"],
            },
            image: {
              fields: ["url", "alternativeText", "width", "height"],
            },
          },
        },
        "shared.timeline": {
          populate: {
            column: {
              fields: ["year"],
              populate: {
                item: {
                  fields: ["month_day", "paragraph"],
                },
              },
            },
          },
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
        meta_image: { fields: ["url", "alternativeText", "width", "height"] },
      },
    },
  },
};
