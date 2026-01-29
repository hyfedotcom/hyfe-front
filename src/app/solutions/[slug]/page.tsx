import getSolutionPage from "@/features/solutions/api/getSolutionPage";

type Params = {
  slug: string;
};

export default async function SolutionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const page = await getSolutionPage({ slug });
  // console.log(page);
  return <div>page</div>;
}