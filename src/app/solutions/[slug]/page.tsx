import { PageBuilder } from "@/features/page-builder/data/components/PageBuilder";
import getSolutionPage from "@/features/solutions/api/getSolutionPage";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = false;

type Params = {
  slug: string;
};

export default async function SolutionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const page = await getSolutionPage({ slug });
  if (!page) return notFound();

  return <PageBuilder sections={page[0].sections}></PageBuilder>;
}
