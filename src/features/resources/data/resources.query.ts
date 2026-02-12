export const resourceList = {
  pagination: { page: 1, pageSize: 1000 },
  sort: ["date:desc"],
  fields: ["title", "slug", "date", "excerpt", "type"],
  populate: {
    cover: { fields: ["url", "alternativeText", "width", "height"] },
    tags: { fields: ["tag"] },
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

export const resourceLanding = {
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

export const resourceBySlug = (
  slug: string,
  draftMode: boolean,
  isPublication: boolean,
) => ({
  filters: { slug: { $eq: slug } },
  fields: isPublication
    ? ["title", "slug", "date", "type", "citation"]
    : ["title", "slug", "date", "type"],
  populate: {
    cover: { fields: ["url", "alternativeText", "width", "height"] },
    tags: { fields: ["tag"] },
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
    blocks: {
      on: {
        "resource.rich-text": { fields: ["content"] },
        "resource.image": {
          fields: ["title", "description"],
          populate: {
            image: { fields: ["url", "alternativeText", "width", "height"] },
          },
        },
        "resource.cta": {
          fields: ["title"],
          populate: {
            cta: { fields: ["label", "url"] },
          },
        },
        "resource.related-resources": {
          fields: ["title", "paragraph", "auto_mode"],
          populate: {
            cards: {
              populate: {
                publication: {
                  fields: ["slug"],
                },
                insight: {
                  fields: ["slug"],
                },
                white_papers: {
                  fields: ["slug"],
                },
                news: {
                  fields: ["slug"],
                },
                cough_news: {
                  fields: ["slug"],
                },
              },
              fields: ["resource_type"],
            },
          },
        },
        "resource.quote": {
          fields: ["name", "job", "paragraph"],
        },
        "resource.video": {
          fields: ["title", "url", "description"],
        },
        "resource.additional-info": {
          fields: ["title"],
          populate: {
            info_links: {
              fields: ["url", "label"],
            },
          },
        },
      },
    },
  },
  status: `${draftMode ? "draft" : "published"}`,
});

export const pageBuilderResourceRelation = {
  fields: ["title", "paragraph"],
  populate: {
    sections: {
      on: {
        "resource.resource-feed": {
          fields: ["title", "paragraph", "type"],
          populate: {
            tag: {
              fields: ["tag"],
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
        meta_image: {
          fields: ["url", "alternativeText", "width", "height"],
        },
      },
    },
  },
};
