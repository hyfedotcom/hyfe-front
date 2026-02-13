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

export function ResourcesListHero({ data }: { data: Props }) {
  const { paragraph, title, stats } = data;
  const statsList = (stats ?? []).filter((item): item is Stats =>
    Boolean(item?.label && item?.value),
  );

  return (
    <main className="pt-25 md:pt-40 lg:pt-55 px-4 md:px-10 lg:px-20 space-y-6 md:space-y-8">
      <ResourcesBreadcrumbs />
      <div className="space-y-5 max-w-[980px]">
        <h1 className="text-balance">{title}</h1>
        {paragraph && <p className="body-medium text-balance">{paragraph}</p>}
      </div>
      {statsList.length > 0 && (
        <section aria-label="Resource stats" className="max-w-[1140px]">
          <div className="rounded-[30px]">
            <ul className="relative z-10 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {statsList.map((item, index) => (
                <li
                  key={`${item.label}-${item.value}-${index}`}
                  className="resources-glass-surface  shadow-active! rounded-[22px] px-5 py-5 md:px-6 md:py-6  bg-gradient-to-b from-white via-white to-primary-100/40"
                >
                  <p className="text-[30px] md:text-[42px] leading-[1.05] font-semibold text-black">
                    {item.value}
                  </p>
                  <p className="mt-2 body-small text-body-secondary!">
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
