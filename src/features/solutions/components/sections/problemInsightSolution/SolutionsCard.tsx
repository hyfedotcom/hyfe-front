import { Button } from "@/components/ui/buttons/Button";
import { ProblemChip } from "./ProblemChip";

export function SolutionCard({
  card,
}: {
  card: { value: string; cta: { label: string; url: string } };
}) {
  return (
    <div className="bg-[#FBF9F2]/40 backdrop-blur-sm p-10 border border-[#FFF199] w-full flex-1 flex flex-col items-center justify-between rounded-[28px] space-y-10 ">
      <div className="mx-auto">
        <ProblemChip type="solution" />
      </div>
      <div className="space-y-8 flex flex-col items-center">
        <h3 className="text-[30px]! lg:text-[40px]! font-medium! text-black! text-center text-balance">
          {card.value}
        </h3>
        <Button
          label={card.cta.label}
          url={card.cta.url}
          classNameProp="w-max"
        />
      </div>
    </div>
  );
}
