"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Preloader from "@/src/components/Preloader";
import Navbar from "./layout/Navbar";
import HeroSection from "@/src/components/home/HeroSection";
import SmallScreenOverlay from "./SmallScreenOverlay";
import SoundConsentModal from "./SoundConsentModal";
import { useScreenDetection } from "@/src/hooks/useScreenDetection";
import { useHomeAudio } from "@/src/hooks/useHomeAudio";

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
  const { isRefreshing, isSmallScreen } = useScreenDetection();

  useHomeAudio();

  const handlePreloaderComplete = () => setIsReady(true);
  const preloaderActive = !isReady || isRefreshing;

  // GSAP Refresh
  useEffect(() => {
    if (preloaderActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const timer = setTimeout(() => ScrollTrigger.refresh(true), 150);
      return () => clearTimeout(timer);
    }
  }, [preloaderActive]);

  if (isSmallScreen) return <SmallScreenOverlay />;

  return (
    <>
      {preloaderActive && <Preloader onComplete={handlePreloaderComplete} />}
      <SoundConsentModal isReady={!preloaderActive} />

      <div
        aria-hidden={preloaderActive}
        style={{
          opacity: preloaderActive ? 0 : 1,
          pointerEvents: preloaderActive ? "none" : "auto",
          transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "opacity",
        }}
      >
        <Navbar />
        <HeroSection startAnimation={!preloaderActive} />
        <KnowledgeSection startAnimation={!preloaderActive} />
        <MemberSection />
      </div>
    </>
  );
}
