import { getResourcesList } from "@/features/resources";

export default async function ResourceFetch({
  type,
  filterTag,
}: {
  type: string;
  filterTag?: string;
}) {
  const data = await getResourcesList({ type: type });
  if (!data) return [];

  const list = filterTag
    ? data.list?.filter((e) => e.tags.some((c) => c.tag === filterTag))
    : data?.list;

  return list;
}
