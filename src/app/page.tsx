"use client";

import MainNav from "@/components/layout/MainNav";
import MainHeroSection from "@/components/home/MainHeroSection";
import KnowledgeSection from "@/components/home/KnowledgeSection";
import MemberSection from "@/components/home/MemberSection";
import { useState } from "react";
import Preloader from "@/components/Preloader";
import { useSound } from "@/context/SoundContext";

export default function HomePage() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [heroStart, setHeroStart] = useState(false);

  const { enableAudio } = useSound();

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setHeroStart(true);
    enableAudio();
  };

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {!showPreloader && (
        <>
          <MainNav />
          <MainHeroSection startAnimation={heroStart} />
          <KnowledgeSection />
          <MemberSection />
        </>
      )}
    </>
  );
}
