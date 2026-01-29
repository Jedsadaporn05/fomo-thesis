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

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!containerRef.current) return;

    // Lock scroll
    document.body.style.overflow = "hidden";
    lenis?.stop();

    // Exit preloader
    const exitPreloader = () => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          document.body.style.overflow = "";
          lenis?.start();

          // Refresh all ScrollTriggers after layout is visible
          ScrollTrigger.refresh();
          onComplete();
        },
      });

      tl.to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        filter: "blur(12px)",
        duration: 0.7,
      });
    };

    // Image Preload Logic
    const images = Array.from(document.images);
    const total = images.length || 1;
    let loaded = 0;

    const updateProgress = () => {
      loaded += 1;
      const value = Math.min(100, Math.round((loaded / total) * 100));

      setProgress(value);

      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          width: `${value}%`,
          duration: 0.25,
          ease: "power2.out",
        });
      }

      if (loaded >= total) {
        exitPreloader();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        updateProgress();
      } else {
        img.addEventListener("load", updateProgress, { once: true });
        img.addEventListener("error", updateProgress, { once: true });
      }
    });

    return () => {
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
        {/* Logo */}
        <Image
          src={Logo}
          alt="Logo"
          priority
          unoptimized
          className="w-full max-w-[250px] 2xl:max-w-[500px] object-contain"
        />
        {/* Progress */}
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-1.5 bg-gray-800/50 rounded-full overflow-hidden border border-white/10">
            <div
              ref={progressBarRef}
              className="h-full w-0 bg-[#FF2D77] shadow-[0_0_12px_#FF2D77]"
            />
          </div>

          <div className="flex justify-between text-sm text-gray-300">
            <span>LOADING ASSETS</span>
            <span className="text-lg text-white">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
