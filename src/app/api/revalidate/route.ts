import { NextResponse } from "next/server";
import { serverEnv } from "@/core/env.server";
import { revalidatePath, revalidateTag } from "next/cache";

const RESOURCE_UID_TO_ITEMS_TYPE: Record<string, string> = {
  "api::news-item.news-item": "news-items",
  "api::insight.insight": "insights",
  "api::cough-news-item.cough-news-item": "cough-news-items",
  "api::publication.publication": "publications",
  "api::white-paper.white-paper": "white-papers",
};

const RESOURCE_MODEL_TO_ITEMS_TYPE: Record<string, string> = {
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

const RESOURCE_ROUTE_TYPE_BY_MODEL: Record<string, string> = {
  "news-landing": "news",
  "cough-news-landing": "cough-news",
  "insights-landing": "insights",
  "publications-landing": "publications",
  "white-papers-landing": "white-papers",
};

const PAGE_REVALIDATE_BY_UID: Record<string, { tag: string; path: string }> = {
  "api::home.home": { tag: "home", path: "/" },
  "api::science-and-research-resource.science-and-research-resource": {
    tag: "science-and-research-resource",
    path: "/science-resources",
  },
  "api::company-resource.company-resource": {
    tag: "company-resource",
    path: "/company-resources",
  },
};

const PAGE_REVALIDATE_BY_MODEL: Record<string, { tag: string; path: string }> = {
  home: { tag: "home", path: "/" },
  "science-and-research-resource": {
    tag: "science-and-research-resource",
    path: "/science-resources",
  },
  "company-resource": {
    tag: "company-resource",
    path: "/company-resources",
  },
};

function resolveResourceItemsTypeFromRouteType(routeType: string) {
  if (routeType === "news") return "news-items";
  if (routeType === "cough-news") return "cough-news-items";
  return routeType;
}

function resolveRouteTypeFromResourceItemsType(itemsType: string) {
  if (itemsType === "news-items") return "news";
  if (itemsType === "cough-news-items") return "cough-news";
  return itemsType;
}

function revalidateSlugCollections(collections: string[]) {
  revalidateTag("team:slugs", "max"); // legacy broad tag
  for (const collection of collections) {
    revalidateTag(`slugs:${collection}`, "max");
  }
  revalidatePath("/sitemap.xml");
}

function getWebhookSlug(body: unknown) {
  if (!body || typeof body !== "object") return undefined;
  const entry = (body as { entry?: unknown }).entry;
  if (entry && typeof entry === "object" && "slug" in entry) {
    const slug = (entry as { slug?: unknown }).slug;
    if (typeof slug === "string") return slug;
  }
  const rootSlug = (body as { slug?: unknown }).slug;
  return typeof rootSlug === "string" ? rootSlug : undefined;
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (secret !== serverEnv.STRAPI_REVALIDATE_TOKEN) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const model = typeof body?.model === "string" ? body.model : "";
    const uid = typeof body?.uid === "string" ? body.uid : "";
    const slug = getWebhookSlug(body);

    console.log("Revalidate webhook:", { model, uid, slug });

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
      revalidateTag("careers:vacancies:all", "max");

      if (slug) {
        revalidateTag(`vacancy:${slug}`, "max");
        revalidateTag(`careers:vacancy:${slug}`, "max"); // legacy fallback
        revalidatePath(`/careers/${slug}`);
      }

      revalidatePath("/careers");
      revalidateSlugCollections(["vacancies-items"]);
      return NextResponse.json({ ok: true, kind: "vacancy", slug });
    }

    // 2.0 TEAM LANDING
    if (uid === "api::team-landing.team-landing" || model === "team-landing") {
      revalidateTag("team:landing", "max");
      revalidateTag("team:members:list", "max");
      revalidatePath("/team");
      return NextResponse.json({ ok: true, kind: "team-landing" });
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

      revalidatePath("/team");
      revalidateSlugCollections(["teams"]);
      return NextResponse.json({ ok: true, kind: "team-member", slug });
    }

    // 2.2 ADVISORS LANDING
    if (
      uid === "api::advisors-landing.advisors-landing" ||
      model === "advisors-landing"
    ) {
      revalidateTag("team:landing", "max");
      revalidateTag("team:members:list", "max");
      revalidatePath("/advisors");
      return NextResponse.json({ ok: true, kind: "advisors-landing" });
    }

    // 2.3 ADVISOR ITEM
    if (uid === "api::advisor.advisor" || model === "advisor") {
      revalidateTag("team:members:list", "max");
      revalidateTag("team:landing", "max");
      revalidateTag("team:members:all", "max");

      if (slug) {
        revalidateTag(`member:${slug}`, "max");
        revalidatePath(`/advisors/${slug}`);
      }

      revalidatePath("/advisors");
      revalidateSlugCollections(["advisors"]);
      return NextResponse.json({ ok: true, kind: "advisor", slug });
    }

    // 2.4 TEAM GROUP
    if (uid === "api::team-group.team-group" || model === "team-group") {
      revalidateTag("team:landing", "max");
      revalidateTag("team:members:list", "max");
      revalidateTag("team:members:all", "max");
      revalidatePath("/team");
      return NextResponse.json({ ok: true, kind: "team-group" });
    }

    // 2.5 PRIVACY / TERMS ITEMS
    if (
      uid === "api::privacy-term-item.privacy-term-item" ||
      model === "privacy-term-item"
    ) {
      revalidateTag("privacy-term:all", "max");
      if (slug) {
        revalidateTag(`privacy-term:${slug}`, "max");
        revalidatePath(`/${slug}`);
      }
      revalidateSlugCollections(["privacy-term-items"]);
      return NextResponse.json({ ok: true, kind: "privacy-term-item", slug });
    }

    // 3.0 RESOURCE ITEM (news/publication/insight/...)
    const resourceItemsType =
      (uid && RESOURCE_UID_TO_ITEMS_TYPE[uid]) || RESOURCE_MODEL_TO_ITEMS_TYPE[model];

    if (resourceItemsType) {
      const routeType = resolveRouteTypeFromResourceItemsType(resourceItemsType);

      if (slug) {
        revalidateTag(`resource:${resourceItemsType}-${slug}`, "max");
        revalidatePath(`/${routeType}/${slug}`);
      }

      revalidateTag(`resource:${resourceItemsType}-list`, "max");
      revalidateTag(`resource:${resourceItemsType}-slugs`, "max");
      revalidatePath(`/${routeType}`);

      return NextResponse.json({
        ok: true,
        kind: "resource-item",
        uid,
        model,
        resourceItemsType,
        slug,
      });
    }

    // 3.1 RESOURCE LANDING (news-landing/cough-news-landing/...)
    const routeType =
      RESOURCE_ROUTE_TYPE_BY_UID[uid] || RESOURCE_ROUTE_TYPE_BY_MODEL[model];

    if (routeType) {
      const itemsType = resolveResourceItemsTypeFromRouteType(routeType);
      revalidateTag(`resource:${routeType}-landing`, "max");
      revalidateTag(`resource:${itemsType}-list`, "max");
      revalidateTag(`resource:${itemsType}-slugs`, "max");
      revalidatePath(`/${routeType}`);
      return NextResponse.json({ ok: true, kind: "resource-landing", routeType });
    }

    // 4.0 FAQ LANDING
    if (uid === "api::faq-landing.faq-landing" || model === "faq-landing") {
      revalidateTag("faq:faq-landing", "max");
      revalidatePath("/faq");
      return NextResponse.json({ ok: true, kind: "faq-landing" });
    }

    // 4.1 FAQ ITEM
    if (uid === "api::faq.faq" || model === "faq") {
      revalidateTag("faq:faq-list", "max");
      revalidatePath("/faq");
      return NextResponse.json({ ok: true, kind: "faq-item" });
    }

    // 4.2 FAQ GROUP
    if (uid === "api::faq-group.faq-group" || model === "faq-group") {
      revalidateTag("faq:faq-landing", "max");
      revalidateTag("faq:faq-list", "max");
      revalidatePath("/faq");
      return NextResponse.json({ ok: true, kind: "faq-group" });
    }

    // 5.0 SOLUTION PAGES
    if (uid === "api::solution.solution" || model === "solution") {
      if (slug) {
        revalidateTag(`solution:${slug}`, "max");
        revalidatePath(`/solutions/${slug}`);
      }
      revalidateSlugCollections(["solutions"]);
      return NextResponse.json({ ok: true, kind: "solution", slug });
    }

    // 6.0 PAGE BUILDER TAGS (home + resource feed pages)
    const pageConfig = PAGE_REVALIDATE_BY_UID[uid] || PAGE_REVALIDATE_BY_MODEL[model];
    if (pageConfig) {
      revalidateTag(`page:${pageConfig.tag}`, "max");
      revalidatePath(pageConfig.path);
      return NextResponse.json({ ok: true, kind: "page", ...pageConfig });
    }

    // fallback for unknown models with slug-based page tag
    if (slug) {
      revalidateTag(`page:${slug}`, "max");
      return NextResponse.json({ ok: true, kind: "fallback-page-tag", slug });
    }

    return NextResponse.json({ message: "Unhandled model", model, uid, slug });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Revalidate failed" }, { status: 500 });
  }
}
