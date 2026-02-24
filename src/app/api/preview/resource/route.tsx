import { NextResponse } from "next/server";
import { serverEnv } from "@/core/env.server";
import { draftMode } from "next/headers";

const INTERNAL_PREVIEW_BASE = "https://preview.internal";

function getSafePreviewPath(rawUrl: string | null): string {
  const candidate = rawUrl?.trim();

  if (!candidate || candidate.startsWith("//")) {
    return "/";
  }

  let parsed: URL;
  try {
    parsed = new URL(candidate, INTERNAL_PREVIEW_BASE);
  } catch {
    return "/";
  }

  if (parsed.origin !== INTERNAL_PREVIEW_BASE) {
    return "/";
  }

  const pathname = parsed.pathname.replace(/\/{2,}/g, "/");
  const pathWithQueryAndHash = `${pathname}${parsed.search}${parsed.hash}`;

  if (pathWithQueryAndHash === "/" || pathWithQueryAndHash === "") {
    return "/";
  }

  if (
    pathWithQueryAndHash === "/preview" ||
    pathWithQueryAndHash.startsWith("/preview/")
  ) {
    return pathWithQueryAndHash;
  }

  return `/preview${pathWithQueryAndHash}`;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const secret = searchParams.get("secret");
  const url = searchParams.get("url");
  const status = searchParams.get("status");

  if (secret !== serverEnv.PREVIEW_SECRET) {
    return NextResponse.json({ error: "invalid token" }, { status: 401 });
  }

  if (status === "published") {
    (await draftMode()).disable();
  } else {
    (await draftMode()).enable();
  }

  const destination = getSafePreviewPath(url);
  return NextResponse.redirect(new URL(destination, req.url));
}
