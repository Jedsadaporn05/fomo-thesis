"use client";

import Image from "next/image";
import BgImg1 from "@/public/home/member-section/MembersBg-1.png";
import { easeOut, motion } from "framer-motion";

const cards = [
  {
    id: 1,
    title: "Member 1",
  },
  {
    id: 2,
    title: "Member 2",
  },
  {
    id: 3,
    title: "Member 3",
  },
  {
    id: 4,
    title: "Advisor",
  },
];

export default function MemberSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  const sphereVariants = {
    hidden: { y: 50 },
    visible: {
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <section
      id="Members"
      className="w-full min-h-dvh py-12 pb-36 relative flex flex-col justify-center items-center"
    >
      {/* Blur Top */}
      <div className="absolute top-0 w-full h-[15vh] pointer-events-none bg-linear-to-b from-[#0a1738] to-transparent z-30" />
      {/* Image Background */}
      <div className="hidden lg:block">
        <div className="absolute w-full h-full inset-0">
          <Image
            src={BgImg1}
            alt="Members Background 1"
            fill
            className="w-full h-full object-cover object-center pointer-events-none"
            priority
          />
        </div>
      </div>

      <motion.div
        className="container mx-auto flex flex-col gap-8 lg:px-10 2xl:px-12 z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Title */}
        <motion.h2
          variants={titleVariants}
          className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-relaxed tracking-normal text-center py-6"
        >
          ผู้จัดทำ
        </motion.h2>
        {/* Content */}
        <div className="w-full flex flex-wrap justify-center gap-8 lg:gap-12 xl:gap-24 xl:gap-y-14 px-4 xl:px-34">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={sphereVariants}
              className="relative group w-40 h-40 sm:w-48 sm:h-48 md:w-56 2xl:w-68 md:h-56 2xl:h-68 rounded-full cursor-pointer transition-all duration-300 ease-out hover:scale-103 will-change-transform motion-safe:[@media(hover:hover)]:hover:scale-[1.03]"
            >
              <div className="absolute inset-0 rounded-full bg-linear-to-tr from-[#071A44] via-[#214BA9] to-[#9FBDFF] shadow-[0_10px_20px_rgba(0,0,0,0.4),inset_0_3px_4px_rgba(255,255,255,0.3)] transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-full rounded-full bg-linear-to-br from-white/20 via-transparent to-transparent opacity-80 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
