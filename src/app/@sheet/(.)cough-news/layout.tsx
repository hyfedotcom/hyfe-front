import { Sheet } from "@/components/layouts/sheet/Sheet";
import { SheetNewsTimelineContainer } from "@/components/ui/timeline/SheetNewsTimelineContainer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Sheet ariaLabel="Cough news details">
    <SheetNewsTimelineContainer>{children}</SheetNewsTimelineContainer>
  </Sheet>
}
