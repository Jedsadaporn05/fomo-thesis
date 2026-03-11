"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import dynamic from "next/dynamic";

import Preloader from "@/src/components/Preloader";
import MainNav from "@/src/components/layout/MainNav";
import HeroSection from "@/src/components/home/HeroSection";
import SmallScreenOverlay from "./SmallScreenOverlay";
import { useAudioStore } from "@/src/store/useAudioStore";
import SoundConsentModal from "./SoundConsentModal";

const KnowledgeSection = dynamic(
  () => import("@/src/components/home/KnowledgeSection"),
  { ssr: false },
);
const MemberSection = dynamic(
  () => import("@/src/components/home/MemberSection"),
  { ssr: false },
);

gsap.registerPlugin(ScrollTrigger);

export default function HomeWrapper() {
  const [isReady, setIsReady] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const playBGM = useAudioStore((s) => s.playBGM);
  const permission = useAudioStore((s) => s.permission);

  const lastBreakpoint = useRef<string>("");

  const timeoutRefs = useRef<
    Record<string, ReturnType<typeof setTimeout> | null>
  >({
    resize: null,
    refresh: null,
    ready: null,
    load: null,
  });

  // Cleanup helper with proper typing
  const clearRefTimeout = (key: string) => {
    const timeout = timeoutRefs.current[key];
    if (timeout) {
      clearTimeout(timeout);
      timeoutRefs.current[key] = null;
    }
  };

  // Audio Playback
  useEffect(() => {
    if (permission === "granted") {
      playBGM("home", "/sounds/music/homepage-bgm.mp3");
    }
  }, [permission, playBGM]);

  // Screen Check & Breakpoint Logic
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
          ScrollTrigger.refresh(true);

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

    const currentTimeouts = { ...timeoutRefs.current };

    return () => {
      mediaQuery.removeEventListener("change", handleSmallScreenChange);
      window.removeEventListener("resize", handleResizeForGSAP);
      window.removeEventListener("orientationchange", handleResizeForGSAP);
      Object.keys(currentTimeouts).forEach((key) => {
        const timeout = currentTimeouts[key];
        if (timeout) {
          clearTimeout(timeout);
        }
      });
    };
  }, []);

  const handlePreloaderComplete = () => setIsReady(true);
  const preloaderActive = !isReady || isRefreshing;

  // Body Scroll Management & Initial Refresh
  useEffect(() => {
    if (preloaderActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";

      clearRefTimeout("ready");
      timeoutRefs.current.ready = setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 150);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [preloaderActive]);

  // Window Load Fallback
  useEffect(() => {
    const handleWindowLoad = () => {
      clearRefTimeout("load");
      timeoutRefs.current.load = setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 300);
    };

    if (document.readyState === "complete") {
      handleWindowLoad();
    } else {
      window.addEventListener("load", handleWindowLoad, { once: true });
      return () => window.removeEventListener("load", handleWindowLoad);
    }
  }, []);

  if (isSmallScreen) {
    return <SmallScreenOverlay />;
  }

  return (
    <>
      {preloaderActive && <Preloader onComplete={handlePreloaderComplete} />}

      <SoundConsentModal />
      <div
        aria-hidden={preloaderActive}
        style={{
          opacity: preloaderActive ? 0 : 1,
          pointerEvents: preloaderActive ? "none" : "auto",
          transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "opacity",
        }}
      >
        <MainNav />
        <HeroSection
          startAnimation={!preloaderActive && permission !== "unknown"}
        />
        <KnowledgeSection startAnimation={!preloaderActive} />
        <MemberSection />
      </div>
    </>
  );
}
