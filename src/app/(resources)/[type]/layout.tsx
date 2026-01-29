export const dynamic = "force-static";
export const revalidate = false;

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
