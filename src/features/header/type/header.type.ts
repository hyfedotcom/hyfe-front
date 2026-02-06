export type BaseLink = {
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

export type DropdownNavItem = {
  id: string;
  label: string;
  kind: "dropdown";
  items: BaseLink[];
};

export type CardNavItem = {
  id: string;
  label: string;
  kind: "card";
  items: BaseLink[];
};

export type MegaSection = {
  id: string;
  title: string;
  description?: string;
  allHref?: string; 
  items: BaseLink[];
};

export type MegaNavItem = {
  id: string;
  label: string;
  kind: "mega";
  sections: MegaSection[];
  quickLinks?: BaseLink[];
};

export type SimpleNavItem = {
  id: string;
  label: string;
  kind: "link";
  href: string;
  external?: boolean;
};

export type CtaNavItem = {
  id: string;
  label: string;
  kind: "cta";
  href: string;
  external?: boolean;
};

export type NavItem =
  | DropdownNavItem
  | MegaNavItem
  | SimpleNavItem
  | CtaNavItem
  | CardNavItem;
