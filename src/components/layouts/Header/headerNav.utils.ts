import { headerNav } from "@/features/header/data/header.data";
import type { HeaderType } from "@/features/general/schema/domain";
import type { BaseLink, NavItem } from "@/features/header/type/header.type";

function toNavLink(
  raw: {
    label: string;
    url: string;
    description?: string;
    icon?: { url: string; alt?: string };
    image?: { url: string; alt?: string };
  },
  id: string,
): BaseLink {
  return {
    id,
    label: raw.label,
    href: raw.url,
    description: raw.description,
    icon: raw.icon,
    image: raw.image,
  };
}

export function buildHeaderNav(header: HeaderType): NavItem[] {
  const nav: NavItem[] = [];

  if ((header.product_items?.length ?? 0) > 0) {
    nav.push({
      id: "product",
      label: "Products",
      kind: "card",
      items: header.product_items.map((item, idx) =>
        toNavLink(item, `product-${idx}`),
      ),
    });
  }

  if ((header.solutions_items?.length ?? 0) > 0) {
    nav.push({
      id: "solutions",
      label: "Solutions",
      kind: "dropdown",
      items: header.solutions_items.map((item, idx) =>
        toNavLink(item, `solutions-${idx}`),
      ),
    });
  }

  if ((header.resource_sections?.length ?? 0) > 0) {
    nav.push({
      id: "resources",
      label: "Resources",
      kind: "mega",
      sections: header.resource_sections.map((section, sectionIdx) => ({
        id: `resources-section-${sectionIdx}`,
        title: section.title,
        description: section.description,
        allHref: section.all_url,
        items: section.items.map((item, idx) =>
          toNavLink(item, `resources-${sectionIdx}-${idx}`),
        ),
      })),
      quickLinks: (header.resource_quick_links ?? []).map((item, idx) =>
        toNavLink(item, `resources-quick-${idx}`),
      ),
    });
  }

  if ((header.company_items?.length ?? 0) > 0) {
    nav.push({
      id: "company",
      label: "Company",
      kind: "dropdown",
      items: header.company_items.map((item, idx) =>
        toNavLink(item, `company-${idx}`),
      ),
    });
  }

  if (header.cta?.label && header.cta.url) {
    nav.push({
      id: "cta",
      label: header.cta.label,
      kind: "cta",
      href: header.cta.url,
    });
  }

  return nav.length > 0 ? nav : headerNav;
}
