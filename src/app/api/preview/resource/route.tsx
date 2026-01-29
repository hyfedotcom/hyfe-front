import { NextResponse } from "next/server";
import { serverEnv } from "@/core/env.server";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

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

  redirect(`/preview/${url}` || "/");
}
