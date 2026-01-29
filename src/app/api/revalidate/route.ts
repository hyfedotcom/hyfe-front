import { NextResponse } from "next/server";
import { serverEnv } from "@/core/env.server";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (secret !== serverEnv.STRAPI_REVALIDATE_TOKEN) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const model = body.model;
    const slug = body.slug;
    const entry = body.entry;
    console.log(model);
    let newModel;

    if (
      model === "news-item" ||
      model === "insight" ||
      model === "white-paper" ||
      model === "publication" ||
      model === "cough-news-item"
    ) {
      console.log(`🌍 News-item ipdated: ${entry.slug}`);
      if (model === "news-item") {
        newModel = "news-items";
      } else if (model === "insight") {
        newModel = "insights";
      } else if (model === "cough-news-item") {
        newModel = "cough-news-items";
      } else if (model === "publication") {
        newModel = "publications";
      } else if (model === "white-paper") {
        newModel = "white-papers";
      }

      revalidateTag(`resource:${newModel}-${entry.slug}`, "max");
      revalidateTag(`resource:${newModel}-list`, "max");
      return NextResponse.json({ type: "news-item" });
    }
    if (entry.type === "resource-landing") {
      revalidateTag(`page:${model}`, "max");
      return NextResponse.json({ type: "landing" });
    }
    if (entry.type === "home") {
      revalidateTag(`page:home`, "max");
      return NextResponse.json({ type: "home" });
    } else {
      revalidateTag(`page:${model || slug}`, "max");
      return NextResponse.json({ type: "page" });
    }

    // console.log(
    //   "Upcoming webbhook",
    //   body,
    //   "model:" + model,
    //   "slug" + slug,
    //   "entry:" + entry,
    // );

    return NextResponse.json({ message: "Unhandled model", model });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json({ error: "Revalidate failde" }, { status: 500 });
  }
}
