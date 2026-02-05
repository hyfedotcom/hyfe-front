import { Button } from "@/components/ui/buttons/Button";
import { HeroStatsSectionType } from "../../../schema/pageBuilder";
import Image from "next/image";

export function HeroStats({ section }: { section: HeroStatsSectionType }) {
  const { title, paragraph, ctas, stats, type } = section;
  return (
    <main className="w-full  pt-[240px] relative overflow-hidden h-auto space-y-20 md:space-y-40 lg:space-y-[326px]">
      <div>
        {" "}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bottom-0 translate-y-[32%]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1920"
            height="1798"
            viewBox="0 0 1920 1798"
            fill="none"
            className="absolute left-1/2  -translate-x-1/2 w-full max-w-none -top-200 md:-top-140 "
            preserveAspectRatio="xMidYMin slice"
          >
            <g filter="url(#filter0_f_327_2267)">
              <path
                d="M-388 531.555C-204.407 531.555 -206.5 828.554 -63 531.555C80.5 234.556 305 808.553 466 531.555C627 254.557 733.5 939.053 1030 531.555C1326.5 124.057 1330.73 531.555 1488 531.555C1614.81 531.555 1750 10.5563 1884 531.555C2018 1052.55 2158.82 531.555 2309 531.555V1497.56H-388V531.555Z"
                fill="url(#paint0_linear_327_2267)"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_327_2267"
                x="-688"
                y="0"
                width="3297"
                height="1797.56"
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
                  result="effect1_foregroundBlur_327_2267"
                />
              </filter>
              <linearGradient
                id="paint0_linear_327_2267"
                x1="982"
                y1="457.5"
                x2="1046.08"
                y2="1403.51"
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
          <div className="absolute inset-y-0 -inset-x-[12vw] md:inset-0">
            <Image
              src="/home/mappoints.png"
              fill
              alt="maps"
              quality={95}
              sizes="(max-width: 768px) 124vw, 100vw"
              className="object-cover object-bottom origin-bottom
                 scale-[0.88] md:scale-100"
            />
          </div>
        </div>
        <div className="flex flex-col items-center px-4 md:px-10 text-center space-y-11 z-3 relative">
          <div className="space-y-8 text-balance max-w-[1000px]">
            <h1>{title}</h1>
            <p className="body-large text-balance">{paragraph}</p>
          </div>
          <div className="flex gap-6 flex-col sm:flex-row">
            {ctas &&
              ctas.map((c, i) => (
                <Button
                  key={i}
                  label={c.label}
                  url={c.url}
                  version={i === 1 ? "white" : "black"}
                  color={i === 1 ? "black" : "white"}
                />
              ))}
          </div>
        </div>
      </div>
      {stats && (
        <div className="flex flex-col lg:flex-row gap-3 px-4 lg:px-20 pb-20 md:pb-[329px]">
          {stats.map((s, i) => (
            <div
              key={i}
              className="w-full flex flex-col items-center justify-center py-10 bg-[#FBF9F2]/20 backdrop-blur-[6px] rounded-[20px] border-2 border-[#FFF199]/25"
            >
              <h2 className="text-[60px]! md:text-[80px]! text-center">
                {s.value}
              </h2>
              <strong className="mx-auto text-center w-full block">
                {s.label}
              </strong>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
