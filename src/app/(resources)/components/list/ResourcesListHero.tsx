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
      {/* <ResourcesBreadcrumbs type={type} /> */}
      <div className="space-y-5">
        <h1>{title}</h1>
        {paragraph && <p className="body-medium">{paragraph}</p>}
      </div>
    </main>
  );
}
