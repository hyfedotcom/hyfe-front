import { cx, NavLink } from "@/features/header/helpers/header.helpers";
import { BaseLink } from "@/features/header/type/header.type";
import BriefeCaseIcon from "@/shared/icons/company/BriefeCaseIcon";
import CompassIcon from "@/shared/icons/company/CompassIcon";
import GraduationCapIcon from "@/shared/icons/company/GraduationCapIcon";
import UsersIcon from "@/shared/icons/company/UsersIcon";
import LifeScienceIcon from "@/shared/icons/solutions/LifeScienceIcon";
import ResearchIcon from "@/shared/icons/solutions/ResearchIcon";
import VirtualCareIcon from "@/shared/icons/solutions/VirtualCareIcon";
import { LinkIndicator } from "@/components/ui/buttons/LinkIndicator";

export function DropdownPanel({
  items,
  close,
}: {
  items: BaseLink[];
  close: () => void;
}) {
  const META = {
    "For Pharma": { Icon: LifeScienceIcon },
    "For Academics": {
      Icon: ResearchIcon,
    },
    "For Healthcare Providers": {
      Icon: VirtualCareIcon,
    },
    Team: { Icon: UsersIcon },
    Careers: { Icon: BriefeCaseIcon },
    Advisors: { Icon: GraduationCapIcon },
    About: { Icon: CompassIcon },
  } as const;

  type MetaKey = keyof typeof META;

  const isMetaKey = (label: string): label is MetaKey => label in META;

  return (
    <div className="absolute pt-3 -translate-x-1/2 left-1/2 top-full mt-3 w-[400px]">
      <div
        className={cx(
          "relative overflow-hidden rounded-[24px] border border-black/[0.14] bg-gradient-to-b from-white/88 via-white/74 to-white/58 p-2 shadow-[0_22px_55px_rgba(15,23,42,0.2),0_2px_10px_rgba(255,255,255,0.55)_inset] ring-1 ring-black/[0.06]",
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-white/62 backdrop-blur-[36px] backdrop-saturate-180"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 top-[1px] h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
        />
        <div className="relative z-10">
          {items.map((it) => {
            const meta =
              it.label && isMetaKey(it.label) ? META[it.label] : null;
            const Icon = meta?.Icon;
            return (
              <NavLink
                key={it.id}
                href={it.href}
                onClick={close}
                className={cx(
                  "relative flex items-center gap-3 rounded-[18px] px-4 py-3 group",
                  "hover:bg-black/5",
                )}
              >
                {Icon && <Icon className="text-primary-600 min-w-5 min-h-5" />}
                <div className="min-w-0 pr-8">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-black">{it.label}</span>
                  </div>
                  {it.description && (
                    <div className="text-xs text-black/55 leading-relaxed">
                      {it.description}
                    </div>
                  )}
                </div>
                <LinkIndicator
                  href={it.href}
                  className="text-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  internalClassName="w-2 h-4"
                  externalClassName="w-3.5 h-3.5"
                />
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
