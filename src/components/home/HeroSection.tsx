"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo/LogoGracie.png";
import {
  easeOut,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import useIsDesktop from "@/src/hooks/useIsDesktop";
import { useEffect, useRef } from "react";

interface HeroProps {
  startAnimation: boolean;
}

export default function HeroSection({ startAnimation }: HeroProps) {
  const isDesktop = useIsDesktop();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 40, damping: 25, mass: 1 };
  const range = 32; // default value 32
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);

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

  useEffect(() => {
    if (!startAnimation) {
      mouseX.set(0);
      mouseY.set(0);
      return;
    }

    if (isDesktop) {
      desktopVideoRef.current?.play().catch(() => {});
      mobileVideoRef.current?.pause();
    } else {
      mobileVideoRef.current?.play().catch(() => {});
      desktopVideoRef.current?.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAnimation, isDesktop]);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || !startAnimation) return;
    if (rafRef.current) return;
    const target = e.currentTarget;
    const clientX = e.clientX;
    const clientY = e.clientY;

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
        staggerChildren: 0.2,
        delayChildren: 0.2,
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

  return (
    <section
      id="Hero"
      style={{ perspective: "1200px" }}
      className="w-full h-full flex justify-center items-center"
      onMouseMove={isDesktop && startAnimation ? handleMouseMove : undefined}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-center items-center relative w-full h-dvh max-h-dvh lg:max-h-[95dvh] xl:max-h-dvh overflow-hidden">
        <motion.div
          style={{ translateX, translateY }}
          className="absolute inset-0 md:scale-126 lg:scale-100 xl:scale-[1.05] will-change-transform pointer-events-none aspect-auto"
        >
          {/* Desktop */}
          {isDesktop && (
            <video
              ref={desktopVideoRef}
              src="https://fomo-thesis.jedsadapornnew05.workers.dev/video/hero/hero-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-center pointer-events-none"
            />
          )}

          {/* Mobile */}
          {!isDesktop && (
            <video
              ref={mobileVideoRef}
              src="/home/hero-section/hero-video-mobile.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-center pointer-events-none"
            />
          )}
        </motion.div>
        {/* Text on Image */}
        <div className="container mx-auto z-10 w-full h-full relative flex flex-col justify-end lg:justify-center items-center min-[1024px]:items-end min-[3841px]:items-center pb-50 lg:pb-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
            className="flex flex-col justify-center items-center gap-10 lg:gap-8 2xl:gap-10 3xl:gap-12 lg:px-24 xl:px-32 2xl:px-52 3xl:px-64"
          >
            {/* Logo Title */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-center items-center"
            >
              <Image
                src={Logo}
                alt="heroLogo"
                width={500}
                height={500}
                priority
                className="max-w-60 sm:max-w-65 md:max-w-70 lg:max-w-90 3xl:max-w-125 h-full object-contain object-center"
              />
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold tracking-wider text-[#FF2D77] text-center">
                THE MISSING OUT
              </p>
            </motion.div>
            {/* Button */}
            <Link
              href={"/story"}
              className="w-full flex flex-col justify-center items-center gap-2 lg:gap-4 cursor-pointer transition-all blink hover:*:text-primary"
            >
              <div className="w-full h-0.5 sm:h-0.75 lg:h-1 rounded-md bg-linear-to-r from-transparent via-[#FF2D77] to-transparent" />
              <p className="text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-[21px] 3xl:text-2xl font-semibold text-white/90">
                คลิกเพื่อเข้าสู่เรื่องราว
              </p>
              <div className="w-full h-0.5 sm:h-0.75 lg:h-1 rounded-md bg-linear-to-r from-transparent via-[#FF2D77] to-transparent" />
            </Link>
          </motion.div>
        </div>
        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-[5.75dvh] lg:bottom-[5.5dvh] 3xl:bottom-[5dvh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none"
        >
          <div className="w-5.5 sm:w-6 3xl:w-6.5 h-9 sm:h-9.5 3xl:h-10 border-2 border-white/30 rounded-full flex justify-center p-0.5 sm:p-1 relative bg-white/5 backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.05)]">
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
              className="w-1.5 sm:w-1.75 3xl:w-2 h-1.5 sm:h-1.75 3xl:h-2 bg-[#FF2D77] rounded-full drop-shadow-[0_0_3px_rgba(255,45,119,0.8)]"
            />
          </div>
          <span className="text-[9px] 3xl:text-[10px] text-white/50 tracking-[0.2em] font-medium uppercase mt-0.75 drop-shadow-md">
            Scroll
          </span>
        </motion.div>
        {/* Blur Bottom */}
        <div className="absolute bottom-0 w-full h-[5dvh] lg:h-[7dvh] pointer-events-none bg-linear-to-t from-[#0f1636] to-transparent z-20" />
      </div>
    </section>
  );
}
