export const pageSolution = (slug: string) => ({
  filteres: { slug: { $eq: slug } },
  fields: ["slug", "name"],
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
        meta_image: {
          fields: ["url", "alternativeText", "width", "height"],
        },
      },
    },
    sections: {
      on: {
        // "shared.hero": {
        //   fields: ["title", "paragraph"],
        //   populate: {
        //     ctas: {
        //       fields: ["url", "label"],
        //     },
        //   },
        // },
        "shared.partners": {
          populate: {
            fields: ["title", "paragraph"],
            logos: {
              fields: ["url", "alternativeText", "width", "height"],
            },
          },
        },
        "shared.cards-grid": {
          fields: ["title", "paragraph"],
          populate: {
            ctas: {
              fields: ["url", "label"],
            },
            cards: {
              fields: ["title", "description"],
              populate: {
                image: {
                  fields: ["url", "alternativeText", "width", "height"],
                },
              },
            },
          },
        },
        "shared.accordion": {
          fields: ["title", "paragraph"],
          populate: {
            ctas: {
              fields: ["url", "label"],
            },
            cards: {
              fields: ["title", "description"],
              populate: {
                image: {
                  fields: ["url", "alternativeText", "width", "height"],
                },
              },
            },
          },
        },
        "shared.cta": {
          fields: ["title", "paragraph"],
          populate: {
            ctas: {
              fields: ["url", "label"],
            },
          },
        },
        "shared.problem-insight-solution": {
          fields: ["title", "paragraph"],
          populate: {
            problem: {
              fields: ["value", "description"],
            },
            insight: {
              fields: ["value"],
            },
            solution: {
              fields: ["value"],
              populate: {
                cta: {
                  fields: ["label", "url"],
                },
              },
            },
          },
        },
      },
    },
  },
});
