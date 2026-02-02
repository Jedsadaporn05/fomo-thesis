"use client";

import { useStoryStore } from "@/src/store/useStoryStore";
import { motion } from "framer-motion";
import Link from "next/link";
import { easeOut } from "framer-motion";

export default function ToBeContinue() {
  const { resetStory } = useStoryStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: easeOut },
    },
  };

  return (
    <section className="relative w-full min-h-dvh overflow-hidden bg-[#0a1738] flex flex-col items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center gap-10 px-6 text-center"
      >
        {/* Subtitle */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal text-gray-200 tracking-widest drop-shadow-2xl">
            โปรดติดตามต่อไป...
          </h2>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link
            href="/"
            onClick={resetStory}
            className="group flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all duration-500 ease-out"
          >
            <span className="text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-300 tracking-wide group-hover:text-white transition-colors duration-300">
              กลับสู่หน้าหลัก
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
