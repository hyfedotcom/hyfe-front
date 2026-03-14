import { FeedContainerLazy } from "./FeedContainerLazy";
import { FeedContainerStatic } from "./FeedContainerStatic";
import type {
  ResourceFeedMeta,
  ResourcesLists,
  ResourceTypes,
} from "./FeedContainer.shared";

export function FeedContainer({
  resources,
  type,
  meta,
}: {
  resources: ResourcesLists;
  type: ResourceTypes;
  meta?: ResourceFeedMeta;
}) {
  if (!resources.length) return null;

  return (
    <FeedContainerLazy
      resources={resources}
      type={type}
      meta={meta}
      fallback={<FeedContainerStatic resources={resources} type={type} meta={meta} />}
    />
  );
}
