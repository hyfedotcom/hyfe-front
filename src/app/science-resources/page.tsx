
import { ResourcesListHero } from "@/features/resources/client";
import { ResourceButton } from "@/app/(resources)/components/ui/ResourceButton";
import { notFound } from "next/navigation";
import { getPageResource } from "@/features/resources/data/api/getResourceFeedPage";
import { PageBuilder } from "@/features/page-builder/data/components/PageBuilder";

export const dynamic = "force-static";
export const revalidate = false;

export default async function ScienceResources() {
  const data = await getPageResource({ slug: "science-and-research-resource" });

  if (!data) return notFound();
  const resourceTypes: Array<"publications" | "white-papers" | "cough-news"> = [
    "publications",
    "white-papers",
    "cough-news",
  ];
  return (
    <div className="">
      <div className="overflow-hidden w-screen absolute h-screen top-0  -z-1">
        <div className="w-[1910px] h-[1910px] bg-[linear-gradient(180deg,#FF9D00_0%,#FFAE00_63%,#FFC800_30%,#FFCE1D_80%,#FFFFFF_10%)] rounded-full absolute -translate-y-[60%] -translate-x-1/2 left-1/2 blur-[200px]"></div>
      </div>{" "}
      <ResourcesListHero
        type={"science-resources"}
        data={{
          title: data.title ?? "Resources",
          paragraph: data.paragraph,
        }}
      />
      <div>
        <div className="flex mt-10 flex-col-reverse  gap-5 md:flex-row w-full justify-between py-5 px-4 md:px-10 lg:px-20 sticky top-0 bg-white/20 border-b-2 border-[#EEEEEE]/40 backdrop-blur-[40px]">
          <div className="flex gap-3 w-full overflow-x-scroll">
            {resourceTypes.map((t) => (
              <ResourceButton
                key={t}
                label={t}
                url={`#${t}`}
                active
                tag="Link"
                classNameProp="bg-white! rounded-full border-border border-1"
              />
            ))}
          </div>

          <div className="relative flex rounded-full overflow-hidden border-border border-[1.5px]">
            {/* icon */}
            <svg
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black/40"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M21 21l-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            {/* <input
              type="search"
              className={`${
                search.length > 0 ? "bg-primary-200" : "bg-bg-150"
              } h-max rounded-full
                      w-full  px-4 py-3 pl-12
                      text-black body-small leading-[100%]!
                      placeholder:text-black/40 placeholder:body-small placeholder:leading-[100%]!
                      focus:outline-primary
                    `}
              value={search}
              onChange={(t) => setSearch(t.target.value)}
              placeholder="Search"
            /> */}
          </div>
        </div>
        <PageBuilder sections={data?.sections} />
      </div>
    </div>
  );
}
