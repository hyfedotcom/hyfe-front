import { ResourcesBreadcrumbs } from "../navigation/ResourcesBreadcrumbs";

type Stats = {
  label: string;
  value: string;
};

type Props = {
  title: string;
  paragraph?: string | null;
  stats?: Stats[] | undefined;
};

type HeroMode = "full" | "compact";
type HeadingTag = "h1" | "h2";

export function ResourcesListHero({
  data,
  mode = "full",
  headingTag = "h1",
}: {
  data: Props;
  mode?: HeroMode;
  headingTag?: HeadingTag;
}) {
  const { paragraph, title, stats } = data;
  const statsList = (stats ?? []).filter((item): item is Stats =>
    Boolean(item?.label && item?.value),
  );
  const isCompact = mode === "compact";
  const Heading = headingTag;

  const headingClass =
    "text-balance text-[32px]! md:text-[42px]! lg:text-[52px]! xl:text-[60px]! 2xl:text-[60px]! leading-[126%]! font-semibold! text-heading!";

  return (
    <section
      className={`px-4 md:px-10 xl:px-20  pt-25 md:pt-40 lg:pt-[200px] space-y-6 md:space-y-8 `}
    >
      <ResourcesBreadcrumbs />
      <div className={`space-y-3 md:space-y-4 max-w-[980px]`}>
        <Heading className={`${headingClass} еext-balance`}>{title}</Heading>
        {paragraph && (
          <p
            className="body-medium text-balance"
          >
            {paragraph}
          </p>
        )}
      </div>
      {statsList.length > 0 && (
        <section aria-label="Resource stats" className="max-w-[1140px]">
          <div className="rounded-[30px]">
            <ul className="relative z-10 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {statsList.map((item, index) => (
                <li
                  key={`${item.label}-${item.value}-${index}`}
                  className="resources-glass-surface  shadow-active! rounded-[22px] px-4 py-4 md:px-6 md:py-6  bg-gradient-to-b from-white via-white to-primary-100/40"
                >
                  <p className="text-[30px] md:text-[42px] leading-[1.05] font-semibold text-black">
                    {item.value}
                  </p>
                  <p className=" mt-1 sm:mt-2 body-small text-body-secondary!">
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </section>
  );
}
