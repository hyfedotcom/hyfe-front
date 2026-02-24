import { HeaderRawschema } from "./raw";
import { z } from "zod";

const ABSOLUTE_URL_RE = /^https?:\/\//i;
const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? process.env.STRAPI_URL ?? "";

function normalizeUrl(url?: string | null) {
  if (!url) return "";
  if (ABSOLUTE_URL_RE.test(url)) return encodeURI(url);
  if (!STRAPI_BASE_URL) return encodeURI(url);
  const prefix = STRAPI_BASE_URL.endsWith("/")
    ? STRAPI_BASE_URL.slice(0, -1)
    : STRAPI_BASE_URL;
  const suffix = url.startsWith("/") ? url : `/${url}`;
  return encodeURI(`${prefix}${suffix}`);
}

function mapHeaderMedia(
  media?: { url: string; alternativeText?: string | null } | null,
) {
  if (!media?.url) return undefined;
  return {
    url: normalizeUrl(media.url),
    alt: media.alternativeText ?? undefined,
  };
}

function mapHeaderLink(link: {
  label: string;
  description?: string | null;
  url: string;
  icon?: { url: string; alternativeText?: string | null } | null;
}) {
  return {
    label: link.label,
    description: link.description ?? undefined,
    url: link.url,
    icon: mapHeaderMedia(link.icon),
  };
}

function mapHeaderProductLink(link: {
  label: string;
  description?: string | null;
  url: string;
  icon?: { url: string; alternativeText?: string | null } | null;
  image?: { url: string; alternativeText?: string | null } | null;
}) {
  return {
    label: link.label,
    description: link.description ?? undefined,
    url: link.url,
    icon: mapHeaderMedia(link.icon),
    image: mapHeaderMedia(link.image),
  };
}

export const HeaderSchema = HeaderRawschema.transform((res) => ({
  header: {
    header_banner: {
      label: res.header.header_banner?.label ?? "",
      url: res.header.header_banner?.url ?? "",
    },
    product_items: (res.header.product_items ?? []).map(mapHeaderProductLink),
    solutions_items: (res.header.solutions_items ?? []).map(mapHeaderLink),
    company_items: (res.header.company_items ?? []).map(mapHeaderLink),
    resource_quick_links: (res.header.resource_quick_links ?? []).map(
      mapHeaderLink,
    ),
    resource_sections: (res.header.resource_sections ?? []).map((section) => ({
      title: section.title,
      description: section.description ?? undefined,
      all_url: section.all_url ?? undefined,
      items: (section.items ?? []).map(mapHeaderLink),
    })),
    cta: res.header.cta
      ? {
          label: res.header.cta.label,
          url: res.header.cta.url,
        }
      : null,
  },
  footer: res.footer
    ? {
        navigation_groups: res.footer.navigation_groups ?? [],
        legal_links: res.footer.legal_links ?? [],
        copyright_text: res.footer.copyright_text ?? null,
      }
    : null,
}));

export type HeaderType = z.infer<typeof HeaderSchema>["header"];
export type FooterType = z.infer<typeof HeaderSchema>["footer"];
