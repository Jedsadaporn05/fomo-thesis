"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import rotatePhoneAnimation from "@/src/animations/rotate-phone.json";
import { useClickSound } from "../hooks/useClickSound";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LandscapeSuggestion() {
  const pathname = usePathname();
  const isStoryPage = pathname === "/story";
  const playClickSound = useClickSound();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isStoryPage) {
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 700);

      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 12300);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    } else {
      setIsVisible(false);
    }
  }, [isStoryPage]);

  if (!isStoryPage) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="landscape-suggestion"
          initial={{ opacity: 0, backgroundColor: "#000000" }}
          animate={{ opacity: 1, backgroundColor: "rgba(10, 23, 56, 0.95)" }}
          exit={{ opacity: 0, backgroundColor: "#000000" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={() => {
            setIsVisible(false);
            playClickSound();
          }}
          className="fixed inset-0 z-9997 hidden portrait:flex flex-col justify-center items-center backdrop-blur-md px-6 text-center cursor-pointer overflow-hidden"
          role="dialog"
          aria-label="แนะนำให้หมุนหน้าจอ"
        >
          <div className="w-full h-full flex flex-col justify-center items-center gap-6 sm:gap-8">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide"
            >
              แนะนำให้หมุนหน้าจอเป็นแนวนอน
            </motion.h2>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="relative flex justify-center items-center"
            >
              <Lottie
                animationData={rotatePhoneAnimation}
                loop={true}
                className="size-40 sm:size-45 md:size-50 lg:size-60 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              />
            </motion.div>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="text-white/90 text-sm sm:text-base md:text-lg font-light"
            >
              เพื่ออรรถรสในการรับชมที่ดีขึ้น
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="absolute bottom-12 text-white/50 text-xs sm:text-sm font-light tracking-widest animate-pulse"
            >
              แตะหน้าจอเพื่อข้าม
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
