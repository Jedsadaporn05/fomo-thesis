"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useAudioStore } from "@/src/store/useAudioStore";

export default function SoundConsentModal() {
  const permission = useAudioStore((s) => s.permission);
  const grantPermission = useAudioStore((s) => s.grantPermission);
  const denyPermission = useAudioStore((s) => s.denyPermission);

  return (
    <AnimatePresence>
      {permission === "unknown" && (
        <motion.div
          key="sound-consent-backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a1738]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div
            key="sound-consent-modal"
            className="
            w-[92%] max-w-md sm:max-w-lg
            rounded-3xl
            bg-[#0a1635]/95
            border border-white/10
            shadow-2xl
            p-6 sm:p-8 md:p-10
            text-white
          "
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-center text-center gap-6">
              <div className="p-5 sm:p-6 rounded-full bg-[#FF2D77]/20 text-[#FF2D77]">
                <Volume2 className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <div className="space-y-2">
                <p className="text-lg text-white leading-relaxed">
                  เรื่องราวนี้ถูกออกแบบให้มีดนตรี
                  <br className="hidden sm:block" />
                  และเสียงประกอบเพื่อเสริมประสบการณ์
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={grantPermission}
                  className="
                  flex-1 py-3 rounded-xl
                  bg-[#FF2D77]
                  hover:bg-[#E01560]
                  font-semibold
                  transition
                  flex items-center justify-center gap-2
                  cursor-pointer
                "
                >
                  <Volume2 size={18} />
                  เปิดเสียง
                </button>

                <button
                  onClick={denyPermission}
                  className="
                  flex-1
                  py-3 rounded-xl
                  bg-white/10
                  hover:bg-white/20
                  text-gray-300
                  transition
                  flex items-center justify-center gap-2
                  cursor-pointer
                "
                >
                  <VolumeX size={18} />
                  ปิดไว้ก่อน
                </button>
              </div>

              <p className="text-base text-white">
                สามารถเปิดหรือปรับเสียงได้ภายหลัง
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
