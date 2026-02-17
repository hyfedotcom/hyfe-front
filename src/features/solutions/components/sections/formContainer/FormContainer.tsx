import { SectionContainer } from "@/components/layouts/SectionContainer";
import { FormContiner } from "@/features/solutions/schema/hero/domain";
import { Form } from "./Form";
import { ContentContainer } from "@/components/content/ContentContainer";

export function FormContainer({ section }: { section: FormContiner }) {
  return (
    <SectionContainer>
      <div>
        <ContentContainer content={section} />
        <div className="flex flex-col items-center gap-10 justify-center mt-10">
          {section.list && (
            <ul
              className={`grid gap-x-5 md:gap-x-10 gap-y-5 grid-cols-2 grid-rows-${section.list?.length / 2} `}
            >
              {section.list?.map((l, i) => (
                <div className="flex items-center gap-3" key={i}>
                  <span className="w-2 h-2 block rounded-full bg-primary-700" />
                  <li className="h4-class">{l.label}</li>
                </div>
              ))}
            </ul>
          )}
          
          <Form form={section.form} />
        </div>
      </div>
    </SectionContainer>
  );
}
