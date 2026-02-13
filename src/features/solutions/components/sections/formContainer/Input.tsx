"use client";

import type { InputType } from "@/features/solutions/schema/hero/raw";
import { useState } from "react";

const inputType = {
  name: {
    placeholder: "First and last name",
    type: "text",
    label: "Full name",
  },
  email: {
    placeholder: "Enter your email",
    type: "email",
    label: "Your email address",
  },
  number: {
    placeholder: "Enter your phone",
    type: "number",
    label: "Enter your phone number",
  },
  message: {
    placeholder: "Write",
    type: "textaria",
    label: "Write",
  },
  custom: {
    placeholder: "penis",
    type: "penis",
    label: "penis",
  },
};

export function Input({
  input,
  value,
  onChange,
}: {
  input: InputType;
  value: string;
  onChange: (next: string) => void;
}) {
  const { required, type } = input;
  const [isActive, setIsActive] = useState(false);
  const inputSelect = inputType[type];

  return (
    <div className="relative">
      {type === "message" ? (
        <textarea
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(value.length !== 0)}
        />
      ) : (
        <input
          className="h-12 pl-5 w-full bg-white border rounded-full"
          required={required}
          type={inputSelect.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(value.length !== 0)}
        />
      )}

      <label
        className={`${isActive ? "-top-4 text-[13px] text-body-secondary" : "top-2 text-[16px] text-body-secondary"} absolute left-4 bg-white px-3 py-1 rounded-full pointer-events-none`}
      >
        {inputSelect.label} {required && <span className="text-red-600">*</span>}
      </label>
    </div>
  );
}
