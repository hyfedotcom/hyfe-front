import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { getResourcesList } from "@/features/resources";
import { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = 86400;

type Params = { type: string };

export async function generateMetadata({ params }: { params: Params }) {
  const fallback: Metadata = {
    title: "",
    description: "",
    robots: { index: false, follow: false },
  };

  try {
    const { type } = await params;
    const data = await getResourcesList({ type });

    if (!data?.landing) {
      return fallback;
    }

    if (!data?.landing.seo) {
      return fallback;
    }
    return getSeoMetadata(data.landing.seo);
  } catch (e) {
    console.error(`Seo error on slug(metadata):`, e);
    return fallback;
  }
}

export default async function Recourcelist() {
  return <></>;
}
