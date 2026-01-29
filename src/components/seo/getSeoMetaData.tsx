import { SeoType } from "@/features/resources";
import type { Metadata } from "next";

export function getSeoMetadata(seo?: SeoType): Metadata {
  if (!seo) return {};

  const {
    title,
    description,
    image,
    canonical,
    robots,
    // structuredData, // next Metadata не принимает это напрямую (нужно <script> в layout/page)
  } = seo;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      images: image?.url ? [{ url: image.url, alt: image.alt }] : undefined,
      type: "website",
    },
    twitter: {
      card: image?.url ? "summary_large_image" : "summary",
      title,
      description,
      images: image?.url ? [image.url] : undefined,
    },
    robots: robots
      ? {
          // если у тебя robots строкой (например "noindex,nofollow") — лучше распарсить, но пока так:
          index: !robots.includes("noindex"),
          follow: !robots.includes("nofollow"),
        }
      : undefined,
  };
}
