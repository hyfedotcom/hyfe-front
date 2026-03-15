import type { PageBuilderRegistry } from "./pageBuilder.types";

export const resourcePagesBuilderRegistry: Partial<PageBuilderRegistry> = {
  "resource-feed": () =>
    import("./sections/resourceFeed/ResourceFeed").then((mod) => mod.ResourceFeed),
};
