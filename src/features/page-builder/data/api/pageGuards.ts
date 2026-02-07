import type { ResourceFeedSectionType } from "@/features/resources";
import type { ResourceFeedManySectionType } from "../schema/pageBuilder";

export const isResourceFeed = (section: {
  type?: string;
}): section is ResourceFeedSectionType => section.type === "resource-feed";

export const isResourceFeedMany = (section: {
  type?: string;
}): section is ResourceFeedManySectionType =>
  section.type === "resource-feed-many";
