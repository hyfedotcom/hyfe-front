import { ProblemChip } from "./ProblemChip";

export function InsightCard({ card }: { card: { value: string } }) {
  return (
    <div className="bg-[#FBF9F2]/40 backdrop-blur-sm p-10 border border-[#FFF199] w-full space-y-10  flex-1 flex flex-col justify-between rounded-[28px]">
      <div className="mx-auto">
        <ProblemChip type="insight" />
      </div>
      <div className="space-y-7">
        <h3 className="text-[30px]! lg:text-[40px]! font-medium! text-black! text-center text-balance">
          {card.value}
        </h3>
      </div>
    </div>
  );
}
