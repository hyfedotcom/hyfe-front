export const pageBuilder = {
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
        "shared.hero-stats": {
          fields: ["title", "paragraph"],
          populate: {
            ctas: { fields: ["label", "url"] },
            stats: { fields: ["value", "label"] },
          },
        },
        "shared.cards-grid": {
          fields: ["title", "paragraph"],
          populate: {
            ctas: { fields: ["label", "url"] },
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
        "shared.partners": {
          fields: ["title", "paragraph"],
          populate: {
            logos: {
              fields: ["url", "alternativeText", "width", "height"],
            },
          },
        },
        "shared.products-cards": {
          fields: ["title", "paragraph"],
          populate: {
            cards: {
              fields: ["title", "description"],
              populate: {
                image: {
                  fields: ["url", "alternativeText", "width", "height"],
                },
                cta: {
                  fields: ["label", "url"],
                },
              },
            },
          },
        },
        "shared.resource-links": {
          fields: ["title", "paragraph"],
          populate: {
            links: { fields: ["title", "description", "type"] },
          },
        },
        "shared.feature-cards-right": {
          fields: ["title", "paragraph"],
          populate: {
            cta: { fields: ["url", "label"] },
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
              fields: ["label", "url"],
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
        "resource.resource-feed-many": {
          populate: {
            resource_list: {
              fields: ["title", "paragraph", "type"],
              populate: {
                tag: {
                  fields: ["tag"],
                },
              },
            },
          },
        },

        // "resource.tabbed-resource-feed": {
        //   fields: ["title", "paragraph"],
        //   populate: {
        //     cards: {
        //       fields: ["type"],
        //       populate: {
        //         publications: {
        //           fields: ["slug", "title", "excerpt", "date", "type"],
        //           populate: {
        //             cover: {
        //               fields: ["url", "alternativeText", "width", "height"],
        //             },
        //             tags: {
        //               fields: ["tag"],
        //             },
        //           },
        //         },
        //         white_papers: {
        //           fields: ["slug", "title", "excerpt", "date", "type"],
        //           populate: {
        //             cover: {
        //               fields: ["url", "alternativeText", "width", "height"],
        //             },
        //             tags: {
        //               fields: ["tag"],
        //             },
        //           },
        //         },
        //         news: {
        //           fields: ["slug", "title", "excerpt", "date", "type"],
        //           populate: {
        //             cover: {
        //               fields: ["url", "alternativeText", "width", "height"],
        //             },
        //             tags: {
        //               fields: ["tag"],
        //             },
        //           },
        //         },
        //         cough_news: {
        //           fields: ["slug", "title", "excerpt", "date", "type"],
        //           populate: {
        //             cover: {
        //               fields: ["url", "alternativeText", "width", "height"],
        //             },
        //             tags: {
        //               fields: ["tag"],
        //             },
        //           },
        //         },
        //         insights: {
        //           fields: ["slug", "title", "excerpt", "date", "type"],
        //           populate: {
        //             cover: {
        //               fields: ["url", "alternativeText", "width", "height"],
        //             },
        //             tags: {
        //               fields: ["tag"],
        //             },
        //           },
        //         },
        //       },
        //     },
        //   },
        // },
      },
    },
  },
};
