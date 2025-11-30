"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "@/public/logo/LogoGracieShadow.gif";
import { useLenis } from "lenis/react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExit, setIsExit] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [lenis]);

  useEffect(() => {
    let raf: number;

    const animate = () => {
      setProgress((p) => {
        const eased = p + (100 - p) * 0.05;
        return eased >= 99.5 ? 100 : eased;
      });

      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setIsExit(true);

      const timer = setTimeout(() => {
        onComplete?.();
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isExit && (
        <motion.div
          key="preloader"
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(8px)",
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a1738] text-white"
        >
          <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md px-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={Logo}
                alt="Logo"
                width={500}
                height={500}
                unoptimized
                priority
                className="w-full max-w-[250px] sm:max-w-full 2xl:min-w-[500px] object-contain"
              />
            </motion.div>

            {/* Progress Bar */}
            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-1.5 bg-gray-800/50 rounded-full overflow-hidden border border-white/10 mt-4">
                <motion.div
                  className="h-full bg-[#FF2D77] shadow-[0_0_12px_#FF2D77]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                />
              </div>

              {/* Percentage */}
              <div className="w-full flex justify-between text-sm text-gray-300">
                <span>LOADING ASSETS</span>
                <span className="text-lg text-white">
                  {Math.floor(progress)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
