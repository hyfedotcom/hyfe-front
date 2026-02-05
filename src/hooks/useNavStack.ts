"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const KEY = "__nav_stack";

export function useNavStack() {
  const pathname = usePathname();

  useEffect(() => {
    // только в браузере
    const raw = sessionStorage.getItem(KEY);
    const stack: string[] = raw ? JSON.parse(raw) : [];

    // не пушим дубликат
    if (stack[stack.length - 1] !== pathname) {
      stack.push(pathname);
      // ограничим размер
      if (stack.length > 30) stack.shift();
      sessionStorage.setItem(KEY, JSON.stringify(stack));
    }
  }, [pathname]);

  const hasInternalBack = () => {
    const raw = sessionStorage.getItem(KEY);
    const stack: string[] = raw ? JSON.parse(raw) : [];
    return stack.length >= 2;
  };

  return { hasInternalBack };
}
