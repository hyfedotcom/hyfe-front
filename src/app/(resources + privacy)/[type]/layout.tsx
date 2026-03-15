import { getIndexablePrivacyTermSlugs } from "@/features/privacy-terms";
import { isResourceType } from "@/features/resources/data/api/resourceType";
import { isValidCmsPathSegment } from "@/shared/utils/isValidCmsPathSegment";
import { notFound } from "next/navigation";
import ResourceTypePage from "../components/layout/ResourceTypePage";
import LegalLayout from "../components/legal/LegalLayout";

type Params = {
  type: string;
};

export default async function Layout({
  params,
  children,
}: {
  params: Promise<Params>;
  children: React.ReactNode;
}) {
  const { type } = await params;

  if (!isValidCmsPathSegment(type)) {
    notFound();
  }

  if (isResourceType(type)) {
    return (
      <>
        <ResourceTypePage type={type} />
        {children}
      </>
    );
  }

  const privacyTermSlugs = await getIndexablePrivacyTermSlugs();
  if (!privacyTermSlugs.includes(type)) {
    notFound();
  }

  return <LegalLayout type={type} />;
}
