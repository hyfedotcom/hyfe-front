export const pageSolutionSkeleton = (slug: string) => ({
  filters: { slug: { $eq: slug } },
  populate: {
    sections: {
      on: {
        "shared.hero-simple": true,
        "shared.partners": true,
        "shared.cards-grid": true,
        "shared.accordion": true,
        "shared.card-product-steps": true,
        "shared.cta": true,
        "shared.map": true,
        "shared.problem-insight-solution": true,
        "resource.resource-feed": true,
        "shared.content-image-split": true,
        "shared.testimonials-feed": true,
        "form.form-container": true,
      },
    },
  },
});

export const SolutionQueryBuild = (slug: string, components: string[]) => {
  const set = new Set<string>(components);

  const componentsOnBuilder: Record<string, object> = {
    "shared.map": {
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
    "shared.hero-simple": {
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
    "form.form-container": {
      fields: ["title", "paragraph"],
      populate: {
        list: {
          fields: ["label"],
        },
        form: {
          fields: ["formId", "cta_label", "cough_news_subscription"],
          populate: {
            inputs: {
              fields: ["hb_name", "label", "type", "required"],
            },
            consent: {
              fields: ["label", "privacy_link", "required"],
            },
          },
        },
      },
    },
  };

  const picked = Array.from(set).reduce((acc, key): Record<string, object> => {
    const preset = componentsOnBuilder[key];
    if (preset) acc[key] = preset;
    return acc;
  }, {});

  return pageSolutionQuery(slug, picked);
};

export const pageSolutionQuery = (
  slug: string,
  picked: Record<string, object>,
) => ({
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
      on: picked,
    },
  },
});

export const solutionSlugsQuery = {
  fields: ["slug"],
  pagination: { pageSize: 1000 },
};
