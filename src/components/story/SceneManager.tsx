"use client";

import { useStoryStore } from "@/src/store/useStoryStore";
import { useAudioStore } from "@/src/store/useAudioStore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Interaction, SceneConfig } from "./SceneConfig";
import Navbar from "../layout/Navbar";
import StartStory from "./StartStory";
import { useVideoPreloader } from "@/src/hooks/useVideoPreloader";
import SmallScreenOverlay from "../SmallScreenOverlay";
import { useScreenDetection } from "@/src/hooks/useScreenDetection";
import InteractiveManager from "./interactive/InteractiveManager";
import gsap from "gsap";
import { useClickSound } from "@/src/hooks/useClickSound";
import LandscapeSuggestion from "../LandscapeSuggestion";

export default function SceneManager() {
  const playClickSound = useClickSound();
  const { isSmallScreen } = useScreenDetection();
  const hasHydrated = useStoryStore((state) => state._hasHydrated);
  const currentSceneId = useStoryStore((state) => state.currentSceneId);
  const isStoryStarted = useStoryStore((state) => state.isStoryStarted);
  const goToScene = useStoryStore((state) => state.goToScene);
  const isPaused = useStoryStore((state) => state.isPaused);
  const isInteractionPaused = useStoryStore(
    (state) => state.isInteractionPaused,
  );
  const setInteractionPaused = useStoryStore(
    (state) => state.setInteractionPaused,
  );
  const score = useStoryStore((state) => state.score);

  const videoVolume = useAudioStore((state) => state.videoVolume);
  const bgmEnabled = useAudioStore((state) => state.bgmEnabled);
  const syncVideoVolume = useAudioStore((state) => state.syncVideoVolume);

  const [canProceed, setCanProceed] = useState(false);
  const canProceedRef = useRef(false);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  const [activeVideoNode, setActiveVideoNode] =
    useState<HTMLVideoElement | null>(null);

  const currentVideoRef = useRef<HTMLVideoElement>(null);

  const isVideoPaused = isPaused || isInteractionPaused;

  const currentScene = SceneConfig[currentSceneId];
  const nextSceneId = currentScene?.next;
  const nextScene = nextSceneId ? SceneConfig[nextSceneId] : null;
  const { autoNext } = currentScene;

  const getNextSceneByScore = useCallback(() => {
    const currentScore = useStoryStore.getState().score;
    if (currentScene.scoreBranch) {
      return currentScore >= currentScene.scoreBranch.threshold
        ? currentScene.scoreBranch.pass
        : currentScene.scoreBranch.fail;
    }
    return nextSceneId;
  }, [currentScene.scoreBranch, nextSceneId]);

  useEffect(() => {
    let spinnerTimer: ReturnType<typeof setTimeout>;

    if (!isVideoLoaded && !isAutoplayBlocked) {
      spinnerTimer = setTimeout(() => {
        setShowLoadingSpinner(true);
      }, 1500);
    } else {
      setShowLoadingSpinner(false);
    }

    return () => {
      if (spinnerTimer) clearTimeout(spinnerTimer);
    };
  }, [isVideoLoaded, isAutoplayBlocked]);

  // Handle Playback and Volume
  useEffect(() => {
    if (!activeVideoNode) return;

    const targetVolume = bgmEnabled ? videoVolume : 0;
    gsap.killTweensOf(activeVideoNode);

    if (isVideoPaused) {
      gsap.to(activeVideoNode, {
        volume: 0,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => activeVideoNode.pause(),
      });
    } else {
      activeVideoNode.muted = !bgmEnabled;
      const playPromise = activeVideoNode.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsAutoplayBlocked(false);
            gsap.to(activeVideoNode, {
              volume: targetVolume,
              duration: 0.8,
              ease: "power2.inOut",
            });
          })
          .catch((error) => {
            if (error.name === "NotAllowedError") {
              console.warn("Autoplay was prevented by the browser.");
              setIsAutoplayBlocked(true);
              activeVideoNode.volume = 0;
            } else {
              console.log("Play interrupted or pending:", error.name);
            }
          });
      }
    }

    return () => {
      gsap.killTweensOf(activeVideoNode);
    };
  }, [isVideoPaused, bgmEnabled, videoVolume, activeVideoNode]);

  useEffect(() => {
    canProceedRef.current = false;
    setCanProceed(false);
    setInteractionPaused(false);
    setIsVideoLoaded(false);
    setIsAutoplayBlocked(false);
  }, [currentSceneId, setInteractionPaused]);

  const handleInteractionTriggered = useCallback(
    (inter: Interaction) => {
      if (inter.pause) setInteractionPaused(true);
    },
    [setInteractionPaused],
  );

  const handleInteractionComplete = useCallback(() => {
    setInteractionPaused(false);

    if (currentVideoRef.current?.ended) {
      const target = getNextSceneByScore();
      if (target) goToScene(target);
    }
  }, [setInteractionPaused, getNextSceneByScore, goToScene]);

  const handleAllInteractionsComplete = useCallback(() => {
    canProceedRef.current = true;
    setCanProceed(true);

    if (currentScene.scoreBranch) {
      const target = getNextSceneByScore();
      if (target) goToScene(target);
    }
  }, [currentScene.scoreBranch, getNextSceneByScore, goToScene]);

  // Preload Management
  const preloadUrls = useMemo(() => {
    if (!currentScene) return [];

    const urls = new Set<string>();

    if (!isStoryStarted) {
      urls.add(currentScene.video);
    }

    if (currentScene.scoreBranch) {
      const passScene = SceneConfig[currentScene.scoreBranch.pass];
      const failScene = SceneConfig[currentScene.scoreBranch.fail];

      if (score >= currentScene.scoreBranch.threshold) {
        if (passScene) urls.add(passScene.video);
        if (failScene) urls.add(failScene.video);
      } else {
        if (failScene) urls.add(failScene.video);
        if (passScene) urls.add(passScene.video);
      }
    }

    if (nextScene) {
      urls.add(nextScene.video);
    }

    currentScene.interactions?.forEach((interaction) => {
      if (
        (interaction.type === "choice" || interaction.type === "ending") &&
        interaction.options
      ) {
        interaction.options.forEach((option) => {
          if (option.targetScene && SceneConfig[option.targetScene]) {
            urls.add(SceneConfig[option.targetScene].video);
          }
        });
      }
    });

    return Array.from(urls);
  }, [currentScene, isStoryStarted, nextScene, score]);

  useVideoPreloader(preloadUrls, 2000);

  useEffect(() => {
    syncVideoVolume(currentVideoRef.current);
  }, [videoVolume, bgmEnabled, currentSceneId, syncVideoVolume]);

  const handleVideoEnded = useCallback(() => {
    if (autoNext || canProceedRef.current) {
      const target = getNextSceneByScore();
      if (target) goToScene(target);
    }
  }, [autoNext, getNextSceneByScore, goToScene]);

  if (!currentScene) return null;

  if (isSmallScreen) return <SmallScreenOverlay />;

  if (!hasHydrated) {
    return <div className="w-full h-dvh bg-black" />;
  }

  return (
    <div className="relative w-full h-dvh bg-black flex justify-center items-center overflow-hidden">
      <AnimatePresence mode="wait">
        {!isStoryStarted ? (
          <motion.div
            key="start-story"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-50"
          >
            <LandscapeSuggestion />
            <StartStory />
          </motion.div>
        ) : (
          <motion.div
            key="story-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-full h-full flex justify-center items-center"
          >
            <div className="relative w-full aspect-video max-w-[calc(100dvh*(16/9))] max-h-[calc(100vw*(9/16))] bg-black shrink-0 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <Navbar />
              <motion.div
                key={currentSceneId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 w-full h-full"
              >
                {showLoadingSpinner && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                  >
                    <div className="size-3 sm:size-5 md:size-6 lg:size-8 xl:size-10 2xl:size-12 border-2 lg:border-3 2xl:border-4 border-white/20 border-t-white rounded-full animate-spin" />
                  </motion.div>
                )}
                <video
                  ref={(el) => {
                    currentVideoRef.current = el;
                    setActiveVideoNode(el);
                  }}
                  src={currentScene.video}
                  style={{ opacity: isAutoplayBlocked ? 0.3 : 0 }}
                  autoPlay={!isVideoPaused}
                  playsInline
                  muted={!bgmEnabled}
                  loop={currentScene.loop && !canProceed}
                  onEnded={handleVideoEnded}
                  onCanPlay={() => setIsVideoLoaded(true)}
                  onPlaying={(e) => {
                    setIsVideoLoaded(true);
                    syncVideoVolume(e.currentTarget);
                    gsap.to(e.currentTarget, {
                      opacity: 1,
                      duration: 0.8,
                      ease: "power2.out",
                    });
                  }}
                  className="absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-500"
                />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSceneId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                >
                  {currentScene.interactions &&
                    currentScene.interactions.length > 0 && (
                      <InteractiveManager
                        scene={currentScene}
                        videoRef={currentVideoRef}
                        onInteractionTriggered={handleInteractionTriggered}
                        onComplete={handleInteractionComplete}
                        onAllComplete={handleAllInteractionsComplete}
                      />
                    )}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence>
                {isAutoplayBlocked && (
                  <motion.div
                    key="autoplay-overlay"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="story-paused-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-100 bg-black/70 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div
                      data-cursor-expand
                      className="flex flex-col items-center justify-center gap-5 p-6 lg:p-12 rounded-2xl"
                    >
                      <h3 className="text-white text-xs sm:text-sm md:text-base lg:text-xl font-normal tracking-widest uppercase">
                        เรื่องราวถูกหยุดชั่วคราว
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (activeVideoNode) {
                            activeVideoNode.play();
                            gsap.to(activeVideoNode, {
                              opacity: 1,
                              volume: bgmEnabled ? videoVolume : 0,
                              duration: 0.8,
                              ease: "power2.inOut",
                            });
                          }
                          playClickSound();
                          setIsAutoplayBlocked(false);
                        }}
                        aria-label="ดำเนินเรื่องราวต่อ"
                        className="cursor-pointer relative group px-4 sm:px-6 md:px-8 lg:px-10 py-1.5 sm:py-2 md:py-3 lg:py-4 overflow-hidden rounded-full border border-white/30 bg-white/5 hover:bg-white/8 transition-colors duration-300 shadow-[0_0_10px_rgba(255,255,255,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <span className="text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-normal tracking-wider relative z-10">
                          คลิกเพื่อดำเนินการต่อ
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
