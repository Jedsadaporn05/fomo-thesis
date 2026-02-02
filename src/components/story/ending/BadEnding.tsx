"use client";

import { useStoryStore } from "@/src/store/useStoryStore";
import { motion } from "framer-motion";
import Link from "next/link";
import { RefreshCcw, Home } from "lucide-react";

export default function BadEnding() {
  const { resetStory } = useStoryStore();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-linear-to-b from-red-950 to-black text-white p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center gap-6 text-center max-w-lg"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-red-500 drop-shadow-lg">
          Bad Ending
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
          <button
            onClick={resetStory}
            className="whitespace-nowrap flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-500 hover:scale-105 transition-all shadow-lg shadow-red-900/50 group"
          >
            <RefreshCcw className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-500" />
            ลองใหม่
          </button>
          <Link
            href="/"
            onClick={() => {
              resetStory();
            }}
            className="whitespace-nowrap flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-white/10 text-gray-300 rounded-xl font-semibold text-lg hover:scale-105 hover:bg-white/10 hover:text-white transition-all"
          >
            <Home className="w-5 h-5" />
            ออกเกม
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
