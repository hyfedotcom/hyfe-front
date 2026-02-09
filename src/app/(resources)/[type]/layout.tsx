import ResourceTypePage from "../components/layout/ResourceTypePage";
import { ResourceTypeScrollReset } from "../components/navigation/ResourceTypeScrollReset";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  return (
    <>
      <ResourceTypeScrollReset />
      <ResourceTypePage type={type} />
      {children}
    </>
  );
}
