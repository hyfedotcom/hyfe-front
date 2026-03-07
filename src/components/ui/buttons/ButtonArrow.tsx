import clsx from "clsx";

export function ButtonArrow({
  className,
  isActive,
  arialLabel = "Arrow button",
  activTextcolor = "text-white",
}: {
  className?: string;
  isActive?: boolean;
  arialLabel?: string;
  activTextcolor?: string;
}) {
  return (
    <button
      className={clsx(
        "relative w-[40px] min-w-[40px] h-[40px] min-h-[40px] md:w-[50px] md:min-w-[50px] md:h-[50px] md:min-h-[50px] rounded-full flex items-center justify-center overflow-hidden cursor-pointer transition-colors",
        className,
      )}
      aria-label={arialLabel}
    >
      {/* первая стрелка (базовая) */}
      <svg
        className={clsx(
          "absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-out max-sm:w-[20px]",
          "group-hover/card:translate-x-full group-hover/card:opacity-0",
          "group-active/card:translate-x-full group-active/card:opacity-0",
          "group-hover:translate-x-full group-hover:opacity-0 ",
          isActive && "translate-x-full opacity-0",
        )}
        width="25"
        height="16"
        viewBox="0 0 25 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-current"
          d="M24.7071 7.23406C25.0976 7.62458 25.0976 8.25774 24.7071 8.64827L18.3431 15.0122C17.9526 15.4028 17.3195 15.4028 16.9289 15.0122C16.5384 14.6217 16.5384 13.9885 16.9289 13.598L22.5858 7.94116L16.9289 2.28431C16.5384 1.89378 16.5384 1.26062 16.9289 0.870094C17.3195 0.47957 17.9526 0.47957 18.3431 0.870094L24.7071 7.23406ZM24 7.94116V8.94116H0V7.94116V6.94116H24V7.94116Z"
        />
      </svg>

      {/* вторая стрелка (при hover/active) */}
      <svg
        className={clsx(
          "absolute left-0 -translate-x-full opacity-0 transition-all duration-300 ease-out",
          "group-hover/card:left-1/2 group-hover/card:-translate-x-1/2 group-hover/card:opacity-100",
          "group-active/card:left-1/2 group-active/card:-translate-x-1/2 group-active/card:opacity-100",
          "group-hover:left-[75%]  group-hover:opacity-100",
          isActive &&
            `left-[75%] -translate-x-1/3 opacity-100 ${activTextcolor}`,
        )}
        width="25"
        height="16"
        viewBox="0 0 25 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-current"
          d="M24.7071 7.23406C25.0976 7.62458 25.0976 8.25774 24.7071 8.64827L18.3431 15.0122C17.9526 15.4028 17.3195 15.4028 16.9289 15.0122C16.5384 14.6217 16.5384 13.9885 16.9289 13.598L22.5858 7.94116L16.9289 2.28431C16.5384 1.89378 16.5384 1.26062 16.9289 0.870094C17.3195 0.47957 17.9526 0.47957 18.3431 0.870094L24.7071 7.23406ZM24 7.94116V8.94116H0V7.94116V6.94116H24V7.94116Z"
        />
      </svg>
    </button>
  );
}
