export const faqQuery = {
  fields: ["title", "paragraph"],
  populate: {
    sections: {
      on: {
        "shared.faq-section": {
          fields: ["title"],
          populate: {
            faqs: {
              fields: ["question", "answer"],
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
    },
  },
};
