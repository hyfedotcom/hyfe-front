import { fetchPage } from "./fetchPage";
import { hydratePageSections } from "./hydratePageSections";

export async function getPage({ type, slug }: { type?: string; slug: string }) {
  const page = await fetchPage({ type, slug });
  if (!page?.sections?.length) return page;

  const sections = await hydratePageSections(page.sections);
  return { ...page, sections };
}
