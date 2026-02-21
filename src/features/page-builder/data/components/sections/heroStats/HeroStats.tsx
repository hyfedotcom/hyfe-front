"use client";

import { Button } from "@/components/ui/buttons/Button";
import type { HeroStatsSectionmodifiedType } from "../../../schema/pageBuilder";
import { HeroStatsScene } from "./HeroStatsScene.client";

export function HeroStats({
  section,
}: {
  section: HeroStatsSectionmodifiedType;
}) {
  const { title, paragraph, ctas, stats, map_title: mapTitle } = section;

  const h1Size =
    title.length < 25
      ? "text-[38px]! md:text-[42px]! lg:text-[48px]! xl:text-[54px]! 2xl:text-[62px]!"
      : "text-[28px]! md:text-[34px]! lg:text-[40px]! xl:text-[46px]! 2xl:text-[50px]!";

  return (
    <main className="w-full relative grid">
      <div className="row-start-1 col-start-1">
        <HeroStatsScene mapTitle={mapTitle} stats={stats ?? []} />
      </div>

      <div className="row-start-1 col-start-1 z-20 flex justify-center px-4 md:px-10 pt-[140px] md:pt-[240px] pointer-events-none">
        <div className="w-full max-w-[1000px] flex flex-col items-center text-center pointer-events-auto">
          <div className="space-y-8 text-balance">
            <h1 className={h1Size}>{title}</h1>
            <p className="body-large text-balance text-black!">{paragraph}</p>
          </div>

          <div className="flex mt-10 gap-3 md:gap-6 flex-col w-full md:w-max mx-auto sm:flex-row">
            {ctas?.map((cta, i) => (
              <Button
                key={i}
                label={cta.label}
                url={cta.url}
                version={i === 1 ? "white" : "black"}
                color={i === 1 ? "black" : "white"}
                classNameProp="justify-between!"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
