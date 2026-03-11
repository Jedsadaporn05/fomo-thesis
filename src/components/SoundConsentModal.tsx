"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useAudioStore } from "@/src/store/useAudioStore";

interface SoundConsentModalProps {
  isReady: boolean;
}

export default function SoundConsentModal({ isReady }: SoundConsentModalProps) {
  const permission = useAudioStore((s) => s.permission);
  const grantPermission = useAudioStore((s) => s.grantPermission);
  const denyPermission = useAudioStore((s) => s.denyPermission);
  const lenis = useLenis();
  const grantButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll Lock and Keyboard Focus
  useEffect(() => {
    if (permission === "unknown" && isReady) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Strict Lock
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;

      // Ensure Lenis stops immediately and stays stopped
      if (lenis) {
        lenis.stop();
      }

      const focusTimeout = setTimeout(() => {
        grantButtonRef.current?.focus();
      }, 500);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") denyPermission();
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        clearTimeout(focusTimeout);
      };
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      if (lenis) {
        lenis.start();
      }
    }
  }, [permission, lenis, denyPermission, isReady]);

  const stopScrollPropagation = (e: React.WheelEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {permission === "unknown" && isReady && (
        <motion.div
          key="sound-consent-backdrop"
          data-lenis-prevent="true"
          onWheelCapture={stopScrollPropagation}
          onTouchMoveCapture={stopScrollPropagation}
          className="fixed inset-0 z-100 flex items-center justify-center bg-[#0a1738]/95 backdrop-blur-sm px-6"
          transition={{ duration: 0.8, ease: "easeOut" }}
          role="presentation"
        >
          <motion.div
            key="sound-consent-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="container mx-auto w-full max-w-md sm:max-w-lg rounded-3xl bg-[#0a1635] border border-white/10 shadow-2xl p-6 sm:p-8 md:p-10"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-center text-center gap-6">
              <div
                className="p-4 sm:p-5 lg:p-6 rounded-full bg-[#FF2D77]/20 text-[#FF2D77]"
                aria-hidden="true"
              >
                <Volume2 className="size-7 lg:size-8" strokeWidth={2} />
              </div>

              <div>
                <h2
                  id="modal-title"
                  className="text-sm sm:text-base lg:text-lg text-white leading-relaxed font-medium"
                >
                  เรื่องราวนี้ถูกออกแบบให้มีดนตรี
                  <br className="hidden sm:block" />
                  และเสียงประกอบเพื่อเสริมประสบการณ์
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  ref={grantButtonRef}
                  onClick={grantPermission}
                  aria-label="เปิดเสียงประกอบเรื่องราว"
                  className="flex-1 py-2.5 lg:py-3 rounded-xl bg-[#FF2D77]/85 hover:bg-[#E01560]/90 font-semibold transition flex items-center justify-center gap-2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1635]"
                >
                  <Volume2
                    className="size-5 lg:size-6"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span className="text-sm sm:text-base lg:text-lg text-white">
                    เปิดเสียง
                  </span>
                </button>

                <button
                  onClick={denyPermission}
                  aria-label="ปิดเสียงและเข้าสู่เรื่องราว"
                  className="flex-1 py-2.5 lg:py-3 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 transition flex items-center justify-center gap-2 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1635]"
                >
                  <VolumeX
                    className="size-5 lg:size-6"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span className="text-sm sm:text-base lg:text-lg text-white">
                    ปิดไว้ก่อน
                  </span>
                </button>
              </div>

              <p
                id="modal-description"
                className="text-xs sm:text-sm lg:text-base text-white/70"
              >
                คุณสามารถปรับแต่งเสียงได้ภายหลังที่เมนูการตั้งค่า
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
