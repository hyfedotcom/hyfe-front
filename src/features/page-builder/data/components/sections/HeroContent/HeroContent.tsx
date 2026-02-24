import { HeroContentType } from "@/features/about/schema/domain";

const HERO_STATS_BG_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAeGVYSWZNTQAqAAAACAAEARoABQAAAAEAAAA+ARsABQAAAAEAAABGASgAAwAAAAEAAgAAh2kABAAAAAEAAABOAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEAAAAACFk7TpAAAACXBIWXMAAAsTAAALEwEAmpwYAAABL0lEQVQoFZWS0UpCQRCGv92zHUMJE7zwIgjqNpAuu9L36GV8hqCn8K6n6AmCiMC6CaNMxPSouzvNakk34WkOc3ZmZ/75Z3bX8If0emJTqNPBdruIMUQw4uThqsLhcc4i5IT7SPXDY6sGe92giDWMz3jd/xQpXuizdBQ3F7xXj7B5Az/yjEczgo9UWieYrEVYGiV6ZDC4pcnEMb27hKytwTpxIYSiIIYVs2ETsXVEwcE/s5ifgx06xm9nIG2EHBE19ScSkanVPaMKUQ50glO1nxyT1Z4a2TqQgilJKbe+OipaTBVqjjmp0kZ+1m93u6T9xKXFHEEByd0liVm/lJztyv0VtwmQtJwIa0BqZ3dLm5Lrlv7JoI+gfP3N0OUZdN50B+UBOqnTdryCfKlj0lf1BfebcqHLiU9tAAAAAElFTkSuQmCC";

export function HeroContent({ section }: { section: HeroContentType }) {
  const { content, title, type } = section;
  return (
    <main className="pt-[140px] px-4 md:px-10 lg:px-20 relative">
      <div
        className="absolute inset-0 rotate-180 z-[-1] translate-y-[-20%]" 
        style={{
          backgroundImage: `url("${HERO_STATS_BG_BLUR_DATA_URL}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      <div className="space-y-6">
        <h1 className="h2-class text-center text-balance mx-auto">{title}</h1>
        <div className="space-y-5 text-center md:max-w-[90%] mx-auto">
          {content.map((e) => (
            <p className="body-medium text-balance" key={e.id}>
              {e.paragraph}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
