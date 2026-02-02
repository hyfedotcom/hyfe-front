import { ResourceBlockContent } from "@/features/resources";
import { RichText } from "@/features/resources/components/details/detailsRender/RichText";
import * as React from "react";

type FaqItemProps = {
  question: string;
  answer: ResourceBlockContent;
  active: boolean;
  onToggle: () => void;
  className?: string;
};

export default function FAQItem({
  question,
  answer,
  active,
  onToggle,
  className = "",
}: FaqItemProps) {
  const contentId = React.useId();

  return (
    <div
      data-open={active}
      className={[
        "group w-fullrounded-[20px] bg-card  border hover:border-primary rounded-[20px]",
        active ? "border-primary" : "border-border",
        className,
      ].join(" ")}
    >
      {/* Кликается только шапка */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={active}
        aria-controls={contentId}
        className="
          flex w-full items-center justify-between gap-3
          text-left cursor-pointer px-5 pt-5 pb-5
          min-w-0
        "
      >
        <h4 className="flex-1 min-w-0 break-words whitespace-normal font-normal!">
          {question}
        </h4>

        <span className="shrink-0 inline-flex items-center justify-center rounded-[8px] bg-black p-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`
              text-white
              transition-transform duration-200 ease-out
              group-hover:rotate-45
           ${active ? "rotate-45" : ""}
            `}
          >
            <path
              d="M12.0205 0C12.8489 0 13.5205 0.671573 13.5205 1.5V10.793H22.5C23.3284 10.793 24 11.4646 24 12.293C24 13.1214 23.3284 13.7929 22.5 13.793H13.5205V22.5C13.5205 23.3284 12.8489 24 12.0205 24C11.1921 24 10.5205 23.3284 10.5205 22.5V13.793H1.5C0.671573 13.793 0 13.1214 0 12.293C0 11.4645 0.671573 10.793 1.5 10.793H10.5205V1.5C10.5205 0.671573 11.1921 0 12.0205 0Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>

      {/* Раскрытие/схлопывание — grid подход */}
      <div
        id={contentId}
        className={[
          "grid transition-[grid-template-rows] duration-200 ease-out",
          active ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div className="px-5 text-sm leading-relaxed text-white/80 w-full break-words max-w-[95%] [&_p:last-child]:mb-5">
            <RichText blocks={answer} />
          </div>
        </div>
      </div>
    </div>
  );
}