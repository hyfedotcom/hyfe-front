import { cx, NavLink } from "@/features/header/helpers/header.helpers";
import { BaseLink, MegaSection } from "@/features/header/type/header.type";
import QuestionIcon from "@/shared/icons/company/QuestionIcon";
import CoughNewsIcon from "@/shared/icons/resources/CoughNewsIcon";
import InsightsIcon from "@/shared/icons/resources/InsightsIcon";
import NewsIcon from "@/shared/icons/resources/NewsIcon";
import PublicationIcon from "@/shared/icons/resources/PublicationIcon";
import WhitePapersIcon from "@/shared/icons/resources/WhitePapersIcon";
import { LinkIndicator } from "@/components/ui/buttons/LinkIndicator";

const META_BY_ID = {
  news: { Icon: NewsIcon },
  publications: { Icon: PublicationIcon },
  insights: { Icon: InsightsIcon },
  "cough-news": { Icon: CoughNewsIcon },
  whitepapers: { Icon: WhitePapersIcon },
  "white-papers": { Icon: WhitePapersIcon },
  faq: { Icon: QuestionIcon },
} as const;

const META_BY_LABEL = {
  News: { Icon: NewsIcon },
  Publications: { Icon: PublicationIcon },
  Insights: { Icon: InsightsIcon },
  "Cough News": { Icon: CoughNewsIcon },
  "Cough Science News": { Icon: CoughNewsIcon },
  "White Papers": { Icon: WhitePapersIcon },
  FAQ: { Icon: QuestionIcon },
} as const;

export function MegaPanel({
  sections,
  quickLinks,
  close,
}: {
  sections: MegaSection[];
  quickLinks?: BaseLink[];
  close: () => void;
}) {
  return (
    <div
      className={cx(
        "absolute mx-auto -translate-x-1/2 left-1/2 top-full mt-3 w-[700px] max-w-[calc(100vw-32px)]",
        "rounded-[28px] bg-white shadow-xl ring-1 ring-black/10 overflow-hidden",
      )}
    >
      <div className="grid grid-cols-8">
        <div
          className={cx(
            "col-span-8 p-6",
            quickLinks ? "border-r border-black/10" : "",
          )}
        >
          <div className="grid grid-cols-2 gap-6">
            {sections.map((sec) => (
              <div key={sec.id} className="min-w-0">
                <div className="mb-3">
                  <div className="text-sm font-semibold text-black">
                    {sec.title}
                  </div>
                  {sec.description && (
                    <div className="text-xs text-black/55">
                      {sec.description}
                    </div>
                  )}
                </div>

                {sec.allHref && (
                  <NavLink
                    href={sec.allHref}
                    onClick={close}
                    className={cx(
                      "mb-3 inline-flex items-center gap-3 rounded-full px-3 py-1.5 text-xs group",
                      "bg-black/5 hover:bg-black/10 text-black/80",
                    )}
                  >
                    View all
                    <LinkIndicator
                      href={sec.allHref}
                      className="text-black/70 opacity-100 transition-opacity duration-200 group-hover:opacity-100"
                      internalClassName="w-2 h-3"
                      externalClassName="w-3.5 h-3.5"
                    />
                  </NavLink>
                )}

                <div className="space-y-1">
                  {sec.items.map((it) => {
                    const Icon =
                      META_BY_ID[it.id as keyof typeof META_BY_ID]?.Icon ??
                      META_BY_LABEL[it.label as keyof typeof META_BY_LABEL]?.Icon;
                    return (
                      <NavLink
                        key={it.id}
                        href={it.href}
                        onClick={close}
                        className={cx(
                          "relative block rounded-[18px] px-3 py-2 group hover:bg-black/5",
                        )}
                      >
                        <div className="flex items-start gap-3 w-full pr-8">
                          {Icon && (
                            <Icon className="text-primary min-w-7 min-h-7" />
                          )}
                          <div className="min-w-0 grow">
                            <div className="flex items-center gap-2">
                              <div className="font-medium text-sm text-black">
                                {it.label}
                              </div>
                            </div>
                            {it.description && (
                              <div className="text-xs text-black/55 leading-relaxed">
                                {it.description}
                              </div>
                            )}
                          </div>
                          <LinkIndicator
                            href={it.href}
                            className="text-black/65 opacity-0 transition-opacity duration-200 group-hover:opacity-100 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            internalClassName="w-2 h-4"
                            externalClassName="w-4 h-4"
                          />
                        </div>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
