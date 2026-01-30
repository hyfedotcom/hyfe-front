import { ContentContainer } from "@/components/content/ContentContainer";
import { SectionContainer } from "@/components/layouts/SectionContainer";
import { ProblemInsightSolutionType } from "@/features/solutions/schema/hero/strapi.schema";
import { ProblemCard } from "./ProblemCard";
import { InsightCard } from "./InsightCard";
import { SolutionCard } from "./SolutionsCard";
import Image from "next/image";

export function ProblemInsightSolution({
  section,
}: {
  section: ProblemInsightSolutionType;
}) {
  const { insight, problem, solution } = section;
  return (
    <SectionContainer className="overflow-hidden">
      <div className="space-y-10 md:space-y-15">
        <div className="absolute inset-0 -z-0">
          <Image
            src="/home/watch.png"
            alt="cough monitor smart watch"
            width={700}
            height={700}
            className="  md:w-[70vw] z-1 absolute top-[60%] -translate-x-[10%] -right-[20%] lg:w-[700px] h-auto lg:object-cover"
          ></Image>
          <Image
            src="/home/watch-right.png"
            alt="cough monitor smart watch"
            width={700}
            height={700}
            className="  md:w-[70vw] z-1 absolute top-[40%] -translate-x-[25%] -left-[10%] lg:w-[700px] h-auto lg:object-cover scale-80"
          ></Image>
          <svg
            width="1920"
            height="2693"
            viewBox="0 0 1920 2193"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_1028_24963)">
              <path
                d="M-388 611.497C-204.407 611.497 -206.5 1011.03 -63 611.497C80.5 211.962 305 984.127 466 611.497C627 238.868 733.5 1159.68 1030 611.497C1326.5 63.3137 1330.73 611.497 1488 611.497C1614.81 611.497 1750 -89.3714 1884 611.497C2018 1312.37 2158.82 611.497 2309 611.497V1911H-388V611.497Z"
                fill="url(#paint0_linear_1028_24963)"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_1028_24963"
                x="-688"
                y="0"
                width="3297"
                height="2211"
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
                  result="effect1_foregroundBlur_1028_24963"
                />
              </filter>
              <linearGradient
                id="paint0_linear_1028_24963"
                x1="982"
                y1="511.875"
                x2="1097.54"
                y2="1779.8"
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
        </div>
        <ContentContainer content={section} />
        <div>
          <div
            className="w-full flex max-[1000px]:flex-col gap-5 mb-[160px] justify-between items-stretch    min-[1000px]:[&>*:nth-child(2)]:mt-[200px]
            min-[1000px]:[&>*:nth-child(3)]:mt-[400px]"
          >
            {problem.map((p, i) => (
              <div
                key={i}
                className="self-stretch max-[1000px]:w-full flex-1 min-w-0"
              >
                <ProblemCard card={p} />
              </div>
            ))}
          </div>
          <div>
            {insight.map((ins, i) => (
              <div
                className="w-full md:max-w-1/2 xl:max-w-1/3 mx-auto mb-[150px]"
                key={i}
                style={{ marginTop: `${i * 200}px` }}
              >
                <InsightCard card={ins} />
              </div>
            ))}
          </div>
          <div>
            <div className="w-full md:max-w-1/2 xl:max-w-1/3 mx-auto ">
              <SolutionCard card={solution} />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
