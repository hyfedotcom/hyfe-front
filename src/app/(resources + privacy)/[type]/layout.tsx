import { isResourceType } from "@/features/resources/data/api/resourceType";
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

  if (isResourceType(type)) {
    return (
      <>
        <ResourceTypePage type={type} />
        {children}
      </>
    );
  }

  return <LegalLayout type={type} />;
}
