import { NavItem } from "../type/header.type";

export const headerNav: NavItem[] = [
  {
    id: "product",
    label: "Product",
    kind: "card",
    items: [
      {
        id: "prod-a",
        label: "CoughMonitor",
        description: "Short description about Product A.",
        href: "https://coughmonitor.com",
        image: {
          url: "/header/cm.png",
        },
        external: true,
      },
      {
        id: "prod-b",
        label: "Resolve DTx",
        description: "Short description about Product B.",
        href: "https://resolvedtx.com",
        image: {
          url: "/header/resolve.png",
        },
        external: true,
      },
      {
        id: "prod-c",
        label: "Product C",
        description: "Short description about Product C.",
        href: "https://coughpro.com",
        image: {
          url: "/header/coughpro.png",
        },
        external: true,
      },
    ],
  },

  {
    id: "solutions",
    label: "Solutions",
    kind: "dropdown",
    items: [
      {
        id: "sol-1",
        label: "Life Sciences",
        description: "Objective cough data for clinical development",
        href: "/solutions/life-science",
      },
      {
        id: "sol-2",
        label: "Research",
        description: "Measure cough objectively, over time",
        href: "/solutions/research",
      },
      {
        id: "sol-3",
        label: "Virtual Care",
        description: "Actionable cough insights for everyday care.",
        href: "/solutions/virtual-care",
      },
    ],
  },

  {
    id: "resources",
    label: "Resources",
    kind: "mega",
    sections: [
      {
        id: "science",
        title: "Scientific resources",
        description: "Evidence, research, and clinical insights.",
        allHref: "/science-resources",
        items: [
          {
            id: "cough-news",
            label: "Cough News",
            description: "Curated cough-related news feed.",
            href: "/cough-news",
          },
          {
            id: "publications",
            label: "Publications",
            description: "Peer-reviewed research and papers.",
            href: "/publications",
          },
          {
            id: "whitepapers",
            label: "White Papers",
            description: "Deep dives and technical briefs.",
            href: "/white-papers",
          },
        ],
      },
      {
        id: "company",
        title: "Company resources",
        description: "Updates, announcements, and FAQs.",
        allHref: "/company-resources",
        items: [
          {
            id: "insights",
            label: "Insights",
            description: "Expert commentary and explainers.",
            href: "/insights",
          },
          {
            id: "news",
            label: "News",
            description: "Company announcements and updates.",
            href: "/news",
          },

          {
            id: "faq",
            label: "FAQ",
            description: "Fast answers to common questions.",
            href: "/faq",
          },
        ],
      },
    ],
    quickLinks: [
      {
        id: "help-center",
        label: "Help Center",
        description: "Guides, troubleshooting, contact support.",
        href: "/help",
      },
      {
        id: "careers",
        label: "Careers",
        description: "Open roles and how we work.",
        href: "/careers",
      },
    ],
  },

  {
    id: "company",
    label: "Company",
    kind: "dropdown",

    items: [
      {
        id: "about",
        label: "About",
        description: "Our mission, values, and story",
        href: "/about",
      },
      {
        id: "careers",
        label: "Careers",
        description: "Open roles and opportunities",
        href: "/careers",
      },
      {
        id: "tean",
        label: "Team",
        description: "The people building Hyfe",
        href: "/team",
      },
      {
        id: "advisors",
        label: "Advisors",
        description: "Scientific, clinical, and industry advisors",
        href: "/advisors",
      },
    ],
  },

  {
    id: "cta",
    label: "Request demo",
    kind: "cta",
    href: "https://community.hyfe.health/meetings/mindaugas-galvosas/talk-with-a-coughmonitor-suite-expert?uuid=ce645e69-712d-4e43-a8ca-9fdfa3bf2725",
    external: true,
  },
];
