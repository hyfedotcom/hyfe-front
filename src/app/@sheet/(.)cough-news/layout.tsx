import { Sheet } from "@/components/layouts/sheet/Sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Sheet ariaLabel="Cough news details">{children}</Sheet>;
}
