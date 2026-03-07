import { Sheet } from "@/components/layouts/sheet/Sheet";
import { SheetNewsTimelineContainer } from "@/components/ui/timeline/SheetNewsTimelineContainer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Sheet ariaLabel="White paper details">
      <SheetNewsTimelineContainer>{children}</SheetNewsTimelineContainer>
    </Sheet>
  );
}
