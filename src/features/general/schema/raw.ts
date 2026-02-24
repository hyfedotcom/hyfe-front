import { z } from "zod";

export const HeaderMediaRawSchema = z.looseObject({
  url: z.string(),
  alternativeText: z.string().nullable().optional(),
});

export const HeaderLinkRawSchema = z.looseObject({
  label: z.string(),
  description: z.string().nullable().optional(),
  url: z.string(),
  icon: z.nullable(HeaderMediaRawSchema).optional(),
});

export const HeaderProductLinkRawSchema = z.looseObject({
  label: z.string(),
  description: z.string().nullable().optional(),
  url: z.string(),
  icon: z.nullable(HeaderMediaRawSchema).optional(),
  image: z.nullable(HeaderMediaRawSchema).optional(),
});

export const HeaderSectionRawSchema = z.looseObject({
  title: z.string(),
  description: z.string().nullable().optional(),
  all_url: z.string().nullable().optional(),
  items: z
    .nullable(z.array(HeaderLinkRawSchema))
    .optional()
    .transform((value) => value ?? []),
});

export const FooterLinkRawSchema = z.looseObject({
  label: z.string(),
  url: z.string(),
});

export const FooterNavigationGroupRawSchema = z.looseObject({
  title: z.string(),
  links: z
    .nullable(z.array(FooterLinkRawSchema))
    .optional()
    .transform((value) => value ?? []),
});

export const HeaderRawschema = z.looseObject({
  header: z.looseObject({
    header_banner: z
      .looseObject({
        label: z.string().nullable().optional(),
        url: z.string().nullable().optional(),
      })
      .optional(),
    product_items: z
      .nullable(z.array(HeaderProductLinkRawSchema))
      .optional()
      .transform((value) => value ?? []),
    solutions_items: z
      .nullable(z.array(HeaderLinkRawSchema))
      .optional()
      .transform((value) => value ?? []),
    company_items: z
      .nullable(z.array(HeaderLinkRawSchema))
      .optional()
      .transform((value) => value ?? []),
    resource_quick_links: z
      .nullable(z.array(HeaderLinkRawSchema))
      .optional()
      .transform((value) => value ?? []),
    resource_sections: z
      .nullable(z.array(HeaderSectionRawSchema))
      .optional()
      .transform((value) => value ?? []),
    cta: z
      .nullable(
        z.looseObject({
          label: z.string(),
          url: z.string(),
        }),
      )
      .optional(),
  }),
  footer: z
    .nullable(
      z.looseObject({
        navigation_groups: z
          .nullable(z.array(FooterNavigationGroupRawSchema))
          .optional()
          .transform((value) => value ?? []),
        legal_links: z
          .nullable(z.array(FooterLinkRawSchema))
          .optional()
          .transform((value) => value ?? []),
        copyright_text: z.string().optional().nullable(),
      }),
    )
    .optional(),
});
