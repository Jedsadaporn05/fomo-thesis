"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";
import { useSound } from "@/context/SoundContext";
import { useState, useEffect } from "react";

export default function SoundConsentModal() {
  const { isAudioEnabled, enableAudio } = useSound();
  const [isVisible, setIsVisible] = useState(false);

  // โชว์ Popup เฉพาะตอนที่ยังไม่ได้เปิดเสียง
  useEffect(() => {
    if (!isAudioEnabled) {
      setIsVisible(true);
    }
  }, [isAudioEnabled]);

  const handleEnable = () => {
    enableAudio(); // สั่งเปิดเสียง + เล่นเพลง
    setIsVisible(false); // ปิด Popup
  };

  const handleDisable = () => {
    setIsVisible(false); // ปิด Popup อย่างเดียว (เสียงยังปิดอยู่)
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        // จัดให้อยู่มุมขวาล่าง หรือตรงกลางก็ได้ตามดีไซน์
        className="fixed bottom-8 right-8 z-[100] max-w-sm w-full p-6 rounded-2xl bg-[#0a1635]/90 backdrop-blur-md border border-white/10 shadow-2xl text-white"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FF2D77]/20 rounded-full text-[#FF2D77]">
              <Volume2 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">เปิดเสียงเพื่ออรรถรส?</h3>
              <p className="text-xs text-gray-300">
                เว็บไซต์นี้มีดนตรีและเสียงประกอบ (SFX)
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              onClick={handleEnable}
              className="flex-1 py-2.5 bg-[#FF2D77] hover:bg-[#E01560] rounded-xl font-semibold text-sm transition-all shadow-lg shadow-[#FF2D77]/20"
            >
              เปิดเสียง (แนะนำ)
            </button>
            <button
              onClick={handleDisable}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-sm transition-all text-gray-300"
            >
              ปิดไว้ก่อน
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
