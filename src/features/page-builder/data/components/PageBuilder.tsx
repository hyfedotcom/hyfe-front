import type {
  PageBuilderComponent,
  PageBuilderRegistry,
  PageBuilderSection,
} from "./pageBuilder.types";

const NO_OVERFLOW_TYPES = new Set<PageBuilderSection["type"]>([
  "cards-grid",
  "feature-cards-right",
  "hero-stats",
]);

export async function PageBuilder({
  registry,
  sections,
}: {
  registry: Partial<PageBuilderRegistry>;
  sections?: PageBuilderSection[];
}) {
  if (!sections?.length) return null;
  const lastSectionType = sections[sections.length - 1]?.type;
  const renderedSections = await Promise.all(
    sections.map(async (section, i) => {
      const loadSection = registry[section.type];
      if (!loadSection) return null;
      const Section = await loadSection();
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
    }),
  );

  return (
    <>
      {renderedSections}
      <span
        aria-hidden
        className="hidden"
        data-page-builder-last-section={lastSectionType}
      />
    </>
  );
}
