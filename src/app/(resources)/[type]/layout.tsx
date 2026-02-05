import ResourceTypePage from "../components/layout/ResourceTypePage";

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
      <ResourceTypePage type={type} />
      {children}
    </>
  );
}
