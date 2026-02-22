import { ProblemChip } from "./ProblemChip";

export function ProblemCard({
  card,
}: {
  card: { value: string; description: string };
}) {
  return (
    <div className="bg-[#FBF9F2]/40 backdrop-blur-sm p-6 border border-[#FFF199] w-full space-y-10 md:space-y-20  flex flex-col justify-between rounded-[28px]">
      <ProblemChip type="problem" />
      <div className="space-y-3">
        <h3 className="max-[1000px]:text-[60px]! text-[80px]! text-black!">{card.value}</h3>
        <h4 className="max-[1000px]:text-[20px]! text-balance">{card.description}</h4>
      </div>
    </div>
  );
}
