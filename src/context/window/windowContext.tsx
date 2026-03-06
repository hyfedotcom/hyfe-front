"use client";

import { createContext, useMemo, useContext, useState, useEffect } from "react";
import { useWindowSize } from "react-use";

type WindowContextProps = {
  width: number;
  height: number;
  isReady: boolean;
};

export const WindowContext = createContext<WindowContextProps>({
  width: 0,
  height: 0,
  isReady: false,
});

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowSize();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReady(true);
  }, []);

  const value = useMemo(
    () => ({
      // Даем дефолтные значения "среднего" экрана для сервера
      width: width || 1200,
      height: height || 800,
      isReady,
    }),
    [width, height, isReady],
  );

  return <WindowContext value={value}>{children}</WindowContext>;
}

export const useWindowMetrics = () => useContext(WindowContext);
