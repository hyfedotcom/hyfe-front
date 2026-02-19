import { SectionContainer } from "@/components/layouts/SectionContainer";
import { CTASectionSchemaType } from "../../../schema/pageBuilder";
import { ContentContainer } from "@/components/content/ContentContainer";
import Image from "next/image";

export function Cta({ section }: { section: CTASectionSchemaType }) {
  return (
    <div className="relative overflow-hidden">
      <div className="w-screen h-[140px] rounded-b-[100px] bg-white"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1920"
        height="1798"
        viewBox="0 0 1920 1798"
        fill="none"
        className="absolute left-1/2  -translate-x-1/2 w-full max-w-none -top-100 md:-top-100 -z-1 overflow-visible"
        preserveAspectRatio="xMidYMin slice"
      >
        <g className="svg-blur-filter" filter="url(#cta_blur_filter)">
          <path
            d="M-388 531.555C-204.407 531.555 -206.5 828.554 -63 531.555C80.5 234.556 305 808.553 466 531.555C627 254.557 733.5 939.053 1030 531.555C1326.5 124.057 1330.73 531.555 1488 531.555C1614.81 531.555 1750 10.5563 1884 531.555C2018 1052.55 2158.82 531.555 2309 531.555V1497.56H-388V531.555Z"
            fill="url(#cta_blur_gradient)"
          />
        </g>
        <g className="svg-blur-fallback" filter="url(#cta_blur_filter_fallback)">
          <path
            d="M-388 531.555C-204.407 531.555 -206.5 828.554 -63 531.555C80.5 234.556 305 808.553 466 531.555C627 254.557 733.5 939.053 1030 531.555C1326.5 124.057 1330.73 531.555 1488 531.555C1614.81 531.555 1750 10.5563 1884 531.555C2018 1052.55 2158.82 531.555 2309 531.555V1497.56H-388V531.555Z"
            fill="url(#cta_blur_gradient)"
          />
        </g>
        <defs>
          <filter
            id="cta_blur_filter"
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
          <filter
            id="cta_blur_filter_fallback"
            x="-1100"
            y="-500"
            width="4200"
            height="2800"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="150" />
          </filter>
          <linearGradient
            id="cta_blur_gradient"
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
      <div className="flex flex-col lg:flex-row justify-between">
        <SectionContainer className={"bg-transparent! flex items-center"}>
          <div className=" min-[1440px]:py-[150px] z-1 relative">
            <ContentContainer
              content={section}
              classContainer="xl:pl-20 flex flex-col justify-start! items-left! text-left! mr-auto "
              width="max-w-[800px]"
              classH="text-[42px]! md:text-[50px]! lg:text-[60px]! xl:text-[70px]! 2xl:text-[80px]! leading-[126%]! font-semibold!  md:text-nowrap"
              classP="body-large text-black! font-medium!"
              classCtas="justify-start! justify-start "
              classBtn="justify-between mr-auto"
            />
          </div>
        </SectionContainer>
        <div className="w-[1260px] h-[400px] md:h-[950px]  relative scale-120 translate-x-[10%] ">
          <Image
            src="/home/watch.png"
            alt="cough monitor smart watch"
            width={700}
            height={700}
            className="z-1 w-screen md:w-[70vw] absolute  lg:w-[700px] h-auto lg:object-cover md:translate-y-[-25%] lg:translate-y-[20%] md:left-1/4"
          ></Image>
          <Image
            className="absolute inset-0 object-contain object-cover object-top md:object-left "
            src={"/home/honeycombs.png"}
            alt={"CoughMonitor Suite "}
            fill
          />
        </div>
      </div>
      <div className="w-screen h-[140px] rounded-t-[100px] bg-white"></div>
    </div>
  );
}
