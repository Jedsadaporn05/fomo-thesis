"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Logo from "@/public/logo/LogoGracie.png";
import useIsDesktop from "@/src/hooks/useIsDesktop";

gsap.registerPlugin(ScrollTrigger);

interface PreloaderProps {
  onComplete: () => void;
}

const PRELOADED_KEY = "isPreloaded";

const ASSETS_TO_LOAD = {
  images: [
    "/home/knowledge-section/Title-FOMO.png",
    "/home/knowledge-section/Title-QuestionMark.png",
    "/home/member-section/MembersBg-Mockup.png",
    "/home/member-section/MembersBg-Mobile-Mockup.png",
    "/home/member-section/Advisor.png",
    "/home/member-section/Q.png",
    "/home/member-section/Ohm.png",
    "/home/member-section/New.png",
  ],
  interface: ["/logo/LogoGracie.png", "/logo/LogoGracie.webm"],
  heroVideo: {
    desktop: "https://cdn.fomo-gracie.com/video/hero/hero-video.mp4",
    mobile: "https://cdn.fomo-gracie.com/video/hero/hero-video-mobile.mp4",
  },
  knowledgeVideos: [
    {
      desktop:
        "https://cdn.fomo-gracie.com/video/knowledge/knowledge-video-1.mp4",
      mobile:
        "https://cdn.fomo-gracie.com/video/knowledge/knowledge-video-1-mobile.mp4",
    },
    {
      desktop:
        "https://cdn.fomo-gracie.com/video/knowledge/knowledge-video-2.mp4",
      mobile:
        "https://cdn.fomo-gracie.com/video/knowledge/knowledge-video-2-mobile.mp4",
    },
    {
      desktop:
        "https://cdn.fomo-gracie.com/video/knowledge/knowledge-video-3.mp4",
      mobile:
        "https://cdn.fomo-gracie.com/video/knowledge/knowledge-video-3-mobile.mp4",
    },
  ],
};

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing...");
  const [isReadyToExit, setIsReadyToExit] = useState(false);
  const lenis = useLenis();
  const isDesktop = useIsDesktop();

  const initialIsDesktopRef = useRef(isDesktop);
  const loadedCountRef = useRef(0);
  const hasStartedPreloading = useRef(false);

  const totalAssets =
    ASSETS_TO_LOAD.images.length +
    ASSETS_TO_LOAD.interface.length +
    1 +
    ASSETS_TO_LOAD.knowledgeVideos.length;

  const finishLoading = useCallback(() => {
    setStatusText("Ready to Start");
    setIsReadyToExit(true);
  }, []);

  useEffect(() => {
    const isCached = sessionStorage.getItem(PRELOADED_KEY);

    if (isCached) {
      setProgress(100);
      finishLoading();
      return;
    }

    if (hasStartedPreloading.current) return;
    hasStartedPreloading.current = true;

    const isDesktopMode = initialIsDesktopRef.current;

    let hasFinished = false;

    const safetyTimeout = setTimeout(() => {
      if (!hasFinished) {
        hasFinished = true;
        setProgress(100);
        finishLoading();
      }
    }, 15000);

    const updateProgress = () => {
      if (hasFinished) return;
      loadedCountRef.current += 1;

      const currentPercent = Math.min(
        Math.round((loadedCountRef.current / totalAssets) * 90),
        90,
      );

      setProgress(currentPercent);

      if (loadedCountRef.current < ASSETS_TO_LOAD.images.length) {
        setStatusText("Loading Assets...");
      } else if (loadedCountRef.current < totalAssets - 2) {
        setStatusText("Loading Media...");
      } else {
        setStatusText("Finalizing Setup...");
      }

      if (loadedCountRef.current >= totalAssets) {
        if (document.readyState === "complete") {
          hasFinished = true;
          setProgress(100);
          finishLoading();
          clearTimeout(safetyTimeout);
        } else {
          window.addEventListener(
            "load",
            () => {
              if (hasFinished) return;
              hasFinished = true;
              setProgress(100);
              finishLoading();
              clearTimeout(safetyTimeout);
            },
            { once: true },
          );
        }
      }
    };

    // Preload Images
    ASSETS_TO_LOAD.images.forEach((src) => {
      const img = new window.Image();
      img.onload = updateProgress;
      img.onerror = updateProgress;
      img.src = src;
    });

    // Preload Interface
    ASSETS_TO_LOAD.interface.forEach((src) => {
      if (src.endsWith(".webm")) {
        const video = document.createElement("video");
        video.onloadedmetadata = updateProgress;
        video.onerror = updateProgress;
        video.src = src;
        video.load();
      } else {
        const img = new window.Image();
        img.onload = updateProgress;
        img.onerror = updateProgress;
        img.src = src;
      }
    });

    // Preload Hero Video
    const heroVideoUrl = isDesktopMode
      ? ASSETS_TO_LOAD.heroVideo.desktop
      : ASSETS_TO_LOAD.heroVideo.mobile;
    const heroVid = document.createElement("video");
    heroVid.onloadedmetadata = updateProgress;
    heroVid.onerror = updateProgress;
    heroVid.src = heroVideoUrl;
    heroVid.load();

    // Preload Knowledge Section Videos
    ASSETS_TO_LOAD.knowledgeVideos.forEach((vidSource) => {
      const vidUrl = isDesktopMode ? vidSource.desktop : vidSource.mobile;
      const vid = document.createElement("video");
      vid.onloadedmetadata = updateProgress;
      vid.onerror = updateProgress;
      vid.src = vidUrl;
      vid.load();
    });

    return () => {
      clearTimeout(safetyTimeout);
    };
  }, [finishLoading, totalAssets]);

  useEffect(() => {
    if (!progressBarRef.current || !containerRef.current) return;

    gsap.to(progressBarRef.current, {
      width: `${progress}%`,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        if (progress === 100 && isReadyToExit) {
          gsap.to(containerRef.current, {
            opacity: 0,
            y: -30,
            duration: 0.8,
            delay: 0.5,
            ease: "power3.inOut",
            onComplete: () => {
              document.body.style.overflow = "";
              lenis?.start();
              ScrollTrigger.refresh(true);
              sessionStorage.setItem(PRELOADED_KEY, "true");
              onComplete();
            },
          });
        }
      },
    });
  }, [progress, isReadyToExit, lenis, onComplete]);

  // Initial scroll lock
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenis) {
      lenis.stop();
    }
    document.documentElement.classList.add("lock-scroll");
    document.body.classList.add("lock-scroll");

    return () => {
      document.documentElement.classList.remove("lock-scroll");
      document.body.classList.remove("lock-scroll");

      if (lenis) {
        lenis.start();
      }
    };
  }, [lenis]);

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
          className="hidden xl:block w-full h-auto max-w-40 min-[400px]:max-w-50 sm:max-w-70 md:max-w-80 3xl:max-w-100 object-contain pointer-events-none landscape:w-30 landscape:sm:w-40 landscape:md:w-60 landscape:lg:w-100"
        />
        <Image
          src={Logo}
          alt="FOMO The Missing Out - Loading Logo"
          width={500}
          height={500}
          priority
          className="block xl:hidden w-full h-auto max-w-37.5 min-[400px]:max-w-45 sm:max-w-60 md:max-w-75 3xl:max-w-90 object-contain pointer-events-none landscape:w-30 landscape:sm:w-40 landscape:md:w-60 landscape:lg:w-100"
        />

        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-1 min-[400px]:h-1.5 sm:h-2 md:h-2.5 bg-gray-800/50 rounded-full overflow-hidden border border-white/10 landscape:text-h-0.5 landscape:sm:h-1.5 landscape:md:h-2.5">
            <div
              ref={progressBarRef}
              className="h-full w-0 bg-[#FF2D77] shadow-[0_0_12px_#FF2D77] will-change-[width]"
            />
          </div>
          <div className="flex justify-between items-start text-gray-300">
            <span className="text-[10px] min-[400px]:text-xs sm:text-sm md:text-base font-medium tracking-widest uppercase landscape:text-[9px] landscape:sm:text-[10px] landscape:md:text-sm">
              {statusText}
            </span>
            <span className="text-[10px] min-[400px]:text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white leading-none tabular-nums mt-1 landscape:text-[9px] landscape:sm:text-[10px] landscape:md:text-sm landscape:lg:text-lg">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
