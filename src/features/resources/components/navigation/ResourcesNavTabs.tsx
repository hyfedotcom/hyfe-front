import { ResourceTab } from "./ResourceTab";

type Props = {
  type: string;
};

export function ResourcesNavTabs({ type }: Props) {
  const science = ["Publications", "White Papers", "Cough News"];
  const corporate = ["News", "Insights"];

  const tabs = science.some(
    (e) => e.toLowerCase().replace(/\s/g, "-") === type.toLowerCase(),
  )
    ? science
    : corporate;

  return (
    <div className="hidden md:flex rounded-t-[28px] py-3 px-3  gap-2 left-1/2 -translate-x-1/2 fixed bottom-0 bg-white/20 backdrop-blur-2xl">
      {tabs.map((label) => (
        <ResourceTab
          key={label}
          label={label}
          active={
            type.toLowerCase() === label.toLowerCase().replace(/\s/g, "-")
          }
        />
      ))}
    </div>
  );
}
