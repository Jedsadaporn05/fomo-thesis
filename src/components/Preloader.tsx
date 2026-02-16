"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

import Logo from "@/public/logo/LogoGracie.png";

gsap.registerPlugin(ScrollTrigger);

interface PreloaderProps {
  onComplete: () => void;
}

const PRELOADED_KEY = "app-preloaded";
const MAX_PROGRESS = 85;

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  const updateProgress = (value: number) => {
    setProgress(value);

    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${value}%`,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

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
        scale: 1.05,
        filter: "blur(12px)",
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          document.body.style.overflow = "";
          lenis?.start();
          ScrollTrigger.refresh();
          sessionStorage.setItem(PRELOADED_KEY, "true");
          onComplete();
        },
      });
    };

    if (isCached) {
      updateProgress(80);

      const t = setTimeout(() => {
        updateProgress(100);
        setTimeout(exitPreloader, 250);
      }, 400);

      return () => {
        isMounted = false;
        clearTimeout(t);
        document.body.style.overflow = "";
        lenis?.start();
      };
    }

    const tl = gsap.timeline();

    tl.to(
      {},
      {
        duration: 1.0,
        onUpdate() {
          if (!isMounted) return;
          const p = Math.round(this.progress() * 70);
          updateProgress(p);
        },
      },
    )
      .to(
        {},
        {
          duration: 0.8,
          onUpdate() {
            if (!isMounted) return;
            const p = 70 + Math.round(this.progress() * (MAX_PROGRESS - 70));
            updateProgress(p);
          },
        },
      )
      .to(
        {},
        {
          duration: 0.3,
          onComplete() {
            if (!isMounted) return;
            updateProgress(100);
            setTimeout(exitPreloader, 300);
          },
        },
      );

    return () => {
      isMounted = false;
      tl.kill();
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [lenis, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-[#0a1738] text-white"
    >
      <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 w-full max-w-70 min-[400px]:max-w-[320px] sm:max-w-100 md:max-w-125 lg:max-w-150 px-6">
        <Image
          src={Logo}
          alt="preloaderLogo"
          width={500}
          height={500}
          priority
          className="w-full h-auto max-w-37.5 min-[400px]:max-w-45 sm:max-w-60 md:max-w-75 lg:max-w-90 object-contain"
        />
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-1 min-[400px]:h-1.5 sm:h-2 md:h-2.5 bg-gray-800/50 rounded-full overflow-hidden border border-white/10">
            <div
              ref={progressBarRef}
              className="h-full w-0 bg-[#FF2D77] shadow-[0_0_12px_#FF2D77]"
            />
          </div>

          <div className="flex justify-between items-end text-gray-300">
            <span className="text-[10px] min-[400px]:text-xs sm:text-sm md:text-base font-medium tracking-widest">
              LOADING
            </span>
            <span className="text-sm min-[400px]:text-base sm:text-lg md:text-xl font-bold text-white leading-none">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
