import { getSeoMetadata } from "@/components/seo/getSeoMetaData";
import { getAdvisors } from "@/features/advisors/api/getAdvisors";
import { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = 86400;

export async function generateMetadata() {
  const fallback: Metadata = {
    title: "",
    description: "",
    robots: { index: false, follow: false },
  };

  const team = await getAdvisors();
  if (!team?.seo) return fallback;
  return getSeoMetadata(team.seo);
}

export default async function TeamPage() {
  return <></>;
}
