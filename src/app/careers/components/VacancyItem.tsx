import { VacancyType } from "@/features/careers/schema/careers.schema";
import { EmploymentType } from "./EmploymentType";
import { TimeZone } from "./TimeZone";
import { LocationsType } from "./LocationsType";

export function VacancyItem({ vacancy }: { vacancy: VacancyType }) {
  const { employment_type, excerpt, location_type, time_zone, title } = vacancy;
  return (
    <div className="p-4 md:p-10 bg-activ border-border border hover:border-primary duration-200 space-y-4 md:space-y-5 rounded-[20px]  hover:shadow-hover duration-300">
      <h3 className="text-[16px]! md:text-[24px]!">{title}</h3>
      <div className="flex gap-3 flex-wrap">
        <LocationsType location_type={location_type} />
        <TimeZone time_zone={time_zone} />
        <EmploymentType employment_type={employment_type} />
      </div>
      {excerpt && <p className="text-[14px] text-black text-body md:text-[16px]">{excerpt}</p>}
    </div>
  );
}
