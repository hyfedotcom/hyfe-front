import { NextResponse } from "next/server";
import { serverEnv } from "@/core/env.server";
import { revalidatePath, revalidateTag } from "next/cache";

const RESOURCE_UID_MAP: Record<string, string> = {
  "api::news-item.news-item": "news-items",
  "api::insight.insight": "insights",
  "api::cough-news-item.cough-news-item": "cough-news-items",
  "api::publication.publication": "publications",
  "api::white-paper.white-paper": "white-papers",
};

const RESOURCE_MODEL_MAP: Record<string, string> = {
  "news-item": "news-items",
  insight: "insights",
  "cough-news-item": "cough-news-items",
  publication: "publications",
  "white-paper": "white-papers",
};

const RESOURCE_ROUTE_TYPE_BY_UID: Record<string, string> = {
  "api::news-landing.news-landing": "news",
  "api::cough-news-landing.cough-news-landing": "cough-news",
  "api::insights-landing.insights-landing": "insights",
  "api::publications-landing.publications-landing": "publications",
  "api::white-papers-landing.white-papers-landing": "white-papers",
};

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (secret !== serverEnv.STRAPI_REVALIDATE_TOKEN) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const model = body.model;

    const entry = body.entry;
    const uid = body.uid;
    const slug = typeof entry?.slug === "string" ? entry.slug : body?.slug;

    console.log(
      "Upcoming webbhook",
      body,
      "model:" + model,
      "slug" + slug,
      "entry:" + entry,
    );

    // 1.0 CAREERS LANDING
    if (
      uid === "api::careers-landing.careers-landing" ||
      model === "careers-landing"
    ) {
      revalidateTag("careers:landing", "max");
      revalidateTag("careers:vacancies:list", "max");
      revalidatePath("/careers");
      return NextResponse.json({ ok: true, kind: "careers-landing" });
    }

    // 1.1 VACANCIES
    if (
      uid === "api::vacancies-item.vacancies-item" ||
      model === "vacancies-item"
    ) {
      revalidateTag("careers:vacancies:list", "max");
      revalidateTag("careers:vacancies:all", "max"); // <- прибьёт все detail-страницы (вкл. старый slug)

      if (slug) {
        revalidateTag(`careers:vacancy:${slug}`, "max");
        revalidatePath(`/careers/${slug}`);
      }

      revalidatePath("/careers");
      return NextResponse.json({ ok: true, kind: "vacancy", slug });
    }

    // 2.0 TEAM LANDING
    if (uid === "api::team-landing.team-landing" || model === "team-landing") {
      revalidateTag("team:landing", "max");
      revalidateTag("team:members:list", "max");
      revalidatePath("/team");

      return NextResponse.json({ ok: true, lind: "team-landing" });
    }
    // 2.1 TEAM ITEM
    if (uid === "api::team.team" || model === "team") {
      revalidateTag("team:members:list", "max");
      revalidateTag("team:landing", "max");
      revalidateTag("team:members:all", "max");

      if (slug) {
        revalidateTag(`member:${slug}`, "max");
        revalidatePath(`/team/${slug}`);
      }

      return NextResponse.json({ ok: true, kind: "member", slug });
    }

    /// 2.2 TEAM GROUP
    if (uid === "api::team-group.team-group") {
      revalidateTag("team:landing", "max");
      revalidateTag("team:members:list", "max");
      revalidatePath("/team");
      revalidateTag("team:landing", "max");
      revalidateTag("team:members:all", "max");
    }

    // 3.0 RESOURCES
    const resourceModel =
      (uid && RESOURCE_UID_MAP[uid]) || RESOURCE_MODEL_MAP[model];

    if (resourceModel) {
      console.log(
        `🌍 Resource updated: ${uid ?? model}${slug ? ` | ${slug}` : ""}`,
      );

      if (slug) {
        revalidateTag(`resource:${resourceModel}-${slug}`, "max");
      }
      revalidateTag(`resource:${resourceModel}-list`, "max");

      return NextResponse.json({
        ok: true,
        kind: "resource",
        uid,
        model,
        resourceModel,
        slug,
      });
    }

    // 3.1 RESOURCE LANDING
    const routeType = RESOURCE_ROUTE_TYPE_BY_UID[uid];

    if (routeType) {
      revalidateTag(`resource:${routeType}-list`, "max");
      revalidateTag(`resource:${routeType}-landing`, "max"); // если ты так тегируешь detail
    }
    // 4.0 FAQ LANDING
    if (uid === "api::faq-landing.faq-landing") {
      revalidateTag("faq:faq-landing", "max");
    }
    /// 4.1 FAQ ITEM
    if (uid === "api::faq.faq") {
      revalidateTag("faq:faq-list", "max");
    }

    /// 4.2 FAQ GROUP
    if (uid === "api::faq-group.faq-group") {
      revalidateTag("faq:faq-landing", "max");
      revalidateTag("faq:faq-list", "max");
    }

    // 5.0 SOLUTION PAGES
    if (uid === "api::solution.solution") {
      revalidateTag(`solution:${slug}`, "max");
    }

    return NextResponse.json({ message: "Unhandled model", model });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json({ error: "Revalidate failde" }, { status: 500 });
  }
}
