import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import {
  getIndexablePrivacyTermSlugs,
  getPrivacyTermPage,
} from "@/features/privacy-terms";
import { getResourcesList } from "@/features/resources";
import {
  isResourceType,
  RESOURCE_TYPES,
} from "@/features/resources/data/api/resourceType";
import { Metadata } from "next";
export const dynamic = "force-static";
export const revalidate = 86400;

type Params = { type: string };

export async function generateStaticParams(): Promise<Params[]> {
  try {
    const privacyTermSlugs = await getIndexablePrivacyTermSlugs();
    const allTypes = Array.from(
      new Set([...RESOURCE_TYPES, ...privacyTermSlugs]),
    );
    return allTypes.map((type) => ({ type }));
  } catch (e) {
    console.error("generateStaticParams error on /[type] route:", e);
    return RESOURCE_TYPES.map((type) => ({ type }));
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const fallback: Metadata = {
    title: "",
    description: "",
    robots: { index: false, follow: false },
  };
  try {
    const { type } = await params;

    if (isResourceType(type)) {
      const data = await getResourcesList({ type });
      if (!data?.landing?.seo) return fallback;
      return getSeoMetadata(data.landing.seo);
    }

    const legalPage = await getPrivacyTermPage(type);
    if (!legalPage?.seo) return fallback;

    return getSeoMetadata(legalPage.seo);
  } catch (e) {
    console.error(`Seo error on slug(metadata):`, e);
    return fallback;
  }
}

export default async function DynamicTypePage() {
  return <></>;
}
