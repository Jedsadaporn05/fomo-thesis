"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useStoryStore } from "@/src/store/useStoryStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../layout/Navbar";
import { useClickSound } from "@/src/hooks/useClickSound";

export default function StartStory() {
  const router = useRouter();
  const playClickSound = useClickSound();
  const setStoryStarted = useStoryStore((s) => s.setStoryStarted);
  const [isExiting, setIsExiting] = useState(false);
  const [isBgLoaded, setIsBgLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const onStarted = () => {
    playClickSound();
    if (isExiting) return;
    setIsExiting(true);
  };

  const onBack = () => {
    playClickSound();
    if (isExiting) return;
    setIsExiting(true);
    timerRef.current = setTimeout(() => router.push("/"), 600);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex flex-col justify-center items-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: isBgLoaded ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="fixed inset-0 z-9999 bg-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onAnimationComplete={() => {
          if (isExiting && !timerRef.current) {
            setTimeout(() => {
              setStoryStarted(true);
            }, 100);
          }
        }}
      />
      <Navbar />
      <div
        className="absolute inset-0 pointer-events-none aspect-auto z-0"
        aria-hidden="true"
      >
        <Image
          src="https://cdn.fomo-gracie.com/image/story/StartStoryBg.png"
          alt="Start Story Choice Image Background"
          fill
          className="w-full h-full object-cover pointer-events-none"
          priority
          onLoad={() => setIsBgLoaded(true)}
        />
      </div>
      <div
        className="relative container mx-auto w-auto h-fit flex flex-col justify-center items-center gap-5 sm:gap-6 md:gap-8 lg:gap-10 bg-[#06122D]/80 rounded-4xl pt-6 sm:pt-8 lg:pt-10 pb-8.75 sm:pb-10.75 lg:pb-12.75 z-10 landscape:gap-4 landscape:lg:gap-10 landscape:pt-5 landscape:lg:pt-10 landscape:pb-5.75 landscape:lg:pb-12.75"
        aria-label="Start Story warning popup"
      >
        {/* Border layer */}
        <div className="absolute inset-0 rounded-4xl border-3 3xl:border-5 border-[#FF0059] pointer-events-none shadow-[0_0_120px_rgba(255,29,109,0.3)] " />
        {/* Warning Icon */}
        <div
          data-cursor-expand
          className="w-full h-full flex flex-col items-center gap-4 landscape:gap-2 landscape:lg:gap-4"
        >
          <Image
            src="https://cdn.fomo-gracie.com/image/story/IconWarning.png"
            alt="Start Story Icon Warning !"
            width={400}
            height={400}
            priority
            className="w-8 sm:w-13 md:w-15 lg:w-20 3xl:w-25 object-contain pointer-events-none animate-pulse landscape:w-5 landscape:sm:w-7.5 landscape:lg:w-20"
          />

          <Image
            src="https://cdn.fomo-gracie.com/image/story/Warning.png"
            alt="Start Story Warning Word !"
            width={400}
            height={400}
            priority
            className="w-35 sm:w-55 md:w-65 lg:w-75 xl:w-85 3xl:w-95 object-contain pointer-events-none landscape:w-25 landscape:sm:w-27 landscape:md:w-35 landscape:lg:w-75"
          />
        </div>
        {/* Content */}
        <div
          data-cursor-expand
          className="w-full flex flex-col justify-center items-center gap-4 sm:gap-6 lg:gap-8 3xl:whitespace-nowrap landscape:gap-2 landscape:lg:gap-8"
        >
          <p className="text-[11px] sm:text-sm md:text-base lg:text-lg xl:text-xl 3xl:text-2xl font-normal text-white leading-relaxed text-center landscape:text-[9px] landscape:sm:text-[10px] landscape:md:text-sm landscape:lg:text-lg">
            เว็บไซต์เชิงปฏิสัมพันธ์นี้จัดทำขึ้นเพื่อสะท้อนผลกระทบของภาวะความกลัวที่จะพลาด
            <br className="hidden sm:block" />
            บางอย่าง (FOMO) ผ่านตัวละครสมมุติ{" "}
            <span className="text-[#FF1D6D] font-medium">
              ไม่ใช่แบบทดสอบทางจิตวิทยาแต่อย่างใด
            </span>
          </p>
          <p className="text-[11px] sm:text-sm md:text-base lg:text-lg xl:text-xl 3xl:text-2xl font-normal text-white leading-relaxed text-center landscape:text-[9px] landscape:sm:text-[10px] landscape:md:text-sm landscape:lg:text-lg">
            เรื่องราวของ Gracie กำลังจะเริ่มต้นขึ้น
            ระหว่างทางคุณจะได้ตัดสินใจแทนเธอ
            <br className="hidden sm:block" />
            และทุกการเลือกของคุณจะกำหนดตอนจบของเรื่องราวนี้หากพร้อมแล้ว
            ไปเริ่มกันเลย
            <br />
            <span className="text-[#FF1D6D] font-medium">
              ** เปิดเสียงและขยายเต็มหน้าจอเพื่อเพิ่มอถรรสในการเล่น **
            </span>
          </p>
        </div>
        {/* Buttons */}
        <div className="w-full flex flex-row justify-around items-center gap-12 lg:gap-18 landscape:gap-8 landscape:lg:gap-18">
          <button
            onClick={onBack}
            aria-label="เริ่มเรื่องราวประสบการณ์ FOMO"
            className="w-full sm:w-[40%] flex flex-col justify-center items-center gap-2 lg:gap-4 cursor-pointer hover:*:text-[#FF0B60] group bg-transparent border-none outline-none hover:-translate-y-2 hover:animate-pulse transition-all duration-200 ease-in-out landscape:gap-1.75 landscape:lg:gap-4"
          >
            <div
              className="w-full h-[2.75px] sm:h-1 lg:h-1.25 rounded-md bg-linear-to-r from-transparent via-[#FF0B60] to-transparent landscape:h-0.5 landscape:sm:h-[2.25px] landscape:lg:h-1.25"
              aria-hidden="true"
            />
            <span className="text-[11px] sm:text-sm md:text-base lg:text-lg 2xl:text-xl 3xl:text-2xl font-bold text-white/90 landscape:text-[9px] landscape:sm:text-[10px] landscape:md:text-sm landscape:lg:text-lg">
              ย้อนกลับ
            </span>
            <div
              className="w-full h-[2.75px] sm:h-1 lg:h-1.25 rounded-md bg-linear-to-r from-transparent via-[#FF0B60] to-transparent landscape:h-0.5 landscape:sm:h-[2.25px] landscape:lg:h-1.25"
              aria-hidden="true"
            />
          </button>
          <button
            onClick={onStarted}
            aria-label="เริ่มเรื่องราวประสบการณ์ FOMO"
            className="w-full sm:w-[40%] flex flex-col justify-center items-center gap-2 lg:gap-4 cursor-pointer hover:*:text-[#FF0B60] group bg-transparent border-none outline-none hover:-translate-y-2 hover:animate-pulse transition-all duration-200 ease-in-out landscape:gap-1.75 landscape:lg:gap-4"
          >
            <div
              className="w-full h-[2.75px] sm:h-1 lg:h-1.25 rounded-md bg-linear-to-r from-transparent via-[#FF0B60] to-transparent landscape:h-0.5 landscape:sm:h-[2.25px] landscape:lg:h-1.25"
              aria-hidden="true"
            />
            <span className="text-[11px] sm:text-sm md:text-base lg:text-lg 2xl:text-xl 3xl:text-2xl font-bold text-white/90 landscape:text-[9px] landscape:sm:text-[10px] landscape:md:text-sm landscape:lg:text-lg">
              เข้าสู่เรื่องราว
            </span>
            <div
              className="w-full h-[2.75px] sm:h-1 lg:h-1.25 rounded-md bg-linear-to-r from-transparent via-[#FF0B60] to-transparent landscape:h-0.5 landscape:sm:h-[2.25px] landscape:lg:h-1.25"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
