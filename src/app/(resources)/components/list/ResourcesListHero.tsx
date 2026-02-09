import { ResourcesBreadcrumbs } from "../navigation/ResourcesBreadcrumbs";

type Props = {
  title: string;
  paragraph?: string | null;
};

export function ResourcesListHero({
  data,
  type,
}: {
  data: Props;
  type: string;
}) {
  const { paragraph, title } = data;
  

  return (
    <main className="pt-55 px-4 md:px-10 lg:px-20 space-y-11">
      <ResourcesBreadcrumbs />
      <div className="space-y-5 nax-w-[70%]">
        <h1 className="text-balance">{title}</h1>
        {paragraph && <p className="body-medium text-balance">{paragraph}</p>}
      </div>
    </main>
  );
}
