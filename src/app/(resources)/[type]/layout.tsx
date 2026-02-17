import { getPrivacyTermPage } from "@/features/privacy-terms";
import ResourceTypePage from "../components/layout/ResourceTypePage";
import { ResourceTypeScrollReset } from "../components/navigation/ResourceTypeScrollReset";
import { isResourceType } from "@/features/resources/data/api/resourceType";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  if (!isResourceType(type)) {
    return <>{children}</>;
  }

  return (
    <>
      <ResourceTypePage type={type} />
      {children}
    </>
  );
}
