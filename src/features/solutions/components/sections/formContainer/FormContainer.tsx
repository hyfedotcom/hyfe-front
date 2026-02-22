import { SectionContainer } from "@/components/layouts/SectionContainer";
import { FormContiner } from "@/features/solutions/schema/hero/domain";
import { Form } from "./Form";
import { ContentContainer } from "@/components/content/ContentContainer";

export function FormContainer({ section }: { section: FormContiner }) {
  const list = section.list ?? [];

  return (
    <SectionContainer>
      <div>
        <ContentContainer content={section} />
        <div className="flex flex-col items-center gap-10 justify-center mt-10">
          {list.length > 0 && (
            <ul
              className={`grid gap-x-5 md:gap-x-10 gap-y-5 grid-cols-2 grid-rows-${list?.length / 2} `}
            >
              {list.map((item, i) => (
                <li className="h4-class flex items-center gap-3 w-max" key={i}>
                  <span
                    aria-hidden="true"
                    className="w-2 h-2 block rounded-full bg-primary-700"
                  />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          )}

          <Form form={section.form} />
        </div>
      </div>
    </SectionContainer>
  );
}
