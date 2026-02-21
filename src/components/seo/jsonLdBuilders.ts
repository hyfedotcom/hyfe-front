import { publicEnv } from "@/core/env.public";
import type {
  ResourceDetail,
  ResourceType,
} from "@/features/resources";
import type { FaqSectionType } from "@/features/faq/schema/faq.schema";
import { richTextToPlainText } from "@/features/resources/utils/richTextToPlainText";

const SITE_NAME = "Hyfe";
const SITE_URL = publicEnv.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
const LOGO_URL = `${SITE_URL}/header/logo.png`;

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
  };
}

export function buildArticleJsonLd({
  resource,
  type,
}: {
  resource: ResourceDetail;
  type: ResourceType;
}) {
  const isNews = type === "news" || type === "cough-news";
  const url = `${SITE_URL}/${type}/${resource.slug}`;
  const imageUrl = resource.cover?.url;

  return {
    "@context": "https://schema.org",
    "@type": isNews ? "NewsArticle" : "Article",
    headline: resource.title,
    datePublished: resource.date,
    dateModified: resource.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: imageUrl ? [imageUrl] : undefined,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
  };
}

export function buildFaqJsonLd(sections: FaqSectionType[]) {
  const mainEntity = sections.flatMap((section) =>
    section.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: richTextToPlainText(faq.answer),
      },
    })),
  );

  if (!mainEntity.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}
