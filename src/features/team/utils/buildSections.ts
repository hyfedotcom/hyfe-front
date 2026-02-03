import { MemberType } from "../schema/team.schema";

export function buildSections({
  groupOrder,
  items,
  fallbackGroup = "Other",
}: {
  fallbackGroup?: string;
  groupOrder: string[];
  items: MemberType[];
}) {
  const map = new Map<string, MemberType[]>();
  const order = [...groupOrder];
  for (const item of items) {
    const key = item.team_group?.name_group ?? fallbackGroup;
    const arr = map.get(key) ?? [];
    arr.push(item);
    map.set(key, arr);
  }

  for (const key of map.keys()) {
    if (key === fallbackGroup) continue;
    if (!order.includes(key)) order.push(key);
  }

  const otherMember = map.get(fallbackGroup);
  if (otherMember?.length && !order.includes(fallbackGroup))
    order.push(fallbackGroup);

  const sections = order.map((item) => ({
    title: item,
    members: map.get(item) ?? [],
  }));

  return sections.filter((s) => s.members.length > 0);
}
