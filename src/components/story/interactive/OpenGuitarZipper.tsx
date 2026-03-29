"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useClickSound } from "@/src/hooks/useClickSound";

interface ZipperInteractionProps {
  onComplete: () => void;
}

export default function OpenGuitarZipper({
  onComplete,
}: ZipperInteractionProps) {
  const [isDone, setIsDone] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const loadedImagesRef = useRef<Set<string>>(new Set());
  const [isReady, setIsReady] = useState(false);
  const playClickSound = useClickSound();

  const handleImageLoad = (id: string) => {
    loadedImagesRef.current.add(id);
    if (loadedImagesRef.current.size >= 4) {
      setIsReady(true);
    }
  };

  const y = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackHeight, setTrackHeight] = useState(500);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        const dynamicZippyHeight = height * 0.15;

        setTrackHeight(height - dynamicZippyHeight);
      }
    });

    resizeObserver.observe(trackEl);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isReady || hasInteracted) {
      setShowHint(false);
      return;
    }

    const showTimer = setTimeout(() => {
      setShowHint(true);
    }, 1000);

    const hideTimer = setTimeout(() => {
      setShowHint(false);
    }, 7000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isReady, hasInteracted]);

  useMotionValueEvent(y, "change", (latest) => {
    if (!hasInteracted && latest > 10) {
      setHasInteracted(true);
    }

    if (!isDone && trackHeight > 0 && latest >= trackHeight - 15) {
      setIsDone(true);
    }
  });

  const MAX_SKEW = 25;

  const leftSkew = useTransform(
    y,
    (latest) => (latest / Math.max(trackHeight, 1)) * MAX_SKEW,
  );
  const rightSkew = useTransform(
    y,
    (latest) => -(latest / Math.max(trackHeight, 1)) * MAX_SKEW,
  );

  const leftOrigin = useTransform(y, (latest) => `100% ${latest}px`);
  const rightOrigin = useTransform(y, (latest) => `0% ${latest}px`);

  const topClip = useTransform(
    y,
    (latest) => `polygon(0% 0%, 100% 0%, 100% ${latest}px, 0% ${latest}px)`,
  );
  const bottomClip = useTransform(
    y,
    (latest) =>
      `polygon(0% ${latest - 1}px, 100% ${latest - 1}px, 100% 100%, 0% 100%)`,
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isReady ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
    >
      {/* Guitar */}
      <div className="absolute inset-0 right-[5%] z-0 flex justify-center items-center">
        <Image
          src="https://cdn.fomo-gracie.com/image/story/interactive/Guitar.png"
          alt="Inside Guitar"
          fill
          priority
          className="object-cover object-[10%_80%]"
          onLoad={() => handleImageLoad("guitar")}
        />
        {isDone && (
          <div className="absolute top-[34%] sm:top-[36.75%] left-1/2 -translate-x-[31.75%] min-[390px]:-translate-x-[26.75%] sm:-translate-x-[29%] md:-translate-x-[26.5%] lg:-translate-x-[23.75%] xl:-translate-x-[27.5%] 2xl:-translate-x-[17.25%] flex items-center justify-center pointer-events-auto">
            <motion.button
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                onComplete();
                playClickSound();
              }}
              className="relative flex items-center justify-center cursor-pointer group"
            >
              <span className="absolute size-10 min-[450px]:size-12 sm:size-16 md:size-18 lg:size-24 xl:size-32 2xl:size-36 3xl:size-38 rounded-full border lg:border-2 border-[#0a1738]/30 animate-ping animation-duration-[3s]" />
              <span className="absolute size-10 min-[450px]:size-12 sm:size-16 md:size-18 lg:size-24 xl:size-32 2xl:size-36 3xl:size-38 rounded-full border lg:border-2 border-[#0a1738]/20 animate-ping animation-duration-[5s]" />
              <div className="relative size-10 min-[450px]:size-12 sm:size-16 md:size-18 lg:size-24 xl:size-32 2xl:size-36 3xl:size-38 rounded-full border-2 lg:border-3 border-white/80 bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
                <div className="absolute inset-2 border border-white/20 rounded-full" />
                <div className="size-6 min-[450px]:size-8 sm:size-10 md:size-12 lg:size-18 xl:size-22 2xl:size-26 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="size-1 min-[450px]:size-2 sm:size-3 md:size-4 lg:size-5 xl:size-6 2xl:size-7 3xl:size-8 rounded-full bg-black/20 shadow-[0_0_15px_white] animate-pulse" />
                </div>
              </div>
            </motion.button>
          </div>
        )}
      </div>
      {/* Bag Left */}
      <motion.div
        className="absolute top-0 w-1/2 h-full z-10 pointer-events-none will-change-[clip-path]"
        style={{ clipPath: bottomClip }}
      >
        <Image
          src="https://cdn.fomo-gracie.com/image/story/interactive/Left-Bag.png"
          alt="Left"
          fill
          priority
          className="object-cover object-right"
          onLoad={() => handleImageLoad("left")}
        />
      </motion.div>
      <motion.div
        className="absolute top-0 w-1/2 h-full z-10 pointer-events-none will-change-[transform,clip-path]"
        style={{
          clipPath: topClip,
          skewX: leftSkew,
          transformOrigin: leftOrigin,
        }}
      >
        <Image
          src="https://cdn.fomo-gracie.com/image/story/interactive/Left-Bag.png"
          alt="Left Flap"
          fill
          priority
          className="object-cover object-right"
        />
      </motion.div>
      {/* Bag Right */}
      <motion.div
        className="absolute top-0 left-1/2 w-1/2 h-full z-10 pointer-events-none will-change-[clip-path]"
        style={{ clipPath: bottomClip }}
      >
        <Image
          src="https://cdn.fomo-gracie.com/image/story/interactive/Right-Bag.png"
          alt="Right"
          fill
          priority
          className="object-cover object-left"
          onLoad={() => handleImageLoad("right")}
        />
      </motion.div>
      <motion.div
        className="absolute top-0 left-1/2 w-1/2 h-full z-10 pointer-events-none will-change-[transform,clip-path]"
        style={{
          clipPath: topClip,
          skewX: rightSkew,
          transformOrigin: rightOrigin,
        }}
      >
        <Image
          src="https://cdn.fomo-gracie.com/image/story/interactive/Right-Bag.png"
          alt="Right Flap"
          fill
          priority
          className="object-cover object-left"
        />
      </motion.div>
      {/* Zippy */}
      <div
        data-cursor-expand
        ref={trackRef}
        className="absolute -top-7 min-[475px]:-top-5 sm:top-0 xl:top-5 bottom-10 left-1/2 -translate-x-[72%] w-10 min-[390px]:w-12 sm:w-14 md:w-16 lg:w-18 xl:w-20 2xl:w-26 z-50 pointer-events-none flex justify-center"
      >
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={!isDone ? { scale: 1.05 } : {}}
          whileTap={!isDone ? { scale: 0.95 } : {}}
          drag={isDone ? false : "y"}
          dragConstraints={{ top: 0, bottom: trackHeight }}
          dragElastic={0}
          dragMomentum={false}
          style={{ y }}
          className="relative size-30 flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto will-change-transform"
        >
          {/* Effect */}
          <AnimatePresence>
            {!hasInteracted && !isDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute inset-0 left-[35%] flex items-center justify-center -z-10 pointer-events-none"
              >
                <span className="absolute size-12 sm:size-14 md:size-20 rounded-full border-2 xl:border-3 border-[#E51E5A] animate-ping animation-duration-[2s]" />
              </motion.div>
            )}
          </AnimatePresence>
          <Image
            src="https://cdn.fomo-gracie.com/image/story/interactive/Zippy.png"
            alt="Zipper Head"
            fill
            className="object-contain pointer-events-none drop-shadow-lg"
            onLoad={() => handleImageLoad("zippy")}
          />
          {/* Slide Down */}
          <AnimatePresence>
            {!hasInteracted && !isDone && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-[80%] sm:top-[90%] md:top-[110%] right-[8.25%] md:right-[11.25%] lg:right-[8.25%] xl:right-[14.25%] flex flex-col items-center pointer-events-none"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="flex flex-col items-center"
                >
                  <div className="size-3 sm:size-4 md:size-5 lg:size-6 xl:size-7 border-b-2 sm:border-b-3 lg:border-b-4 xl:border-b-5 border-r-2 sm:border-r-3 lg:border-r-4 xl:border-r-5 border-[#E51E5A]/80 rotate-45" />
                  <div className="size-3 sm:size-4 md:size-5 lg:size-6 xl:size-7 border-b-2 sm:border-b-3 lg:border-b-4 xl:border-b-5 border-r-2 sm:border-r-3 lg:border-r-4 xl:border-r-5 border-[#E51E5A]/60 rotate-45 -mt-1 sm:-mt-1.5" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* Text Overlay */}
      <AnimatePresence>
        {showHint && !isDone && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              opacity: { duration: 0.6 },
              y: { duration: 0.6 },
            }}
            className="absolute bottom-[6%] lg:bottom-[8%] 3xl:bottom-[10%] left-1/2 -translate-x-1/2 z-100 pointer-events-none"
          >
            <div className="relative bg-black/80 border border-white/80 rounded-sm sm:rounded-lg py-1.5 min-[425px]:py-2 sm:py-3 md:py-4 lg:py-5 3xl:py-6 px-2 min-[425px]:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 3xl:px-16 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden">
              <div className="flex flex-row items-center justify-center gap-1.5 md:gap-2 lg:gap-3">
                {/* Blinking Cursor */}
                <motion.span
                  className="text-[#E51E5A] text-[8px] min-[425px]:text-[10px] sm:text-sm md:text-base lg:text-lg xl:text-xl 3xl:text-2xl"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                  }}
                >
                  &gt;
                </motion.span>
                <motion.h2
                  className="text-[8px] min-[425px]:text-[10px] sm:text-sm md:text-base lg:text-lg xl:text-xl 3xl:text-2xl text-white tracking-wide"
                  animate={{ opacity: [0.85, 1, 0.85] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  รูดซิปลงเพื่อเปิดดูกีตาร์ใหม่
                </motion.h2>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
