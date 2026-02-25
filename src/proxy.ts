import { NextRequest, NextResponse } from "next/server";

const RESOURCE_TYPES = new Set([
  "publications",
  "insights",
  "white-papers",
  "news",
  "cough-news",
]);

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const pageParamRaw = searchParams.get("page");
  const pageParam = Number(pageParamRaw);
  const hasPageQuery = pageParamRaw !== null;
  const hasValidPageQuery = Number.isFinite(pageParam) && pageParam > 1;

  const isResourceList = segments.length === 1 && RESOURCE_TYPES.has(segments[0]);
  const isResourceDetail =
    segments.length === 2 && RESOURCE_TYPES.has(segments[0]);

  if (isResourceList && hasPageQuery) {
    const redirectUrl = request.nextUrl.clone();

    if (!hasValidPageQuery) {
      redirectUrl.searchParams.delete("page");
      return NextResponse.redirect(redirectUrl, 308);
    }
  }

  if (isResourceDetail && hasPageQuery) {
    if (!hasValidPageQuery) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.searchParams.delete("page");
      return NextResponse.redirect(redirectUrl, 308);
    }

    const secFetchSite = request.headers.get("sec-fetch-site");
    const hasInternalFetchMetadata =
      secFetchSite === "same-origin" || secFetchSite === "same-site";

    const referer = request.headers.get("referer");
    const hasInternalReferer = (() => {
      if (!referer) return false;
      try {
        const refererUrl = new URL(referer);
        return refererUrl.origin === request.nextUrl.origin;
      } catch {
        return false;
      }
    })();

    // Accept only internal navigations; external/shared URLs are canonicalized.
    if (!hasInternalFetchMetadata && !hasInternalReferer) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.searchParams.delete("page");
      return NextResponse.redirect(redirectUrl, 308);
    }
  }

  const response = NextResponse.next();

  if (isResourceList && hasPageQuery && hasValidPageQuery) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }

  if (isResourceDetail && hasPageQuery) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }

  return response;
}

export const config = {
  matcher: [
    "/publications/:path*",
    "/insights/:path*",
    "/white-papers/:path*",
    "/news/:path*",
    "/cough-news/:path*",
  ],
};
