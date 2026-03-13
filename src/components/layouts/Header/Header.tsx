import type { HeaderType } from "@/features/general/schema/domain";
import { HeaderBanner } from "./HeaderBanner";
import { HeaderClient } from "./HeaderClient";
import { buildHeaderNav } from "./headerNav.utils";

export function Header({
  topBannerHeight = 0,
  header,
}: {
  header: HeaderType;
  topBannerHeight?: number;
}) {
  const nav = buildHeaderNav(header);
  const hasTopBanner = header.header_banner.label.trim().length > 0;

  return (
    <>
      {hasTopBanner ? (
        <HeaderBanner
          label={header.header_banner.label}
          url={header.header_banner.url}
        />
      ) : null}
      <HeaderClient nav={nav} topBannerHeight={topBannerHeight} />
    </>
  );
}
