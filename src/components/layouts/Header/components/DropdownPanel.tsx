import { cx, NavLink } from "@/features/header/helpers/header.helpers";
import { BaseLink } from "@/features/header/type/header.type";
import BriefeCaseIcon from "@/shared/icons/company/BriefeCaseIcon";
import CompassIcon from "@/shared/icons/company/CompassIcon";
import GraduationCapIcon from "@/shared/icons/company/GraduationCapIcon";
import QuestionIcon from "@/shared/icons/company/QuestionIcon";
import UsersIcon from "@/shared/icons/company/UsersIcon";
import LifeScienceIcon from "@/shared/icons/solutions/LifeScienceIcon";
import ResearchIcon from "@/shared/icons/solutions/ResearchIcon";
import VirtualCareIcon from "@/shared/icons/solutions/VirtualCareIcon";

export function DropdownPanel({
  items,
  close,
}: {
  items: BaseLink[];
  close: () => void;
}) {
  const META = {
    "Life Sciences": { label: "Life Sciences", Icon: LifeScienceIcon },
    Research: {
      label: "Research",
      Icon: ResearchIcon,
    },
    "Virtual Care": { label: "Virtual Care", Icon: VirtualCareIcon },
    Team: { Icon: UsersIcon },
    Careers: { Icon: BriefeCaseIcon },
    Advisors: { Icon: GraduationCapIcon },
    About: { Icon: CompassIcon },
  } as const;

  type MetaKey = keyof typeof META;

  const isMetaKey = (label: string): label is MetaKey => label in META;

  return (
    <div
      className={cx(
        "absolute pt-3  -translate-x-1/2 left-1/2 top-full mt-3 w-[400px] rounded-[24px] bg-white p-2 shadow-xl ring-1 ring-black/10",
      )}
    >
      {items.map((it) => {
        const meta = it.label && isMetaKey(it.label) ? META[it.label] : null;
        const Icon = meta?.Icon;
        return (
          <NavLink
            key={it.id}
            href={it.href}
            external={it.external}
            onClick={close}
            className={cx(
              "flex items-center gap-3 rounded-[18px] px-4 py-3",
              "hover:bg-black/5",
            )}
          >
            {Icon && <Icon className="text-primary min-w-5 min-h-5" />}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-black">{it.label}</span>
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
          </NavLink>
        );
      })}
    </div>
  );
}
