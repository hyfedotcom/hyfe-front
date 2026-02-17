import getAbout from "@/features/about/api/getAbout";
import { PageBuilder } from "@/features/page-builder/data/components/PageBuilder";
import { notFound } from "next/navigation";

export default async function About() {
  const about = await getAbout();
  if (!about.sections) return notFound();

  return (
    <>
      <PageBuilder sections={about.sections} />
    </>
  );
}
