"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Logo from "@/public/logo/LogoGracie.png";

gsap.registerPlugin(ScrollTrigger);

interface PreloaderProps {
  onComplete: () => void;
}

const PRELOADED_KEY = "isPreloaded";

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isResourcesReady, setIsResourcesReady] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleLoad = () => setIsResourcesReady(true);

    if (document.readyState === "complete") {
      setIsResourcesReady(true);
    } else {
      window.addEventListener("load", handleLoad);
    }

    // If loading takes more than 12 seconds, force finish
    const safetyTimeout = setTimeout(() => {
      if (!isResourcesReady) {
        setIsResourcesReady(true);
      }
    }, 12000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(safetyTimeout);
    };
  }, [isResourcesReady]);

  // Main Animation Logic
  useEffect(() => {
    if (!containerRef.current) return;

    document.body.style.overflow = "hidden";
    lenis?.stop();

    let isMounted = true;
    const isCached = sessionStorage.getItem(PRELOADED_KEY);

    const exitPreloader = () => {
      if (!isMounted) return;
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          document.body.style.overflow = "";
          lenis?.start();
          ScrollTrigger.refresh(true);
          sessionStorage.setItem(PRELOADED_KEY, "true");
          onComplete();
        },
      });
    };

    // Fast track for cached users
    if (isCached) {
      gsap.to(
        { val: 0 },
        {
          val: 100,
          duration: 0.6,
          ease: "power2.out",
          onUpdate: function () {
            const p = Math.round(this.targets()[0].val);
            setProgress(p);
            if (progressBarRef.current)
              progressBarRef.current.style.width = `${p}%`;
          },
          onComplete: exitPreloader,
        },
      );
      return;
    }

    // Timeline for non-cached users
    const masterTl = gsap.timeline();

    masterTl.to(
      { val: 0 },
      {
        val: 70,
        duration: 1.5,
        ease: "power1.inOut",
        onUpdate: function () {
          const p = Math.round(this.targets()[0].val);
          setProgress(p);
          if (progressBarRef.current)
            progressBarRef.current.style.width = `${p}%`;
        },
      },
    );

    masterTl.to(
      { val: 70 },
      {
        val: 90,
        duration: 10,
        ease: "none",
        onUpdate: function () {
          const p = Math.round(this.targets()[0].val);
          setProgress(p);
          if (progressBarRef.current)
            progressBarRef.current.style.width = `${p}%`;
        },
      },
    );

    // Handle sudden resource readiness
    if (isResourcesReady) {
      masterTl.kill();
      gsap.to(
        { val: progress },
        {
          val: 100,
          duration: 0.5,
          ease: "power2.out",
          onUpdate: function () {
            const p = Math.round(this.targets()[0].val);
            setProgress(p);
            if (progressBarRef.current)
              progressBarRef.current.style.width = `${p}%`;
          },
          onComplete: exitPreloader,
        },
      );
    }

    return () => {
      isMounted = false;
      masterTl.kill();
      document.body.style.overflow = "";
      lenis?.start();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis, onComplete, isResourcesReady]);
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-[#0a1738] text-white"
      role="progressbar"
      aria-busy="true"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="กำลังโหลดเนื้อหา FOMO"
    >
      <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 w-full max-w-70 min-[400px]:max-w-[320px] sm:max-w-100 md:max-w-125 3xl:max-w-150 px-6">
        <video
          src="/logo/LogoGracie.webm"
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="hidden xl:block w-full h-auto max-w-40 min-[400px]:max-w-50 sm:max-w-70 md:max-w-80 3xl:max-w-100 object-contain pointer-events-none"
        />
        <Image
          src={Logo}
          alt="FOMO The Missing Out - Loading Logo"
          width={500}
          height={500}
          priority
          className="block xl:hidden w-full h-auto max-w-37.5 min-[400px]:max-w-45 sm:max-w-60 md:max-w-75 3xl:max-w-90 object-contain pointer-events-none"
        />

        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-1 min-[400px]:h-1.5 sm:h-2 md:h-2.5 bg-gray-800/50 rounded-full overflow-hidden border border-white/10">
            <div
              ref={progressBarRef}
              className="h-full w-0 bg-[#FF2D77] shadow-[0_0_12px_#FF2D77] will-change-[width]"
            />
          </div>
          <div className="flex justify-between items-end text-gray-300">
            <span className="text-[10px] min-[400px]:text-xs sm:text-sm md:text-base font-medium tracking-widest uppercase">
              Loading
            </span>
            <span className="text-sm min-[400px]:text-base sm:text-lg md:text-xl font-bold text-white leading-none tabular-nums">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
