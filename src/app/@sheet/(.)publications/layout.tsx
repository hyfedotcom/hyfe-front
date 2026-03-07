import { Sheet } from "@/components/layouts/sheet/Sheet";
import { SheetNewsTimelineContainer } from "@/components/ui/timeline/SheetNewsTimelineContainer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Sheet ariaLabel="Publication details">
    <SheetNewsTimelineContainer>{children}</SheetNewsTimelineContainer>
  </Sheet>;
}
