"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

import Logo from "@/public/logo/LogoGracieShadow.gif";

gsap.registerPlugin(ScrollTrigger);

interface PreloaderProps {
  onComplete: () => void;
}

const PRELOADED_KEY = "app-preloaded";

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!containerRef.current) return;

    document.body.style.overflow = "hidden";
    lenis?.stop();

    let isMounted = true;
    let loadedCount = 0;

    const isCached = sessionStorage.getItem(PRELOADED_KEY);

    // assets to preload
    const assets = ["/home/hero-section/HeroStart.mp4"];

    const TOTAL = assets.length + 1;
    const MAX_PROGRESS = 85;

    const updateProgress = (value: number) => {
      if (!isMounted) return;

      setProgress(value);

      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          width: `${value}%`,
          duration: 0.25,
          ease: "power2.out",
        });
      }
    };

    const exitPreloader = () => {
      if (!isMounted) return;

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          document.body.style.overflow = "";
          lenis?.start();
          ScrollTrigger.refresh();
          sessionStorage.setItem(PRELOADED_KEY, "true");
          onComplete();
        },
      });

      tl.to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        filter: "blur(12px)",
        duration: 0.6,
      });
    };

    const checkCompletion = () => {
      loadedCount++;

      const value = Math.min(
        MAX_PROGRESS,
        Math.round((loadedCount / TOTAL) * MAX_PROGRESS),
      );

      updateProgress(value);

      if (loadedCount >= TOTAL) {
        gsap.to(
          {},
          {
            duration: 0.3,
            onComplete: () => {
              updateProgress(100);
              setTimeout(exitPreloader, 300);
            },
          },
        );
      }
    };

    // cached mode
    if (isCached) {
      updateProgress(80);

      setTimeout(() => {
        updateProgress(100);
        setTimeout(exitPreloader, 300);
      }, 400);

      return () => {
        document.body.style.overflow = "";
        lenis?.start();
      };
    }

    const minTime = setTimeout(checkCompletion, 800);

    // assets preload
    assets.forEach((src) => {
      fetch(src)
        .then(() => checkCompletion())
        .catch(() => checkCompletion());
    });

    const safety = setTimeout(() => {
      updateProgress(100);
      exitPreloader();
    }, 5000);

    return () => {
      isMounted = false;
      clearTimeout(minTime);
      clearTimeout(safety);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [lenis, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a1738] text-white"
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-md px-8">
        <Image
          src={Logo}
          alt="Logo"
          width={250}
          height={250}
          priority
          unoptimized
          loading="eager"
          className="w-full max-w-[250px] 2xl:max-w-[500px] object-contain"
        />

        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-1.5 bg-gray-800/50 rounded-full overflow-hidden border border-white/10">
            <div
              ref={progressBarRef}
              className="h-full w-0 bg-[#FF2D77] shadow-[0_0_12px_#FF2D77]"
            />
          </div>

          <div className="flex justify-between text-sm text-gray-300">
            <span>LOADING</span>
            <span className="text-lg text-white">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
