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
