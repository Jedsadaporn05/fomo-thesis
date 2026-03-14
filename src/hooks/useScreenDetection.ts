import { useState, useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useScreenDetection() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const lastBreakpoint = useRef<string>("");
  const timeoutRefs = useRef<
    Record<string, ReturnType<typeof setTimeout> | null>
  >({});

  const clearRefTimeout = (key: string) => {
    if (timeoutRefs.current[key]) {
      clearTimeout(timeoutRefs.current[key]);
      timeoutRefs.current[key] = null;
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 319px)");
    const handleSmallScreenChange = (
      e: MediaQueryListEvent | MediaQueryList,
    ) => {
      setIsSmallScreen(e.matches);
    };

    handleSmallScreenChange(mediaQuery);
    mediaQuery.addEventListener("change", handleSmallScreenChange);

    const getBreakpoint = () => {
      const w = window.innerWidth;
      if (w < 640) return "sm";
      if (w < 768) return "md";
      if (w < 1024) return "lg";
      if (w < 1280) return "xl";
      return "2xl";
    };

    lastBreakpoint.current = getBreakpoint();

    const handleResizeForGSAP = () => {
      if (mediaQuery.matches) return;
      const current = getBreakpoint();

      if (current !== lastBreakpoint.current) {
        lastBreakpoint.current = current;
        setIsRefreshing(true);

        clearRefTimeout("resize");
        timeoutRefs.current.resize = setTimeout(() => {
          try {
            if (typeof ScrollTrigger !== "undefined") {
              ScrollTrigger.refresh(true);
            }
          } catch (error) {
            console.warn(
              "GSAP Refresh Error (usually from orphaned ScrollTriggers):",
              error,
            );
          }

          clearRefTimeout("refresh");
          timeoutRefs.current.refresh = setTimeout(() => {
            setIsRefreshing(false);
          }, 150);
        }, 250);
      }
    };

    window.addEventListener("resize", handleResizeForGSAP, { passive: true });
    window.addEventListener("orientationchange", handleResizeForGSAP, {
      passive: true,
    });

    const currentTimeouts = timeoutRefs.current;

    return () => {
      mediaQuery.removeEventListener("change", handleSmallScreenChange);
      window.removeEventListener("resize", handleResizeForGSAP);
      window.removeEventListener("orientationchange", handleResizeForGSAP);

      Object.values(currentTimeouts).forEach((t) => t && clearTimeout(t));
    };
  }, []);

  return { isRefreshing, isSmallScreen };
}
