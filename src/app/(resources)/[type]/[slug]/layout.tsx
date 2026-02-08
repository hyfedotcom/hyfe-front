export const dynamic = "force-static";
export const revalidate = 86400;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
