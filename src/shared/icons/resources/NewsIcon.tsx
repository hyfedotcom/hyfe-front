import { IconProps } from "./type";

export default function NewsIcon({
  size = 24,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 4V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H19C19.5304 20 20.0391 19.7893 20.4142 19.4142C20.7893 19.0391 21 18.5304 21 18V8H17"
        strokeWidth="2"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 4H17V18C17 18.5304 17.2107 19.0391 17.5858 19.4142C17.9609 19.7893 18.4696 20 19 20M13 8H7M13 12H9"
        strokeWidth="2"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
