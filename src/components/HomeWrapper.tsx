"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Preloader from "@/src/components/Preloader";
import MainNav from "@/src/components/layout/MainNav";
import MainHeroSection from "@/src/components/home/MainHeroSection";
import KnowledgeSection from "@/src/components/home/KnowledgeSection";
import MemberSection from "@/src/components/home/MemberSection";
import { useAudioStore } from "@/src/store/useAudioStore";
import SmallScreenOverlay from "./SmallScreenOverlay";

gsap.registerPlugin(ScrollTrigger);

export default function HomeWrapper() {
  const [isReady, setIsReady] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const playBGM = useAudioStore((s) => s.playBGM);
  const permission = useAudioStore((s) => s.permission);

  // Check if screen is less then <320px
  useEffect(() => {
    const checkSize = () => {
      setIsSmallScreen(window.innerWidth < 320);
    };

    checkSize();
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    if (permission === "granted") {
      playBGM("home", "/sounds/music/bgm-1.mp3");
    }
  }, [permission, playBGM]);

  const handlePreloaderComplete = () => {
    setIsReady(true);
  };

  const lastBreakpoint = useRef<string>("");

  // Handle Resize Force Refresh for GSAP stability
  useEffect(() => {
    if (isSmallScreen) return;

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

    const handleResize = () => {
      const current = getBreakpoint();

      if (current !== lastBreakpoint.current) {
        lastBreakpoint.current = current;

        if (timeoutId) clearTimeout(timeoutId);

        setIsRefreshing(true);

        timeoutId = window.setTimeout(() => {
          ScrollTrigger.refresh(true);

          window.setTimeout(() => {
            setIsRefreshing(false);
          }, 300);
        }, 200);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isSmallScreen]);

  const preloader = !isReady || isRefreshing;

  return (
    <>
      {isSmallScreen && <SmallScreenOverlay />}

      {!isSmallScreen && preloader && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {!isSmallScreen && !preloader && (
        <>
          <MainNav />
          <MainHeroSection startAnimation={permission !== "unknown"} />
          <KnowledgeSection />
          <MemberSection />
        </>
      )}
    </>
  );
}
