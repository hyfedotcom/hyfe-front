import { LandingType, ResourceCardType } from "@/features/resources";
import { RecourcesListFull } from "./RecourcesListFull";
import { RecourcesListCompressed } from "./RecourcesListCompressed";
import { ResourcesListHero } from "../ResourcesListHero";

export function RecourcesListDispatcher({
  landing,
  list,
  type,
  tags,
  renderMode,
}: {
  landing: LandingType;
  list: ResourceCardType[];
  type: string;
  tags: string[];
  renderMode: "full" | "detail-canonical" | "detail-sheet";
}) {
  const shouldUseCompressedList = renderMode === "detail-canonical";
  const isDetailMode = renderMode !== "full";

  return (
    <div>
      <ResourcesListHero
        data={landing}
        mode={isDetailMode ? "compact" : "full"}
        headingTag={renderMode === "detail-sheet" ? "h2" : "h1"}
      />
      {!shouldUseCompressedList ? (
        <RecourcesListFull
          data={list}
          renderMode={renderMode}
          tags={tags}
          type={type}
        />
      ) : (
        <RecourcesListCompressed
          data={list}
          renderMode={renderMode}
          tags={tags}
          type={type}
        />
      )}
    </div>
  );
}
