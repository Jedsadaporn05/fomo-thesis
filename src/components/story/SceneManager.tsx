"use client";

import { useStoryStore } from "@/src/store/useStoryStore";
import { useAudioStore } from "@/src/store/useAudioStore";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Interaction, SceneConfig } from "./SceneConfig";
import Navbar from "../layout/Navbar";
import StartStory from "./StartStory";
import { useVideoPreloader } from "@/src/hooks/useVideoPreloader";
import SmallScreenOverlay from "../SmallScreenOverlay";
import { useScreenDetection } from "@/src/hooks/useScreenDetection";
import InteractiveManager from "./interactive/InteractiveManager";
import gsap from "gsap";

export default function SceneManager() {
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

  const videoVolume = useAudioStore((state) => state.videoVolume);
  const bgmEnabled = useAudioStore((state) => state.bgmEnabled);
  const syncVideoVolume = useAudioStore((state) => state.syncVideoVolume);

  const [canProceed, setCanProceed] = useState(false);
  const canProceedRef = useRef(false);

  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);

  const [activeVideoNode, setActiveVideoNode] =
    useState<HTMLVideoElement | null>(null);

  const currentVideoRef = useRef<HTMLVideoElement>(null);

  const isVideoPaused = isPaused || isInteractionPaused;

  const currentScene = SceneConfig[currentSceneId];
  const nextSceneId = currentScene?.next;
  const nextScene = nextSceneId ? SceneConfig[nextSceneId] : null;
  const { autoNext } = currentScene;

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
            console.warn("Autoplay was prevented by the browser.");
            console.log(error);
            setIsAutoplayBlocked(true);

            activeVideoNode.volume = 0;
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
  }, [currentSceneId, setInteractionPaused]);

  const handleInteractionTriggered = useCallback(
    (inter: Interaction) => {
      if (inter.pause) setInteractionPaused(true);
    },
    [setInteractionPaused],
  );

  const handleInteractionComplete = useCallback(() => {
    setInteractionPaused(false);

    canProceedRef.current = true;
    setCanProceed(true);

    if (currentVideoRef.current?.ended && nextSceneId) {
      goToScene(nextSceneId);
    }
  }, [setInteractionPaused, nextSceneId, goToScene]);

  // Preload Video
  useVideoPreloader(!isStoryStarted ? currentScene?.video : undefined, 1500);
  useVideoPreloader(nextScene?.video, 3000);

  useEffect(() => {
    syncVideoVolume(currentVideoRef.current);
  }, [videoVolume, bgmEnabled, currentSceneId, syncVideoVolume]);

  const handleVideoEnded = useCallback(() => {
    if ((autoNext || canProceedRef.current) && nextSceneId) {
      goToScene(nextSceneId);
    }
  }, [autoNext, nextSceneId, goToScene]);

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

              <AnimatePresence mode="wait">
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
                  <video
                    ref={(el) => {
                      currentVideoRef.current = el;
                      setActiveVideoNode(el);
                    }}
                    src={currentScene.video}
                    autoPlay={!isVideoPaused}
                    playsInline
                    loop={currentScene.loop && !canProceed}
                    onEnded={handleVideoEnded}
                    className="absolute inset-0 w-full h-full object-contain object-center"
                    onPlay={(e) => syncVideoVolume(e.currentTarget)}
                  />

                  {currentScene.interactions &&
                    currentScene.interactions.length > 0 && (
                      <InteractiveManager
                        scene={currentScene}
                        videoRef={currentVideoRef}
                        onInteractionTriggered={handleInteractionTriggered}
                        onComplete={handleInteractionComplete}
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
                      <h3 className="text-white text-xl lg:text-2xl font-light tracking-widest uppercase">
                        เรื่องราวถูกหยุดชั่วคราว
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (activeVideoNode) {
                            activeVideoNode.play();
                            gsap.to(activeVideoNode, {
                              volume: bgmEnabled ? videoVolume : 0,
                              duration: 0.8,
                              ease: "power2.inOut",
                            });
                          }
                          setIsAutoplayBlocked(false);
                        }}
                        aria-label="ดำเนินเรื่องราวต่อ"
                        className="cursor-pointer relative group px-10 py-4 overflow-hidden rounded-full border border-white/30 bg-white/5 hover:bg-white/8 transition-colors duration-300 shadow-[0_0_10px_rgba(255,255,255,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <span className="text-white text-sm lg:text-base font-normal tracking-wider relative z-10">
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
