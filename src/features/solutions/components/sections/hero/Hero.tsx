import { Button } from "@/components/ui/buttons/Button";
import { SolutionsHeroType } from "@/features/solutions/schema/hero/strapi.schema";
import HeroClient from "./HeroClient";

const HERO_STATS_BG_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAeGVYSWZNTQAqAAAACAAEARoABQAAAAEAAAA+ARsABQAAAAEAAABGASgAAwAAAAEAAgAAh2kABAAAAAEAAABOAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEAAAAACFk7TpAAAACXBIWXMAAAsTAAALEwEAmpwYAAABL0lEQVQoFZWS0UpCQRCGv92zHUMJE7zwIgjqNpAuu9L36GV8hqCn8K6n6AmCiMC6CaNMxPSouzvNakk34WkOc3ZmZ/75Z3bX8If0emJTqNPBdruIMUQw4uThqsLhcc4i5IT7SPXDY6sGe92giDWMz3jd/xQpXuizdBQ3F7xXj7B5Az/yjEczgo9UWieYrEVYGiV6ZDC4pcnEMb27hKytwTpxIYSiIIYVs2ETsXVEwcE/s5ifgx06xm9nIG2EHBE19ScSkanVPaMKUQ50glO1nxyT1Z4a2TqQgilJKbe+OipaTBVqjjmp0kZ+1m93u6T9xKXFHEEByd0liVm/lJztyv0VtwmQtJwIa0BqZ3dLm5Lrlv7JoI+gfP3N0OUZdN50B+UBOqnTdryCfKlj0lf1BfebcqHLiU9tAAAAAElFTkSuQmCC";

export function Hero({ section }: { section: SolutionsHeroType }) {
  const { ctas, paragraph, title } = section;

  return (
    <main className="relative bg-primary-100 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${HERO_STATS_BG_BLUR_DATA_URL}"), linear-gradient(to bottom, #fffdf3, #ffe789, #FFD67F)`,
          backgroundPosition: "center top, center top",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundSize: "cover, cover",
        }}
      />
      <div className="relative z-1">
        <div className="space-y-5 pt-[140px] md:pt-[240px] max-w-[1600px] mx-auto text-center text-balance mb-11 px-4 md:px-10 xl:px-20">
          <h1 className="text-[28px]! md:text-[50px]! lg:text-[55px]! font-medium!">
            {title}
          </h1>
          <p className="body-large text-balance text-black!">{paragraph}</p>
        </div>
        <div className="flex gap-4 md:gap-5 flex-col md:flex-row items-center justify-center px-4 md:px-10 lg:px-20">
          {ctas?.map((c, i) => (
            <Button
              key={i}
              label={c.label}
              url={c.url}
              version={i > 0 ? "white" : "black"}
              color={i > 0 ? "black" : "white"}
              classNameProp="justify-between!"
            />
          ))}
        </div>
        <HeroClient />
      </div>
    </main>
  );
}
