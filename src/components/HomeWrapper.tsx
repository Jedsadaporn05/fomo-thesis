"use client";

import { useEffect, useState } from "react";
import Preloader from "@/src/components/Preloader";
import MainNav from "@/src/components/layout/MainNav";
import MainHeroSection from "@/src/components/home/MainHeroSection";
import KnowledgeSection from "@/src/components/home/KnowledgeSection";
import MemberSection from "@/src/components/home/MemberSection";
import { useAudioStore } from "@/src/store/useAudioStore";

export default function HomeWrapper() {
  const [isReady, setIsReady] = useState(false);
  const playBGM = useAudioStore((s) => s.playBGM);
  const permission = useAudioStore((s) => s.permission);

  useEffect(() => {
    if (permission === "granted") {
      playBGM("home", "/sounds/music/bgm-1.mp3");
    }
  }, [permission]);

  const handlePreloaderComplete = () => {
    setIsReady(true);
  };

  // Handle Resize Force Refresh for GSAP stability
  useEffect(() => {
    let currentWidth = window.innerWidth;
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      if (window.innerWidth !== currentWidth) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          currentWidth = window.innerWidth;
          window.location.reload();
        }, 500);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {!isReady && <Preloader onComplete={handlePreloaderComplete} />}

      {isReady && (
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
