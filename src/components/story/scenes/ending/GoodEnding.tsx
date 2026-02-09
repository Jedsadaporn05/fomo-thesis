"use client";

import { useStoryStore } from "@/src/store/useStoryStore";
import { motion } from "framer-motion";
import Link from "next/link";
import { RefreshCcw, Home } from "lucide-react";

export default function GoodEnding() {
  const { resetStory } = useStoryStore();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-linear-to-b from-green-900 to-black text-white p-6 overflow-hidden">
      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-6 text-center max-w-lg"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-green-500 drop-shadow-lg">
          Good Ending
        </h2>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
          <button
            onClick={resetStory}
            className="whitespace-nowrap flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-green-900 rounded-xl font-bold text-lg hover:scale-105 hover:bg-gray-100 transition-all shadow-lg group"
          >
            <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            เล่นอีกครั้ง
          </button>
          <Link
            href="/"
            onClick={() => {
              resetStory();
            }}
            className="whitespace-nowrap flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-800/50 border border-green-500/30 text-white rounded-xl font-semibold text-lg hover:scale-105 hover:bg-green-800 hover:border-green-500 transition-all"
          >
            <Home className="w-5 h-5" />
            หน้าแรก
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
