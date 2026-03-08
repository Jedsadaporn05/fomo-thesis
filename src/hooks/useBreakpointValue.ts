import { useState, useEffect } from "react";

type BreakpointMap<T> = {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

function getMatch<T>(values: BreakpointMap<T>): T | undefined {
  const width = window.innerWidth;

  const keys = (["2xl", "xl", "lg", "md", "sm"] as const).filter(
    (k) => k in values,
  );

  for (const key of keys) {
    if (width >= BREAKPOINTS[key]) return values[key];
  }

  return values.base;
}

export function useBreakpointValue<T>(values: BreakpointMap<T>) {
  const [value, setValue] = useState<T | undefined>(() => {
    if (typeof window === "undefined") return values.base;
    return getMatch(values);
  });

  useEffect(() => {
    const handler = () => setValue(getMatch(values));

    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [values]);

  return value;
}
