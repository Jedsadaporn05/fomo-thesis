"use client";

import { useStoryStore } from "@/src/store/useStoryStore";
import Image from "next/image";
import ImgDecision1 from "@/public/story/decision/Decision-1.png";

export default function Decision1() {
  const { goToScene, addScore } = useStoryStore();

  const handleChoice = (isGoodChoice: boolean) => {
    if (isGoodChoice) {
      addScore(5);
    } else {
      addScore(-5);
    }

    goToScene("to-be-continue");
  };

  return (
    <div className="flex flex-col items-center gap-6 text-white">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <Image
          src={ImgDecision1}
          alt="Decision 1"
          fill
          className="w-full h-full object-cover object-center pointer-events-none"
        />
        {/* Top Gradient */}
        <div className="absolute top-0 w-full h-1/3 bg-linear-to-b from-black/60 to-transparent" />
        {/* Bottom Gradient */}
        <div className="absolute bottom-0 w-full h-1/3 bg-linear-to-t from-black/60 to-transparent" />
      </div>

      <div className="relative z-10 w-full h-full min-h-screen flex flex-col justify-between py-12 sm:py-20 px-6">
        <div className="w-full flex justify-center mt-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white text-center drop-shadow-md tracking-wide">
            ในตอนนี้ฉันควรทำอย่างไงดี?
          </h2>
        </div>
        {/* Buttons */}
        <div className="w-screen container mx-auto flex flex-row gap-4 sm:gap-8 justify-between items-end pb-10 sm:pb-16">
          <button
            onClick={() => handleChoice(true)}
            className="cursor-pointer flex-1 max-w-87.5 py-4 sm:py-5 lg:py-6 px-6 rounded-full 
            bg-black/70 hover:bg-black/80 text-white/90 hover:text-white shadow-lg border border-white/10
            text-lg sm:text-xl lg:text-2xl font-medium transition-all duration-300 hover:scale-105 active:scale-95"
          >
            อ่านต่ออีกหน่อย
          </button>
          <button
            onClick={() => handleChoice(false)}
            className="cursor-pointer flex-1 max-w-87.5 py-4 sm:py-5 lg:py-6 px-6 rounded-full 
            bg-black/70 hover:bg-black/80 text-white/90 hover:text-white shadow-lg border border-white/10
            text-lg sm:text-xl lg:text-2xl font-medium transition-all duration-300 hover:scale-105 active:scale-95"
          >
            ปิดไปก่อน
          </button>
        </div>
      </div>
    </div>
  );
}
