import { cx, NavLink } from "@/features/header/helpers/header.helpers";
import QuestionIcon from "@/shared/icons/company/QuestionIcon";
import CoughNewsIcon from "@/shared/icons/resources/CoughNewsIcon";
import InsightsIcon from "@/shared/icons/resources/InsightsIcon";
import NewsIcon from "@/shared/icons/resources/NewsIcon";
import PublicationIcon from "@/shared/icons/resources/PublicationIcon";
import WhitePapersIcon from "@/shared/icons/resources/WhitePapersIcon";

const META = {
  News: { label: "News", Icon: NewsIcon },
  Publications: {
    label: "Publications",
    Icon: PublicationIcon,
  },
  Insights: { label: "Insights", Icon: InsightsIcon },
  "Cough News": {
    label: "Cough News",
    Icon: CoughNewsIcon,
  },
  "White Papers": {
    label: "White Papers",
    Icon: WhitePapersIcon,
  },
  FAQ: { Icon: QuestionIcon },
} as const;

type MetaKey = keyof typeof META;

const isMetaKey = (label: string): label is MetaKey => label in META;

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
                      "mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs",
                      "bg-black/5 hover:bg-black/10 text-black/80",
                    )}
                  >
                    View all
                    <span className={` scale-55`}>
                      <svg
                        width="25"
                        height="15"
                        viewBox="0 0 25 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24.7071 8.07136C25.0976 7.68084 25.0976 7.04768 24.7071 6.65715L18.3431 0.29319C17.9526 -0.0973344 17.3195 -0.0973344 16.9289 0.29319C16.5384 0.683714 16.5384 1.31688 16.9289 1.7074L22.5858 7.36426L16.9289 13.0211C16.5384 13.4116 16.5384 14.0448 16.9289 14.4353C17.3195 14.8259 17.9526 14.8259 18.3431 14.4353L24.7071 8.07136ZM24 7.36426V6.36426H0V7.36426V8.36426H24V7.36426Z"
                          fill="#2E3542"
                        />
                      </svg>
                    </span>
                  </NavLink>
                )}

                <div className="space-y-1">
                  {sec.items.map((it) => {
                    const meta =
                      it.label && isMetaKey(it.label) ? META[it.label] : null;
                    const Icon = meta?.Icon;
                    return (
                      <NavLink
                        key={it.id}
                        href={it.href}
                        external={it.external}
                        onClick={close}
                        className={cx(
                          "block rounded-[18px] px-3 py-2 group hover:bg-black/5 relative flex items-center gap-3",
                        )}
                      >
                        {Icon && (
                          <Icon className="text-primary min-w-7 min-h-7" />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="font-medium text-sm text-black">
                              {it.label}
                            </div>
                            {it.external && (
                              <span className="text-black/40 text-xs">↗</span>
                            )}
                          </div>
                          {it.description && (
                            <div className="text-xs text-black/55 leading-relaxed">
                              {it.description}
                            </div>
                          )}
                        </div>
                        <span
                          className={`absolute opacity-0 group-hover:opacity-100 right-3 -translate-y-1/2 top-1/2 scale-65`}
                        >
                          <svg
                            width="25"
                            height="15"
                            viewBox="0 0 25 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M24.7071 8.07136C25.0976 7.68084 25.0976 7.04768 24.7071 6.65715L18.3431 0.29319C17.9526 -0.0973344 17.3195 -0.0973344 16.9289 0.29319C16.5384 0.683714 16.5384 1.31688 16.9289 1.7074L22.5858 7.36426L16.9289 13.0211C16.5384 13.4116 16.5384 14.0448 16.9289 14.4353C17.3195 14.8259 17.9526 14.8259 18.3431 14.4353L24.7071 8.07136ZM24 7.36426V6.36426H0V7.36426V8.36426H24V7.36426Z"
                              fill="#2E3542"
                            />
                          </svg>
                        </span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* {quickLinks && (
          <div className="col-span-4 p-6 bg-black/[0.03]">
            <div className="mb-3 text-sm font-semibold text-black">Quick links</div>
            <div className="space-y-1">
              {quickLinks.map((it) => (
                <NavLink
                  key={it.id}
                  href={it.href}
                  external={it.external}
                  onClick={close}
                  className={cx(
                    "flex items-start gap-3 rounded-[18px] px-3 py-2 hover:bg-black/5",
                  )}
                >
                  <span className="text-black/50 mt-0.5">↗</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-black">{it.label}</div>
                    {it.description && (
                      <div className="text-xs text-black/55 leading-relaxed">
                        {it.description}
                      </div>
                    )}
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
