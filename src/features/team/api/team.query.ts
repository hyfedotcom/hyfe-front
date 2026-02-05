export const teamyLandingQuer = {
  fields: ["title", "paragraph"],
  populate: {
    sections: {
      on: {
        "shared.team-order": {
          populate: {
            team_group: {
              fields: ["name_group"],
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

export const teamItemQuery = {
  fields: ["name", "slug", "job", "location", "linkedin", "twitter"],
  populate: {
    team_group: {
      fields: ["name_group"],
    },
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
export const memberBySlugQuery = (slug: string) => ({
  filters: { slug: { $eq: slug } },
  pagination: { pageSize: 1 },
  fields: ["name", "slug", "job", "location", "linkedin", "twitter"],
  populate: {
    image: { fields: ["url", "alternativeText", "width", "height"] },
    team_group: {
      fields: ["name_group"],
    },
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
