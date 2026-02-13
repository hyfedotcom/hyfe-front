export const GeneralQuery = {
  populate: {
    header: {
      populate: {
        header_banner: {
          fields: ["label", "url"],
        },
      },
    },
  },
};
