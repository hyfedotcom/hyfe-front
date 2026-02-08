import type { ResourceFeedSectionType } from "@/features/resources";
import type {
  ResourceFeedManySectionType,
  TabbedResourceFeedSectionType,
} from "../schema/pageBuilder";

export const isResourceFeed = (section: {
  type?: string;
}): section is ResourceFeedSectionType => section.type === "resource-feed";

export const isResourceFeedMany = (section: {
  type?: string;
}): section is ResourceFeedManySectionType =>
  section.type === "resource-feed-many";

export const isTabbedResourceFeed = (section: {
  type?: string;
}): section is TabbedResourceFeedSectionType =>
  section.type === "tabbed-resource-feed";
