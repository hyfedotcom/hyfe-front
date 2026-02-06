import { pageBuilderRegistry } from "./pageBuilder.registry";
import type {
  PageBuilderComponent,
  PageBuilderSection,
} from "./pageBuilder.types";

const NO_OVERFLOW_TYPES = new Set<PageBuilderSection["type"]>([
  "cards-grid",
  "feature-cards-right",
  "hero-stats",
]);

export function PageBuilder({ sections }: { sections?: PageBuilderSection[] }) {
  if (!sections?.length) return null;
  return (
    <>
      {sections.map((section, i) => {
        const Section = pageBuilderRegistry[section.type];
        if (!Section) return null;
        const TypedSection = Section as PageBuilderComponent<{
          section: typeof section;
        }>;
        const shouldRoundTop =
          (i > 0 && sections[i - 1]?.type === "hero") ||
          (i > 0 && sections[i - 1]?.type === "hero-stats");
        const shouldClip =
          shouldRoundTop && !NO_OVERFLOW_TYPES.has(section.type);
        const wrapperClass = shouldRoundTop
          ? ` shadow-[0_-25px_40px_rgba(0,0,0,0.08)] relative z-10 -mt-[40px] pt-[40px] bg-white rounded-t-[60px] ${
              shouldClip ? " overflow-hidden" : ""
            }`
          : undefined;

        if (!shouldRoundTop) {
          return <TypedSection key={i} section={section} />;
        }

        return (
          <div key={i} className={wrapperClass}>
            <TypedSection section={section} />
          </div>
        );
      })}
    </>
  );
}
