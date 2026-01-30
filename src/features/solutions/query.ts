export const pageSolution = (slug: string) => ({
  filters: { slug: { $eq: slug } },
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
        "shared.hero-simple": {
          fields: ["title", "paragraph"],
          populate: {
            ctas: {
              fields: ["url", "label"],
            },
          },
        },
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
                icon: {
                  fields: ["url", "alternativeText", "width", "height"],
                },
              },
            },
          },
        },
        "shared.card-product-steps": {
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
        "shared.map": {
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
        "resource.resource-feed": {
          fields: ["title", "paragraph", "type"],
          populate: {
            tag: {
              fields: ["tag"],
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
        "shared.testimonials-feed": {
          fields: ["title", "paragraph"],
          populate: {
            testimonials: {
              fields: ["paragraph", "name", "role"],
            },
          },
        },
      },
    },
  },
});
