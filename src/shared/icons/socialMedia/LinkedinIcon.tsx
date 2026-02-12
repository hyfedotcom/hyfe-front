import { IconProps } from "../resources/type";

export default function LinkedinIcon({
  size = 24,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.66699 6.16699C5.75889 6.16717 5.83301 6.24205 5.83301 6.33398C5.83283 6.42577 5.75878 6.49982 5.66699 6.5C5.57505 6.5 5.50018 6.42588 5.5 6.33398C5.5 6.24194 5.57494 6.16699 5.66699 6.16699Z"
        fill={color}
        stroke={color}
        strokeWidth="3"
      />
      <path
        d="M5.66699 11.333V19.6663"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10.667 11.333V19.6663V11.333Z" fill="#D9D9D9" />
      <path
        d="M10.667 11.333V19.6663"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.667 15.4997C10.667 13.1997 12.5337 11.333 14.8337 11.333C17.1337 11.333 19.0003 13.1997 19.0003 15.4997V19.6663"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
