import { ContentContainer } from "@/components/content/ContentContainer";
import { SectionContainer } from "@/components/layouts/SectionContainer";
import { SolutionMapType } from "@/features/solutions/schema/hero/strapi.schema";
import Image from "next/image";
import { GLOBAL_MAP_POINTS } from "./mapPoints";

const MAP_WIDTH = 1760;
const MAP_HEIGHT = 809;
const COORDINATE_SPACE_WIDTH_EM = 100;
const COORDINATE_SPACE_HEIGHT_EM =
  (COORDINATE_SPACE_WIDTH_EM * MAP_HEIGHT) / MAP_WIDTH;

function emToPercentX(leftEm: number) {
  return (leftEm * 100) / COORDINATE_SPACE_WIDTH_EM;
}

function emToPercentY(topEm: number) {
  return (topEm * 100) / COORDINATE_SPACE_HEIGHT_EM;
}

function MapLocationCard({
  organization,
  study,
  location,
}: {
  organization: string;
  study: string;
  location: string;
}) {
  return (
    <div className="space-y-1 text-left">
      <div className="space-y-0.5">
        <p className="text-[13px] leading-[1.3] font-semibold text-heading">
          {organization}
        </p>
        <p className="text-[13px] leading-[1.3] text-body">{study}</p>
      </div>
      <p className="text-[13px] leading-[1.3] text-body-secondary">{location}</p>
    </div>
  );
}

export function Map({ section }: { section: SolutionMapType }) {
  return (
    <SectionContainer>
      <div className="space-y-10 md:space-y-15">
        <ContentContainer content={section} />
        <div className="relative mx-auto w-full max-w-[1760px]">
          <Image
            className="mx-auto w-full h-auto rounded-[20px] border border-border bg-bg-100"
            src="/solution/Countries.svg"
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            alt="Map image where Hyfe is working and has partners. Hyfe - Acoustic epidemiology is the next frontier in healthcare"
          />

          <div className="absolute inset-0">
            {GLOBAL_MAP_POINTS.map((point, i) => {
              const left = `${emToPercentX(point.leftEm)}%`;
              const top = `${emToPercentY(point.topEm)}%`;
              const cardPositionClass =
                point.placement === "right"
                  ? "left-[calc(100%+10px)]"
                  : "right-[calc(100%+10px)]";

              return (
                <div
                  key={`${point.organization}-${point.location}-${i}`}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left, top }}
                >
                  <button
                    type="button"
                    className="relative flex h-5 w-5 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                    aria-label={`${point.organization}, ${point.study}, ${point.location}`}
                  >
                    <span className="absolute h-5 w-5 rounded-full bg-primary-500/30 motion-safe:animate-ping" />
                    <span className="relative h-3 w-3 rounded-full bg-primary-500 ring-2 ring-white" />
                  </button>

                  <div
                    className={`pointer-events-none absolute top-1/2 z-200 hidden w-[280px] -translate-y-1/2 rounded-[14px] border border-border bg-white/95 p-3 opacity-0 shadow-classic transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 md:block ${cardPositionClass}`}
                  >
                    <MapLocationCard
                      organization={point.organization}
                      study={point.study}
                      location={point.location}
                    />
                  </div>

                  <div className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] z-200 w-[220px] -translate-x-1/2 rounded-[14px] border border-border bg-white/95 p-3 opacity-0 shadow-classic transition-opacity duration-200 group-focus-within:opacity-100 md:hidden">
                    <MapLocationCard
                      organization={point.organization}
                      study={point.study}
                      location={point.location}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
