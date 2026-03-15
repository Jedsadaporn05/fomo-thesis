"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Scene, Interaction, SceneId } from "../SceneConfig";
import { useStoryStore } from "@/src/store/useStoryStore";
import { useState, useEffect, useMemo, useRef } from "react";
import OpenGuitarZipper from "./OpenGuitarZipper";

interface InteractiveManagerProps {
  scene: Scene;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onComplete?: () => void;
  onInteractionTriggered?: (interaction: Interaction) => void;
}

export default function InteractiveManager({
  scene,
  videoRef,
  onComplete,
  onInteractionTriggered,
}: InteractiveManagerProps) {
  const goToScene = useStoryStore((state) => state.goToScene);
  const addScore = useStoryStore((state) => state.addScore);

  const [completedIndices, setCompletedIndices] = useState<number[]>([]);
  const [triggeredIndices, setTriggeredIndices] = useState<number[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!scene.interactions || scene.interactions.length === 0) return;

    const checkInteractionTime = () => {
      const video = videoRef.current;
      if (!video) return;

      const currentTime = video.currentTime;

      scene.interactions!.forEach((inter, index) => {
        if (currentTime >= inter.atTime) {
          setTriggeredIndices((prev) => {
            if (!prev.includes(index)) {
              return [...prev, index];
            }
            return prev;
          });
        }
      });

      rafRef.current = requestAnimationFrame(checkInteractionTime);
    };

    rafRef.current = requestAnimationFrame(checkInteractionTime);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [scene.interactions, videoRef]);

  const activeIndex = useMemo(() => {
    const active = triggeredIndices
      .filter((idx) => !completedIndices.includes(idx))
      .sort((a, b) => b - a)[0];
    return active !== undefined ? active : null;
  }, [triggeredIndices, completedIndices]);

  const activeInteraction =
    activeIndex !== null ? scene.interactions?.[activeIndex] : null;

  useEffect(() => {
    if (activeInteraction && onInteractionTriggered) {
      onInteractionTriggered(activeInteraction);
    }
  }, [activeInteraction, onInteractionTriggered]);

  const handleInteractionSuccess = (
    index: number,
    interaction: Interaction,
  ) => {
    setCompletedIndices((prev) => [...prev, index]);
    if (onComplete) onComplete();
    if (interaction.score) addScore(interaction.score);
    if (interaction.targetScene) goToScene(interaction.targetScene);
  };

  const handleOptionClick = (
    index: number,
    option: { label: string; targetScene: SceneId; score?: number },
  ) => {
    setCompletedIndices((prev) => [...prev, index]);
    if (onComplete) onComplete();
    if (option.score) addScore(option.score);
    goToScene(option.targetScene);
  };

  // Reset after Scene Change
  useEffect(() => {
    setCompletedIndices([]);
    setTriggeredIndices([]);
  }, [scene.id]);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      <AnimatePresence>
        {activeInteraction && activeIndex !== null && (
          <motion.div
            key={`${scene.id}-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto"
          >
            {/* Click */}
            {activeInteraction.type === "click" &&
              activeInteraction.position && (
                <div
                  style={{
                    left: `${activeInteraction.position.x}%`,
                    top: `${activeInteraction.position.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto"
                >
                  <motion.button
                    initial={{ scale: 0.75, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      handleInteractionSuccess(activeIndex, activeInteraction)
                    }
                    className="relative flex items-center justify-center cursor-pointer group"
                  >
                    <span className="absolute size-10 min-[450px]:size-12 sm:size-16 md:size-18 lg:size-24 xl:size-32 2xl:size-36 3xl:size-38 rounded-full border border-white/40 animate-ping animation-duration-[3s]" />
                    <span className="absolute size-10 min-[450px]:size-12 sm:size-16 md:size-18 lg:size-24 xl:size-32 2xl:size-36 3xl:size-38 rounded-full border border-white/20 animate-ping animation-duration-[5s]" />
                    <div className="relative size-10 min-[450px]:size-12 sm:size-16 md:size-18 lg:size-24 xl:size-32 2xl:size-36 3xl:size-38 rounded-full border-2 border-white/80 bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                      <div className="absolute inset-2 border border-white/20 rounded-full" />
                      <div className="size-6 min-[450px]:size-8 sm:size-10 md:size-12 lg:size-18 xl:size-22 2xl:size-26 rounded-full bg-white/10 flex items-center justify-center">
                        <div className="size-1 min-[450px]:size-2 sm:size-3 md:size-4 rounded-full bg-white shadow-[0_0_15px_white] animate-pulse" />
                      </div>
                    </div>
                  </motion.button>
                </div>
              )}
            {/* Drag & Drop */}
            {activeInteraction.type === "drag-drop" && (
              <OpenGuitarZipper
                onComplete={() =>
                  handleInteractionSuccess(activeIndex, activeInteraction)
                }
              />
            )}
            {/* Choice */}
            {activeInteraction.type === "choice" &&
              activeInteraction.options && (
                <div className="container mx-auto max-w-full w-full h-full flex flex-row justify-between items-end gap-8 sm:gap-12 md:gap-16 lg:gap-20 py-[2dvh] sm:py-[4dvh] md:py-[5dvh] lg:py-[6dvh] 2xl:py-[8dvh] 3xl:py-[13.25dvh]">
                  <div
                    className="absolute inset-x-0 bottom-0 h-[7dvh] sm:h-[7dvh] md:h-[10dvh] lg:h-[15dvh] 2xl:h-[20dvh] 3xl:h-[30dvh] pointer-events-none bg-linear-to-t from-black/60 via-black/40 to-transparent -z-10"
                    aria-hidden="true"
                  />
                  {activeInteraction.options.map((option, idx) => (
                    <motion.button
                      key={`${activeIndex}-${idx}`}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      whileHover={{
                        borderColor: "rgba(255, 255, 255, 0.8)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOptionClick(activeIndex, option)}
                      className="w-full flex flex-col justify-center items-center gap-1.75 sm:gap-2 md:gap-3 lg:gap-4 2xl:gap-5 3xl:gap-6 cursor-pointer hover:*:text-[#FF2D77] group bg-transparent border-none outline-none"
                    >
                      <div
                        className="w-2/3 sm:w-1/2 h-0.75 sm:h-1 md:h-1.25 lg:h-1.5 3xl:h-1.75 rounded-md bg-linear-to-r from-transparent via-[#FF2D77] to-transparent"
                        aria-hidden="true"
                      />
                      <span className="text-[11px] sm:text-sm md:text-base lg:text-[21px] 2xl:text-2xl 3xl:text-3xl font-semibold text-white/90">
                        {option.label}
                      </span>
                      <div
                        className="w-2/3 sm:w-1/2 h-0.75 sm:h-1 md:h-1.25 lg:h-1.5 3xl:h-1.75 rounded-md bg-linear-to-r from-transparent via-[#FF2D77] to-transparent"
                        aria-hidden="true"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
