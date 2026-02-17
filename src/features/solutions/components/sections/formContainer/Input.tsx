"use client";

import type { InputType } from "@/features/solutions/schema/hero/raw";
import { useState } from "react";

export function Input({
  input,
  value,
  onChange,
  hasError = false,
  disabled = false,
  onFocus,
  onBlur,
}: {
  input: InputType;
  value: string;
  onChange: (next: string) => void;
  hasError?: boolean;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  const { required, type, label } = input;
  const [isActive, setIsActive] = useState(false);
  const inputLabel = label?.trim() || "Field";

  function handleFocus() {
    setIsActive(true);
    onFocus?.();
  }

  function handleBlur() {
    setIsActive(value.length !== 0);
    onBlur?.();
  }

  return (
    <div className="relative">
      {type === "textarea" ? (
        <textarea
          className={`min-h-[140px] p-4 w-full bg-white border rounded-[20px] resize-y ${
            hasError ? "border-[#B42318]" : "border-black/15"
          } ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
          required={required}
          value={value}
          placeholder=""
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ) : (
        <input
          className={`h-12 pl-5 w-full bg-white border rounded-full ${
            hasError ? "border-[#B42318]" : "border-black/15"
          } ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
          required={required}
          type={type}
          value={value}
          placeholder=""
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}

      <label
        className={`${
          isActive || value
            ? "-top-4 text-[13px]"
            : "top-2 text-[16px]"
        } absolute left-4 bg-white px-3 py-1 rounded-full pointer-events-none text-body-secondary `}
      >
        {inputLabel} {required && <span className="text-red-600">*</span>}
      </label>
    </div>
  );
}
