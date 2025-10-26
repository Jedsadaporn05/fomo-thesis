// components/layout/Preloader.tsx
"use client";

import { useState, useEffect } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      console.log("Window fully loaded. Hiding preloader.");
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div
      className={`
        fixed inset-0 z-[9999] 
        flex justify-center items-center 
        bg-black
        transition-opacity duration-500 ease-in-out
        ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <h1 className="text-4xl font-bold text-white">Loading..</h1>
    </div>
  );
}
