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
} from "framer-motion";
import useIsDesktop from "@/src/hooks/useIsDesktop";
import { useRef } from "react";

interface HeroProps {
  startAnimation: boolean;
}

export default function MainHeroSection({ startAnimation }: HeroProps) {
  const isDesktop = useIsDesktop();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 40, damping: 25, mass: 1 };
  const range = 32; // default value 32
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop) return;
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
      className="w-full flex justify-center items-center"
      onMouseMove={isDesktop ? handleMouseMove : undefined}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-center items-center relative w-full h-dvh max-h-[80dvh] md:max-h-[85dvh] lg:max-h-[90dvh] xl:max-h-dvh landscape:max-h-dvh overflow-hidden">
        <motion.div
          style={{ translateX, translateY }}
          className="absolute inset-0 scale-[1.05] will-change-transform pointer-events-none"
        >
          <video
            src="/home/hero-section/HeroStart.mp4"
            muted
            autoPlay
            loop
            playsInline
            className="w-full h-full object-cover object-center pointer-events-none"
          />
        </motion.div>
        <div className="relative w-full h-full">
          {/* Text on Image */}
          <div className="absolute w-full h-full">
            <div className="container mx-auto w-full h-full flex flex-col justify-center items-center min-[768px]:items-end min-[3841px]:items-center 3xl:px-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={startAnimation ? "visible" : "hidden"}
                className="flex flex-col justify-center items-center gap-4 lg:gap-8 2xl:gap-12"
              >
                {/* Logo Title */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col justify-center items-center"
                >
                  <Image
                    src={Logo}
                    alt="heroLogo"
                    width={800}
                    height={800}
                    priority
                    className="max-w-50 sm:max-w-75 md:max-w-87.5 lg:max-w-100 xl:max-w-106.25 2xl:max-w-125 h-full object-contain object-center"
                  />
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold tracking-wider text-[#FF2D77] text-center">
                    THE MISSING OUT
                  </p>
                </motion.div>
                {/* Button */}
                <Link
                  href={"/story"}
                  className="w-full flex flex-col justify-center items-center gap-2 lg:gap-4 cursor-pointer transition-all blink hover:*:text-primary"
                >
                  <div className="w-full h-0.5 sm:h-0.75 lg:h-1 rounded-md bg-linear-to-r from-transparent via-[#FF2D77] to-transparent" />
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[26px] font-semibold text-white/90">
                    คลิกเพื่อเข้าสู่เรื่องราว
                  </p>
                  <div className="w-full h-0.5 sm:h-0.75 lg:h-1 rounded-md bg-linear-to-r from-transparent via-[#FF2D77] to-transparent" />
                </Link>
              </motion.div>
            </div>
          </div>
          {/* Blur Bottom */}
          <div className="absolute bottom-0 w-full h-[15vh] pointer-events-none bg-linear-to-t from-[#0a1738] to-transparent z-20" />
        </div>
      </div>
    </section>
  );
}
