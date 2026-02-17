import { IconProps } from "../resources/type";

export default function GraduationCapIcon({
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
        d="M22 8.49999V13.5M14.217 3.49999C13.5242 3.17113 12.7669 3.00052 12 3.00052C11.2331 3.00052 10.4758 3.17113 9.783 3.49999L3.092 6.63699C1.636 7.31899 1.636 9.68099 3.092 10.363L9.782 13.5C10.4749 13.829 11.2324 13.9997 11.9995 13.9997C12.7666 13.9997 13.5241 13.829 14.217 13.5L20.908 10.363C22.364 9.68099 22.364 7.31899 20.908 6.63699L14.217 3.49999Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 11.5V16.625C5 19.543 9.694 21 12 21C14.306 21 19 19.543 19 16.625V11.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
