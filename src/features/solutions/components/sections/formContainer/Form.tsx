"use client";

import { Button } from "@/components/ui/buttons/Button";
import type { FormType } from "@/features/solutions/schema/hero/raw";
import { Input } from "./Input";
import { useState } from "react";

export function Form({ form }: { form: FormType }) {
  const { consent, cough_news_subscription, cta_label, inputs } = form;
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    inputs.forEach((input) => {
      initial[input.type] = "";
    });
    return initial;
  });

  const changeValue = (label: string, next: string) => {
    setValues((prev) => ({ ...prev, [label]: next }));
  };

  console.log(values);

  return (
    <form
      action="submite"
      className={`space-y-5 max-w-[600px] w-full md:w-1/2 resources-glass-surface rounded-[40px] p-10 bg-gradient-to-br from-white via-white/10 to-primary-100`}
    >
      <div aria-hidden="true" className="resources-glass-overlay" />
      <div aria-hidden="true" className="resources-glass-highlight" />
      {inputs.map((input, i) => {
        return (
          <Input
            input={input}
            key={i}
            value={values[input.type] ?? ""}
            onChange={(next) => changeValue(input.type, next)}
          />
        );
      })}
      <Button
        label={cta_label}
        type={"submit"}
        tag="button"
        arrow={false}
        classNameProp="w-full! items-center! justify-center mt-4"
      />
    </form>
  );
}
