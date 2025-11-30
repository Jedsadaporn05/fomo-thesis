"use client";

import { useStoryStore } from "@/store/storyStore";
import { useEffect } from "react";
import Image from "next/image";
import IntroImg1 from "@/public/story/scene/Scene-1.png";

export default function Intro() {
  const { goToScene } = useStoryStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      goToScene("scene-1");
    }, 2000);

    return () => clearTimeout(timer);
  }, [goToScene]);

  return (
    <div className="relative w-full min-h-dvh flex flex-col items-center justify-center text-white">
      {/* Background */}
      <div className="absolute w-full h-full inset-0">
        <Image
          src={IntroImg1}
          alt="Intro"
          fill
          className="w-full h-full object-cover object-center pointer-events-none"
        />
        {/* Top Gradient */}
        <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-black/60 to-transparent" />
      </div>
      {/* Button Go to Next Scene */}
      {/* <div className="container mx-auto flex flex-col justify-center items-center lg:px-10 2xl:px-12 z-10">
        <button
          onClick={() => goToScene("scene-1")}
          className="opacity-0 cursor-pointer px-6 py-3 bg-[#FF2D77] hover:bg-[#FF2D77]/80 rounded-full transition-all"
        >
          Next
        </button>
      </div> */}
    </div>
  );
}
