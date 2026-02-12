import { Button } from "../ui/buttons/Button";

type Props = {
  title?: string;
  paragraph?: string | null;
  ctas?: {
    label: string;
    url: string;
  }[];
};

export function ContentContainer({
  content,
  classContainer = "flex items-center flex-col justify-between mx-auto text-center",
  width = "max-w-[1000px]",
  classH,
  classP = "body-large",
  classCtas,
  classBtn,
}: {
  content: Props;
  classContainer?: string;
  width?: string;
  classH?: string;
  classP?: string;
  classCtas?: string;
  classBtn?: string;
}) {
  const { ctas, paragraph, title } = content;
  return (
    <div className={`${classContainer} ${width} space-y-6 md:space-y-11 text-balance`}>
      <div className="space-y-4 md:space-y-5">
        {title && <h2 className={`${classH} text-balance`}>{title}</h2>}
        {paragraph && <p className={`${classP} text-balance `}>{paragraph}</p>}
      </div>
      {ctas && ctas.length > 0 && (
        <div
          className={`${classCtas} mx-auto items-center flex flex-col md:flex-row gap-5 w-full justify-center`}
        >
          {ctas.map((c, i) => (
            <Button
              key={i}
              url={c.url}
              label={c.label}
              classNameProp={classBtn}
            />
          ))}
        </div>
      )}
    </div>
  );
}
