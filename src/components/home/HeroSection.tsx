"use client";

import { useRouter } from "next/navigation";
import {
  easeOut,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import useIsDesktop from "@/src/hooks/useIsDesktop";
import { useEffect, useRef, useState } from "react";
import { useAudioStore } from "@/src/store/useAudioStore";
import Image from "next/image";
import Logo from "@/public/logo/LogoGracie.png";
import { useStoryStore } from "@/src/store/useStoryStore";

interface HeroProps {
  startAnimation: boolean;
}

export default function HeroSection({ startAnimation }: HeroProps) {
  const isDesktop = useIsDesktop();
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const fadeOutBGM = useAudioStore((s) => s.fadeOutBGM);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 40, damping: 25, mass: 1 };
  const range = 32;
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const cancelGestureLock = useAudioStore((s) => s._cancelGestureLock);
  const setCancelGestureLock = useAudioStore((s) => s.setCancelGestureLock);

  const translateX = useTransform(
    smoothX,
    [-1, 1],
    isDesktop ? [`-${range}px`, `${range}px`] : ["0px", "0px"],
  );

  const translateY = useTransform(
    smoothY,
    [-1, 1],
    isDesktop ? [`-${range}px`, `${range}px`] : ["0px", "0px"],
  );

  const rafRef = useRef<number | null>(null);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 150], [1, 0]);

  // Video playback and source management
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!startAnimation) {
      mouseX.set(0);
      mouseY.set(0);
      video.pause();
      return;
    }

    video.load();
    video.play().catch(() => {});
  }, [startAnimation, isDesktop, mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || !startAnimation) return;
    if (rafRef.current) return;

    const target = e.currentTarget;
    const { clientX, clientY } = e;

    rafRef.current = requestAnimationFrame(() => {
      const rect = target.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;

      mouseX.set(x * 2 - 1);
      mouseY.set(y * 2 - 1);

      rafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  const resetStory = useStoryStore((s) => s.resetStory);

  // Reset story state
  useEffect(() => {
    resetStory();
  }, [resetStory]);

  const onStart = (e: React.MouseEvent) => {
    e.preventDefault();

    cancelGestureLock?.();
    setCancelGestureLock(undefined);

    fadeOutBGM(1250);

    setIsExiting(true);
    setTimeout(() => {
      router.push("/story");
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-9999 bg-black pointer-events-auto"
          />
        )}
      </AnimatePresence>
      <section
        id="Hero"
        style={{ perspective: "1200px" }}
        className="w-full h-full flex justify-center items-center"
        onMouseMove={isDesktop && startAnimation ? handleMouseMove : undefined}
        onMouseLeave={handleMouseLeave}
        aria-label="Hero Section"
      >
        <div className="flex justify-center items-center relative w-full h-dvh overflow-hidden">
          <motion.div
            style={{ translateX, translateY, willChange: "transform" }}
            className="absolute inset-0 md:scale-126 lg:scale-100 xl:scale-[1.05] will-change-transform pointer-events-none aspect-auto"
            aria-hidden="true"
          >
            <video
              ref={videoRef}
              src={
                isDesktop
                  ? "https://pub-7c229057268a442f826c5224d51faddb.r2.dev/video/hero/hero-video.mp4"
                  : "https://pub-7c229057268a442f826c5224d51faddb.r2.dev/video/hero/hero-video-mobile.mp4"
              }
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-center pointer-events-none"
            />
          </motion.div>
          {/* Text on Image */}
          <div className="container mx-auto max-w-none z-10 w-full h-full relative flex flex-col justify-end lg:justify-center items-center min-[1024px]:items-end min-[3841px]:items-center pb-40 sm:pb-45 md:pb-50 lg:pb-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={startAnimation ? "visible" : "hidden"}
              className="flex flex-col justify-center items-center gap-6 md:gap-10 lg:gap-8 2xl:gap-10 3xl:gap-12 lg:px-24 xl:px-32 2xl:px-50 3xl:px-64"
            >
              {/* Logo Title */}
              <motion.div
                variants={itemVariants}
                initial={false}
                data-cursor-expand
                className="flex flex-col justify-center items-center"
              >
                <Image
                  src={Logo}
                  alt="FOMO The Missing Out Logo"
                  width={500}
                  height={500}
                  priority
                  className="max-w-50 sm:max-w-60 md:max-w-70 lg:max-w-80 xl:max-w-90 2xl:max-w-100 3xl:max-w-125 h-auto object-contain pointer-events-none"
                />
                <h1 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold tracking-wider text-[#FF2D77] text-center">
                  THE MISSING OUT
                </h1>
              </motion.div>
              <button
                onClick={onStart}
                aria-label="เริ่มเรื่องราวประสบการณ์ FOMO"
                className="w-full flex flex-col justify-center items-center gap-2 lg:gap-4.75 cursor-pointer transition-all animate-pulse hover:*:text-[#FF2D77] group bg-transparent border-none outline-none"
              >
                <div
                  className="w-full h-0.75 sm:h-1 lg:h-1.25 rounded-md bg-linear-to-r from-transparent via-[#FF2D77] to-transparent"
                  aria-hidden="true"
                />
                <span className="text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-[21px] 3xl:text-2xl font-semibold text-white/90">
                  คลิกเพื่อเข้าสู่เรื่องราว
                </span>
                <div
                  className="w-full h-0.75 sm:h-1 lg:h-1.25 rounded-md bg-linear-to-r from-transparent via-[#FF2D77] to-transparent"
                  aria-hidden="true"
                />
              </button>
            </motion.div>
          </div>
          <motion.div
            style={{ opacity }}
            className="absolute bottom-[5dvh] lg:bottom-[5.25dvh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-5.25 sm:w-5.5 md:w-6 3xl:w-6.5 h-8.5 sm:h-9 md:h-9.5 3xl:h-10 border sm:border-2 border-white/30 rounded-full flex justify-center p-0.5 sm:p-1 relative bg-white/5 backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.25 sm:1.5 md:w-1.75 3xl:w-2 h-1.25 sm:h-1.5 md:h-1.75 3xl:h-2 bg-[#FF2D77] rounded-full drop-shadow-[0_0_3px_rgba(255,45,119,0.8)]"
              />
            </div>
            <span className="text-[10px] sm:text-[11px] 3xl:text-[12px] text-white/50 font-medium mt-0.75 drop-shadow-md">
              เลื่อนลง
            </span>
          </motion.div>
          <div
            className="absolute bottom-0 w-full h-[5dvh] lg:h-[7dvh] pointer-events-none bg-linear-to-t from-[#0f1636] to-transparent z-20"
            aria-hidden="true"
          />
        </div>
      </section>
    </>
  );
}
