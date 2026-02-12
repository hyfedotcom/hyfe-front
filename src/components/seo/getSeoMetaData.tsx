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
    structuredData,
    keywords,
  } = seo;

  const hasText = (value?: string) => Boolean(value?.trim());

  const titleValue = hasText(title) ? title : undefined;
  const descriptionValue = hasText(description) ? description : undefined;
  const keywordsValue = hasText(keywords) ? keywords : undefined;
  const canonicalValue = hasText(canonical) ? canonical : undefined;
  const robotsValue = hasText(robots) ? robots : undefined;
  const hasImage = Boolean(image?.url?.trim());
  const hasStructuredData = hasText(structuredData);

  const isSeoEmpty =
    !titleValue &&
    !descriptionValue &&
    !keywordsValue &&
    !robotsValue &&
    !canonicalValue &&
    !hasImage &&
    !hasStructuredData;

  if (isSeoEmpty) {
    return {
      robots: { index: false, follow: false },
    };
  }

  return {
    title: titleValue,
    description: descriptionValue,
    keywords: keywordsValue,
    alternates: {
      canonical: canonicalValue,
    },
    openGraph: {
      title: titleValue,
      description: descriptionValue,
      images: image?.url ? [{ url: image.url, alt: image.alt }] : undefined,
      type: "website",
    },
    twitter: {
      card: image?.url ? "summary_large_image" : "summary",
      title: titleValue,
      description: descriptionValue,
      images: image?.url ? [image.url] : undefined,
    },
    robots: robotsValue
      ? {
          index: !robotsValue.includes("noindex"),
          follow: !robotsValue.includes("nofollow"),
        }
      : undefined,
  };
}
