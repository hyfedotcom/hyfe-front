import { HeroContentType } from "@/features/about/schema/domain";

export function HeroContent({ section }: { section: HeroContentType }) {
  const { content, title, type } = section;
  return (
    <main className="pt-[140px] px-4 md:px-10 lg:px-20">
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
