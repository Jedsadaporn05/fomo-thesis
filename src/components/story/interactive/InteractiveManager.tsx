"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Scene, Interaction, SceneId } from "../SceneConfig";
import { useStoryStore } from "@/src/store/useStoryStore";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import OpenGuitarZipper from "./OpenGuitarZipper";
import { useRouter } from "next/navigation";
import { useClickSound } from "@/src/hooks/useClickSound";

interface InteractiveManagerProps {
  scene: Scene;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onComplete?: () => void;
  onAllComplete?: () => void;
  onInteractionTriggered?: (interaction: Interaction) => void;
}

export default function InteractiveManager({
  scene,
  videoRef,
  onComplete,
  onAllComplete,
  onInteractionTriggered,
}: InteractiveManagerProps) {
  const router = useRouter();
  const playClickSound = useClickSound();
  const goToScene = useStoryStore((state) => state.goToScene);
  const addScore = useStoryStore((state) => state.addScore);
  const resetStory = useStoryStore((state) => state.resetStory);

  const [completedIndices, setCompletedIndices] = useState<number[]>([]);
  const [triggeredIndices, setTriggeredIndices] = useState<number[]>([]);
  const rafRef = useRef<number | null>(null);

  const triggeredSetRef = useRef<Set<number>>(new Set());

  const processingRef = useRef<number | null>(null);

  useEffect(() => {
    if (!scene.interactions || scene.interactions.length === 0) return;

    const checkInteractionTime = () => {
      const video = videoRef.current;
      if (!video) {
        rafRef.current = requestAnimationFrame(checkInteractionTime);
        return;
      }

      const currentTime = video.currentTime;
      let hasNewTrigger = false;

      scene.interactions?.forEach((inter, index) => {
        if (
          currentTime >= inter.atTime &&
          !triggeredSetRef.current.has(index)
        ) {
          triggeredSetRef.current.add(index);
          hasNewTrigger = true;
        }
      });

      if (hasNewTrigger) {
        setTriggeredIndices(Array.from(triggeredSetRef.current));
      }

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
      .sort((a, b) => a - b)[0];
    return active !== undefined ? active : null;
  }, [triggeredIndices, completedIndices]);

  const activeInteraction =
    activeIndex !== null && scene.interactions
      ? scene.interactions[activeIndex]
      : null;

  useEffect(() => {
    if (activeInteraction && onInteractionTriggered) {
      onInteractionTriggered(activeInteraction);
    }
  }, [activeInteraction, onInteractionTriggered]);

  const checkAllCompleted = useCallback(
    (newCompletedIndices: number[]) => {
      if (!scene.interactions) return;
      if (newCompletedIndices.length >= scene.interactions.length) {
        if (onAllComplete) onAllComplete();
      }
    },
    [scene.interactions, onAllComplete],
  );

  const handleInteractionSuccess = useCallback(
    (index: number, interaction: Interaction) => {
      if (processingRef.current === index) return;
      processingRef.current = index;

      const newCompleted = [...completedIndices, index];
      setCompletedIndices(newCompleted);

      if (interaction.resumeVideo !== false) {
        if (onComplete) onComplete();
      }

      if (interaction.score !== undefined) addScore(interaction.score);
      if (interaction.targetScene) {
        goToScene(interaction.targetScene);
      } else {
        checkAllCompleted(newCompleted);
      }
    },
    [onComplete, addScore, goToScene, completedIndices, checkAllCompleted],
  );

  const handleOptionClick = useCallback(
    (
      index: number,
      option: {
        label: string;
        targetScene?: SceneId;
        score?: number;
        action?: "restart" | "home";
      },
    ) => {
      if (processingRef.current === index) return;
      processingRef.current = index;

      const newCompleted = [...completedIndices, index];
      setCompletedIndices(newCompleted);

      const currentInteraction = scene.interactions?.[index];
      if (currentInteraction?.resumeVideo !== false) {
        if (onComplete) onComplete();
      }

      if (option.score !== undefined) addScore(option.score);

      if (option.action === "restart") {
        resetStory();
        goToScene("scene-1");
      } else if (option.action === "home") {
        router.push("/");
      } else if (option.targetScene) {
        goToScene(option.targetScene);
      } else {
        checkAllCompleted(newCompleted);
      }
    },
    [
      onComplete,
      addScore,
      goToScene,
      scene.interactions,
      resetStory,
      router,
      completedIndices,
      checkAllCompleted,
    ],
  );

  // Reset after Scene Change
  useEffect(() => {
    setCompletedIndices([]);
    setTriggeredIndices([]);
    triggeredSetRef.current.clear();
    processingRef.current = null;
  }, [scene.id]);

  const isDragDrop = activeInteraction?.type === "drag-drop";

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      <AnimatePresence mode="wait">
        {activeInteraction && activeIndex !== null && (
          <>
            {isDragDrop && (
              <motion.div
                key={`black-curtain-${scene.id}-${activeIndex}`}
                className="absolute inset-0 bg-black z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            )}
            <motion.div
              key={`${scene.id}-${activeIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: isDragDrop ? 0.4 : 0,
                ease: "easeOut",
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-auto z-10"
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
                      disabled={processingRef.current === activeIndex}
                      onClick={() => {
                        handleInteractionSuccess(
                          activeIndex,
                          activeInteraction,
                        );
                        playClickSound();
                      }}
                      className="relative flex items-center justify-center cursor-pointer group"
                    >
                      <span className="absolute size-10 min-[450px]:size-12 sm:size-16 md:size-18 lg:size-24 xl:size-32 2xl:size-36 3xl:size-38 rounded-full border lg:border-2 border-white/40 animate-ping animation-duration-[3s]" />
                      <span className="absolute size-10 min-[450px]:size-12 sm:size-16 md:size-18 lg:size-24 xl:size-32 2xl:size-36 3xl:size-38 rounded-full border lg:border-2 border-white/20 animate-ping animation-duration-[5s]" />
                      <div className="relative size-10 min-[450px]:size-12 sm:size-16 md:size-18 lg:size-24 xl:size-32 2xl:size-36 3xl:size-38 rounded-full border-2 lg:border-3 border-white/80 bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
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
                <motion.div
                  initial={{ scale: 1.05 }}
                  animate={{
                    scale: 1,
                    transition: { duration: 0.8, ease: "easeOut" },
                  }}
                  className="relative w-full h-full"
                >
                  <OpenGuitarZipper
                    onComplete={() =>
                      handleInteractionSuccess(activeIndex, activeInteraction)
                    }
                  />
                </motion.div>
              )}
              {/* Choice */}
              {activeInteraction.type === "choice" &&
                activeInteraction.options && (
                  <div className="container relative mx-auto max-w-full w-full h-full flex flex-col justify-end items-center gap-8">
                    <div
                      className="absolute inset-x-0 top-0 h-[25%] lg:h-[30%] pointer-events-none bg-linear-to-b from-black/80 via-black/60 to-transparent -z-10"
                      aria-hidden="true"
                    />
                    <div className="w-full h-full flex flex-col justify-around gap-[40%]">
                      {activeInteraction.question && (
                        <div className="inset-0 flex items-center justify-center">
                          <motion.h2
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                              duration: 0.75,
                              ease: "easeOut",
                            }}
                            data-cursor-expand
                            className="landscape:max-w-xs landscape:md:max-w-none text-xs min-[450px]:text-sm min-[520px]:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl font-semibold text-white text-center drop-shadow-[0_0_15px_rgba(255,45,119,0.3)] select-none px-6 landscape:text-[10px] landscape:min-[450px]:text-[11px] landscape:min-[520px]:text-xs landscape:sm:text-sm landscape:md:text-base landscape:lg:text-2xl"
                          >
                            {activeInteraction.question}
                          </motion.h2>
                        </div>
                      )}
                      <div className="w-full flex flex-row justify-between items-end gap-8 sm:gap-12 md:gap-16 lg:gap-20">
                        {activeInteraction.options.map((option, idx) => (
                          <motion.button
                            key={`${activeIndex}-${idx}`}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                              duration: 1,
                              ease: "easeOut",
                              delay: 1,
                            }}
                            whileHover={{
                              borderColor: "rgba(255, 255, 255, 0.8)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            disabled={processingRef.current === activeIndex}
                            onClick={() => {
                              handleOptionClick(activeIndex, option);
                              playClickSound();
                            }}
                            className="w-full flex flex-col justify-center items-center gap-1.5 min-[450px]:gap-1.75 sm:gap-2 md:gap-3 lg:gap-4 2xl:gap-5 3xl:gap-6 cursor-pointer hover:animate-pulse hover:*:text-[#FF2D77] group bg-transparent border-none outline-none"
                          >
                            <div
                              className="w-2/3 lg:w-1/2 h-0.5 min-[450px]:h-0.75 sm:h-1 md:h-1.25 lg:h-1.5 3xl:h-1.75 rounded-md bg-linear-to-r from-transparent via-[#FF2D77] to-transparent landscape:h-0.5 landscape:sm:h-[2.25px] landscape:lg:h-1.25"
                              aria-hidden="true"
                            />
                            <span className="text-[10px] sm:text-sm md:text-base lg:text-xl 2xl:text-2xl 3xl:text-3xl font-semibold text-white/90 landscape:text-[9px] landscape:sm:text-[10px] landscape:md:text-sm landscape:lg:text-lg">
                              {option.label}
                            </span>
                            <div
                              className="w-2/3 lg:w-1/2 h-0.5 min-[450px]:h-0.75 sm:h-1 md:h-1.25 lg:h-1.5 3xl:h-1.75 rounded-md bg-linear-to-r from-transparent via-[#FF2D77] to-transparent landscape:h-0.5 landscape:sm:h-[2.25px] landscape:lg:h-1.25"
                              aria-hidden="true"
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    <div
                      className="absolute inset-x-0 bottom-0 h-[25%] lg:h-[30%] pointer-events-none bg-linear-to-t from-black/80 via-black/60 to-transparent -z-10"
                      aria-hidden="true"
                    />
                  </div>
                )}
              {/* Ending Buttons */}
              {activeInteraction.type === "ending" &&
                activeInteraction.options && (
                  <div className="container relative mx-auto max-w-full w-full h-full flex flex-col justify-end items-start gap-8">
                    <div className="w-full h-full flex flex-col justify-around gap-[60%] min-[395px]:gap-[54%] lg:gap-[50%]">
                      <div className="inset-0 flex items-center justify-center" />
                      <div className="w-[55%] sm:w-[50%] flex flex-row justify-between items-end gap-4 min-[450px]:gap-8 sm:gap-12 md:gap-16 lg:gap-20 max-[449px]:-ms-2 min-[450px]:ms-0 sm:ms-2 lg:ms-6 xl:ms-10 landscape:gap-3 landscape:min-[450px]:gap-6 landscape:sm:gap-8 landscape:d:gap-12 landscape:lg:gap-20">
                        {activeInteraction.options.map((option, idx) => (
                          <motion.button
                            key={`end-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.6 + idx * 0.2,
                              ease: "easeOut",
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={processingRef.current === activeIndex}
                            onClick={() => {
                              handleOptionClick(activeIndex, option);
                              playClickSound();
                            }}
                            className="w-full flex flex-col justify-center items-center gap-1 min-[395px]:gap-1.5 min-[450px]:gap-1.75 sm:gap-2 md:gap-3 lg:gap-4 2xl:gap-5 3xl:gap-6 cursor-pointer animate-pulse hover:*:text-[#FF2D77] group bg-transparent border-none outline-none"
                          >
                            <div
                              className="w-full h-0.5 min-[450px]:h-0.75 sm:h-1 md:h-1.25 lg:h-1.5 3xl:h-1.75 rounded-md bg-linear-to-r from-transparent via-[#FF2D77] to-transparent landscape:h-0.5 landscape:sm:h-[2.25px] landscape:lg:h-1.25"
                              aria-hidden="true"
                            />
                            <span className="text-[8px] min-[450px]:text-[10px] sm:text-sm md:text-base lg:text-xl 2xl:text-2xl 3xl:text-3xl font-semibold text-white/90 landscape:text-[8px] landscape:min-[450px]:text-[9px] landscape:sm:text-[10px] landscape:md:text-sm landscape:lg:text-xl">
                              {option.label}
                            </span>
                            <div
                              className="w-full h-0.5 min-[450px]:h-0.75 sm:h-1 md:h-1.25 lg:h-1.5 3xl:h-1.75 rounded-md bg-linear-to-r from-transparent via-[#FF2D77] to-transparent landscape:h-0.5 landscape:sm:h-[2.25px] landscape:lg:h-1.25"
                              aria-hidden="true"
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
