import { IconProps } from "./type";

export default function CoughNewsIcon({
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
        d="M7.99921 3H9.99921M9.99921 3V8.459C9.99939 8.81316 9.90552 9.16101 9.72721 9.467L8.24921 12L4.75421 17.992C3.97621 19.326 4.93721 21 6.48121 21H17.5172C19.0602 21 20.0222 19.326 19.2442 17.992L15.7492 12L14.2712 9.467C14.0931 9.1613 13.9992 8.81382 13.9992 8.46V3M9.99921 3H13.9992M15.9992 3H13.9992"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
