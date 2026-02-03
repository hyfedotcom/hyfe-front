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
  fields: ["name", "job", "location", "linkedin", "twitter"],
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
