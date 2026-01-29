import Link from "next/link";

export function ResourceButtonBack({
  label,
  url,
}: {
  label: string;
  url: string;
}) {
  return (
    <Link
      href={url}
      className="fixed max-[1400px]:bg-white max-[1400px]:shadow-classic translate-x-4 md:translate-x-[40px] lg:translate-x-[80px] px-5 py-2 rounded-[20px] top-40 flex gap-5 text-black hover:text-primary-500! duration-200 body-small md:body-large items-center font-medium! w-max text-nowrap"
    >
      <svg
        width="8"
        height="16"
        viewBox="0 0 8 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.68311 1L1.24093 7.34921C0.919935 7.7237 0.919935 8.2763 1.24093 8.65079L6.68311 15"
          stroke="#2E3542"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {label}
    </Link>
  );
}
