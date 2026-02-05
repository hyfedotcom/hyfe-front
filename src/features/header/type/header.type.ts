type BaseLink = {
  id: string;
  label: string;
  description?: string;
  href: string;
  external?: boolean;
  image?: {
    url: string;
    alt?: string;
  };
};

type DropdownNavItem = {
  id: string;
  label: string;
  kind: "dropdown";
  items: BaseLink[];
};

type CardNavItem = {
  id: string;
  label: string;
  kind: "card";
  items: BaseLink[];
};

type MegaSection = {
  id: string;
  title: string;
  description?: string;
  allHref?: string; // "All Science Resources"
  items: BaseLink[];
};

type MegaNavItem = {
  id: string;
  label: string;
  kind: "mega";
  sections: MegaSection[];
  quickLinks?: BaseLink[];
};

type SimpleNavItem = {
  id: string;
  label: string;
  kind: "link";
  href: string;
  external?: boolean;
};

type CtaNavItem = {
  id: string;
  label: string;
  kind: "cta";
  href: string;
  external?: boolean;
};

type NavItem =
  | DropdownNavItem
  | MegaNavItem
  | SimpleNavItem
  | CtaNavItem
  | CardNavItem;
