export function ProblemChip({
  type,
}: {
  type: "problem" | "insight" | "solution";
}) {
  const color =
    type === "problem"
      ? "bg-red-500"
      : type === "insight"
        ? "bg-blue-500"
        : "bg-green-500";
  return (
    <div className=" w-max flex items-center gap-2 px-3 py-2.5 uppercase text-[14px] leading-[100%] font-medium text-black bg-primary-300 border border-white shadow-classic rounded-full">
      <span className={`w-2.5 h-2.5 rounded-full text-balance ${color}`} />
      <p className=""> {type}</p>
    </div>
  );
}
