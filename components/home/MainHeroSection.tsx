"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo/LogoGracieShadow.gif";
import {
  easeOut,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface HeroProps {
  startAnimation: boolean;
}

export default function MainHeroSection({ startAnimation }: HeroProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 40, damping: 25, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax
  const translateX = useTransform(smoothX, [-1, 1], ["-40px", "40px"]);
  const translateY = useTransform(smoothY, [-1, 1], ["-40px", "40px"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set(x * 2 - 1);
    mouseY.set(y * 2 - 1);
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
      className="relative w-full min-h-dvh h-[100dvh] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
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
          <div className="container mx-atuo w-full h-full flex flex-col justify-center items-center md:items-end">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={startAnimation ? "visible" : "hidden"}
              className="w-full max-w-[300px] lg:max-w-[450px] h-full flex flex-col justify-center items-center gap-4 lg:gap-12"
            >
              {/* Logo Title */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col justify-center items-center"
              >
                <Image
                  src={Logo}
                  alt="Logo"
                  width={800}
                  height={800}
                  unoptimized
                  priority
                  className="w-full max-w-[250px] sm:max-w-full 2xl:min-w-[600px] h-full object-contain object-center"
                />
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium text-[#FF2D77] text-center">
                  THE MISSING OUT
                </p>
              </motion.div>
              {/* Button */}
              <Link
                href={"/story"}
                className="w-full flex flex-col justify-center items-center gap-2 lg:gap-4 cursor-pointer transition-all blink hover:[&>*]:text-primary"
              >
                <div className="w-full h-[3px] lg:h-[4px] rounded-md bg-gradient-to-r from-transparent via-[#FF2D77] to-transparent" />
                <p className="text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[26px] font-semibold text-white/90">
                  คลิกเพื่อเข้าสู่เรื่องราว
                </p>
                <div className="w-full h-[3px] lg:h-[4px] rounded-md bg-gradient-to-r from-transparent via-[#FF2D77] to-transparent" />
              </Link>
            </motion.div>
          </div>
        </div>
        {/* Blur Bottom */}
        <div className="absolute bottom-0 w-full h-[15vh] sm:h-[20vh] pointer-events-none bg-gradient-to-t from-[#0a1738] to-transparent z-20" />
      </div>
    </section>
  );
}
