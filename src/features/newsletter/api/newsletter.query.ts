export const newsletterFormQuery = {
  populate: {
    newsletter_form: {
      fields: ["title", "cta_label", "consent_label"],
      populate: {
        benefits_list: true,
      },
    },
  },
};
