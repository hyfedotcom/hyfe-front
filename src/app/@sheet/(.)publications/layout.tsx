import { Sheet } from "@/components/layouts/sheet/Sheet";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sheet ariaLabel="Publication details">{children}</Sheet>;
}
