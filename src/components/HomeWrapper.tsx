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

  useEffect(() => {
    if (permission === "granted") {
      playBGM("home", "/sounds/music/homepage-bgm.mp3");
    }
  }, [permission, playBGM]);

  const lastBreakpoint = useRef<string>("");

  // Handle Resize Force Refresh for GSAP stability and Check if screen is less then <320px
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
    let timeoutId: number | null = null;

    const handleResizeForGSAP = () => {
      if (mediaQuery.matches) return;

      const current = getBreakpoint();

      if (current !== lastBreakpoint.current) {
        lastBreakpoint.current = current;

        if (timeoutId) clearTimeout(timeoutId);

        setIsRefreshing(true);

        timeoutId = window.setTimeout(() => {
          ScrollTrigger.refresh(true);

          window.setTimeout(() => {
            setIsRefreshing(false);
          }, 150);
        }, 200);
      }
    };

    window.addEventListener("resize", handleResizeForGSAP);
    window.addEventListener("orientationchange", handleResizeForGSAP);

    return () => {
      mediaQuery.removeEventListener("change", handleSmallScreenChange);
      window.removeEventListener("resize", handleResizeForGSAP);
      window.removeEventListener("orientationchange", handleResizeForGSAP);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handlePreloaderComplete = () => setIsReady(true);
  const preloader = !isReady || isRefreshing;

  useEffect(() => {
    if (preloader) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";

      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 100);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [preloader]);

  useEffect(() => {
    const handleWindowLoad = () => {
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 200);
    };

    if (document.readyState === "complete") {
      handleWindowLoad();
    } else {
      window.addEventListener("load", handleWindowLoad);
    }

    return () => window.removeEventListener("load", handleWindowLoad);
  }, []);

  if (isSmallScreen) {
    return <SmallScreenOverlay />;
  }

  return (
    <>
      {preloader && <Preloader onComplete={handlePreloaderComplete} />}

      <div
        style={{
          opacity: preloader ? 0 : 1,
          pointerEvents: preloader ? "none" : "auto",
          transition: "opacity 0.4s ease",
        }}
      >
        <MainNav />
        <HeroSection startAnimation={!preloader && permission !== "unknown"} />
        <KnowledgeSection startAnimation={!preloader} />
        <MemberSection />
      </div>
    </>
  );
}
