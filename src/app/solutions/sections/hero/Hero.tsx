import { Button } from "@/components/ui/buttons/Button";
import { SolutionsHeroType } from "@/features/solutions/schema/hero/strapi.schema";
import Image from "next/image";

export function Hero({ section }: { section: SolutionsHeroType }) {
  const { ctas, paragraph, title } = section;
  return (
    <main className="relative bg-primary-100 overflow-hidden">
      <svg
        width="1920"
        height="1911"
        viewBox="0 0 1920 1911"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -bottom-1/2 z-0 w-screen"
      >
        <g filter="url(#filter0_f_1028_25466)">
          <path
            d="M-388 553.49C-204.407 553.49 -206.5 878.624 -63 553.49C80.5 228.357 305 856.729 466 553.49C627 250.252 733.5 999.591 1030 553.49C1326.5 107.389 1330.73 553.49 1488 553.49C1614.81 553.49 1750 -16.8628 1884 553.49C2018 1123.84 2158.82 553.49 2309 553.49V1611H-388V553.49Z"
            fill="url(#paint0_linear_1028_25466)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_1028_25466"
            x="-688"
            y="0"
            width="3297"
            height="1911"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="150"
              result="effect1_foregroundBlur_1028_25466"
            />
          </filter>
          <linearGradient
            id="paint0_linear_1028_25466"
            x1="982"
            y1="472.42"
            x2="1058.73"
            y2="1507.11"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.00154131" stopColor="white" />
            <stop offset="0.151644" stopColor="#FFCE1D" />
            <stop offset="0.301746" stopColor="#FFC800" />
            <stop offset="0.63368" stopColor="#FFAE00" />
            <stop offset="1" stopColor="#FF9D00" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative z-1">
        {" "}
        <div className="space-y-5 pt-[240px] max-w-[1600px] mx-auto text-center text-balance mb-11 ">
          <h1 className="md:text-[50px]! lg:text-[70px]!">{title}</h1>
          <p className="body-large text-balance">{paragraph}</p>
        </div>
        <div className="flex gap-5 flex-col md:flex-row items-center justify-center mb-[90px]">
          {ctas?.map((c, i) => (
            <Button
              key={i}
              label={c.label}
              url={c.url}
              version={i > 0 ? "white" : "black"}
              color={i > 0 ? "black" : "white"}
            />
          ))}
        </div>
        <Image
          className="mx-auto"
          src="/solution/dashboard.png"
          width={1179}
          height={681}
          alt="cough monitor and dashboard"
        />
      </div>
    </main>
  );
}
