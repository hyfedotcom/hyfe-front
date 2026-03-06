import { ResourceTag } from "../ui/ResourceTag";

export function ResourceHeader({ tags, activ }: { tags: string[]; activ: string }) {
  return (
    <div className="sticky top-0">
      {tags.map((t, i) => (
        <ResourceTag key={i} tag={t}  />
      ))}
    </div>
  );
}
