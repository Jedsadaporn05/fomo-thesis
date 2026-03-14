"use client";

import { useStoryStore } from "@/src/store/useStoryStore";
import { useAudioStore } from "@/src/store/useAudioStore";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SceneConfig } from "./SceneConfig";
import Navbar from "../layout/Navbar";
import StartStory from "./StartStory";
import { useVideoPreloader } from "@/src/hooks/useVideoPreloader";
import SmallScreenOverlay from "../SmallScreenOverlay";
import { useScreenDetection } from "@/src/hooks/useScreenDetection";

export default function SceneManager() {
  const { isSmallScreen } = useScreenDetection();

  const currentSceneId = useStoryStore((state) => state.currentSceneId);
  const isStoryStarted = useStoryStore((state) => state.isStoryStarted);
  const goToScene = useStoryStore((state) => state.goToScene);

  const videoVolume = useAudioStore((state) => state.videoVolume);
  const bgmEnabled = useAudioStore((state) => state.bgmEnabled);
  const syncVideoVolume = useAudioStore((state) => state.syncVideoVolume);
  const resetStory = useStoryStore((state) => state.resetStory);
  const isPaused = useStoryStore((state) => state.isPaused);

  const currentVideoRef = useRef<HTMLVideoElement>(null);

  // Handle Pause/Play
  useEffect(() => {
    const video = currentVideoRef.current;
    if (!video) return;

    if (isPaused) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [isPaused]);

  // Reset story state when leaving the page
  useEffect(() => {
    return () => {
      resetStory();
    };
  }, [resetStory]);

  const currentScene = SceneConfig[currentSceneId];
  const nextSceneId = currentScene?.next;
  const nextScene = nextSceneId ? SceneConfig[nextSceneId] : null;

  // Preload Management
  useVideoPreloader(!isStoryStarted ? currentScene?.video : undefined, 0);
  useVideoPreloader(nextScene?.video, 3000);

  useEffect(() => {
    syncVideoVolume(currentVideoRef.current);
  }, [videoVolume, bgmEnabled, currentSceneId, syncVideoVolume]);

  if (!currentScene) return null;

  if (isSmallScreen) return <SmallScreenOverlay />;

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
              <video
                key={currentSceneId}
                ref={currentVideoRef}
                src={currentScene.video}
                autoPlay
                playsInline
                onEnded={() => nextSceneId && goToScene(nextSceneId)}
                className="absolute inset-0 w-full h-full object-contain object-center"
                onPlay={(e) => syncVideoVolume(e.currentTarget)}
              />
              {currentScene.isInteractive && (
                <div className="absolute inset-0 z-10"></div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
