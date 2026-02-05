import Link from "next/link";

export function Button({
  label,
  url,
  version = "black",
  color = "white",
  arrow = true,
  tag = "Link",
  classNameProp,
  type = "button",
}: {
  label: string;
  url: string;
  version?: "black" | "white";
  color?: "white" | "black" | "yellow";
  arrow?: boolean;
  tag?: "Link" | "button" | "a";
  classNameProp?: string;
  type?: "button" | "submit";
}) {
  const className = `${classNameProp} h-max uppercase border border-transparent group/cta ${arrow && "flex"} gap-5 items-center duration-300 transition-colors px-5 py-3.5 rounded-[20px] hover:shadow-hover leading-[120%] text-[18px] font-semibold cursor-pointer hover:border-primary ${
    version === "black" ? "bg-black hover:bg-white" : "bg-white hover:bg-black"
  } ${
    color === "white"
      ? "text-white hover:text-black"
      : color === "yellow"
        ? "text-primary"
        : "text-black hover:text-white"
  }`;

  const svgClassName = `${version === "black" ? "text-white group-hover/cta:text-black" : "text-black group-hover/cta:text-white"}  duration-300 transition-colors`;
  const content = (
    <>
      {label}
      {arrow && (
        <span>
          <svg
            width="8"
            height="16"
            viewBox="0 0 8 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={svgClassName}
          >
            <path
              d="M1 1L6.44218 7.34921C6.76317 7.7237 6.76317 8.2763 6.44218 8.65079L1 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}
    </>
  );

  if (tag === "button") {
    return (
      <button type={type} className={className}>
        {content}
      </button>
    );
  }

  if (tag === "a") {
    return (
      <a href={url} target="_blank" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={url} className={className}>
      {content}
    </Link>
  );
}
