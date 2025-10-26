// components/layout/ResizeReloader.tsx
"use client";

import { useEffect } from "react";

export default function ResizeLoader() {
  useEffect(() => {
    let resizeTimer: string | number | NodeJS.Timeout | undefined;

    const handleResize = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        console.log("Resizing finished. Reloading window...");
        window.location.reload();
      }, 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return null;
}
