"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useStoryStore } from "@/src/store/useStoryStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import StartStoryBg from "@/public/story/StartStoryBg.png";
import IconWarning from "@/public/story/IconWarning.png";
import Warning from "@/public/story/Warning.png";
import Navbar from "../layout/Navbar";

export default function StartStory() {
  const router = useRouter();
  const setStoryStarted = useStoryStore((s) => s.setStoryStarted);
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const onStarted = () => {
    if (isExiting) return;
    setIsExiting(true);
  };

  const onBack = () => {
    if (isExiting) return;
    setIsExiting(true);
    timerRef.current = setTimeout(() => router.push("/"), 600);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex flex-col justify-center items-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="fixed inset-0 z-9999 bg-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onAnimationComplete={() => {
          if (isExiting && !timerRef.current) {
            setStoryStarted(true);
          }
        }}
      />
      <Navbar />
      <div
        className="absolute inset-0 pointer-events-none aspect-auto z-0"
        aria-hidden="true"
      >
        <Image
          src={StartStoryBg}
          alt="Start Story Choice Image Background"
          fill
          className="w-full h-full object-cover pointer-events-none"
          priority
        />
      </div>
      <div
        className="relative container mx-auto w-auto h-fit flex flex-col justify-center items-center gap-5 sm:gap-6 md:gap-8 lg:gap-10 bg-[#06122D]/80 rounded-[36px] pt-6 sm:pt-8 lg:pt-10 pb-8.75 sm:pb-10.75 lg:pb-12.75 z-10"
        aria-label="Start Story warning popup"
      >
        {/* Border layer */}
        <div className="absolute inset-0 rounded-4xl border-3 3xl:border-5 border-[#FF0059] pointer-events-none shadow-[0_0_120px_rgba(255,29,109,0.3)] " />
        {/* Warning Icon */}
        <div
          data-cursor-expand
          className="w-full h-full flex flex-col items-center gap-4"
        >
          <Image
            src={IconWarning}
            alt="Start Story Icon Warning !"
            width={400}
            height={400}
            priority
            className="w-8 sm:w-13 md:w-15 lg:w-20 3xl:w-25 object-contain pointer-events-none animate-pulse"
          />

          <Image
            src={Warning}
            alt="Start Story Warning Word !"
            width={400}
            height={400}
            priority
            className="w-35 sm:w-55 md:w-65 lg:w-75 xl:w-85 3xl:w-95 object-contain pointer-events-none"
          />
        </div>
        {/* Content */}
        <div
          data-cursor-expand
          className="w-full flex flex-col justify-center items-center gap-4 sm:gap-6 lg:gap-8 3xl:whitespace-nowrap"
        >
          <p className="text-[11px] sm:text-sm md:text-base lg:text-lg xl:text-xl 3xl:text-2xl font-normal text-white leading-relaxed text-center">
            เว็บไซต์เชิงปฏิสัมพันธ์นี้จัดทำขึ้นเพื่อสะท้อนผลกระทบของภาวะความกลัวที่จะพลาด
            <br className="hidden sm:block" />
            บางอย่าง (FOMO) ผ่านตัวละครสมมุติ{" "}
            <span className="text-[#FF1D6D] font-medium">
              ไม่ใช่แบบทดสอบทางจิตวิทยาแต่อย่างใด
            </span>
          </p>
          <p className="text-[11px] sm:text-sm md:text-base lg:text-lg xl:text-xl 3xl:text-2xl font-normal text-white leading-relaxed text-center">
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
        <div className="w-full flex flex-row justify-around items-center gap-12 lg:gap-18">
          <button
            onClick={onBack}
            aria-label="เริ่มเรื่องราวประสบการณ์ FOMO"
            className="w-full sm:w-[40%] flex flex-col justify-center items-center gap-2 lg:gap-4 cursor-pointer hover:*:text-[#FF0B60] group bg-transparent border-none outline-none hover:-translate-y-2 hover:animate-pulse transition-all duration-200 ease-in-out"
          >
            <div
              className="w-full h-0.75 sm:h-1 lg:h-1.25 rounded-md bg-linear-to-r from-transparent via-[#FF0B60] to-transparent"
              aria-hidden="true"
            />
            <span className="text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-[21px] 3xl:text-2xl font-bold text-white/90">
              ย้อนกลับ
            </span>
            <div
              className="w-full h-0.75 sm:h-1 lg:h-1.25 rounded-md bg-linear-to-r from-transparent via-[#FF0B60] to-transparent"
              aria-hidden="true"
            />
          </button>
          <button
            onClick={onStarted}
            aria-label="เริ่มเรื่องราวประสบการณ์ FOMO"
            className="w-full sm:w-[40%] flex flex-col justify-center items-center gap-2 lg:gap-4 cursor-pointer hover:*:text-[#FF0B60] group bg-transparent border-none outline-none hover:-translate-y-2 hover:animate-pulse transition-all duration-200 ease-in-out"
          >
            <div
              className="w-full h-0.75 sm:h-1 lg:h-1.25 rounded-md bg-linear-to-r from-transparent via-[#FF0B60] to-transparent"
              aria-hidden="true"
            />
            <span className="text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-[21px] 3xl:text-2xl font-bold text-white/90">
              เข้าสู่เรื่องราว
            </span>
            <div
              className="w-full h-0.75 sm:h-1 lg:h-1.25 rounded-md bg-linear-to-r from-transparent via-[#FF0B60] to-transparent"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
