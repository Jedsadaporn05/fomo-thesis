"use client";

import Image from "next/image";
import MembersBgImg from "@/public/home/member-section/MembersBg-Mockup.png";
import { easeOut, motion } from "framer-motion";

const cards = [
  {
    id: 1,
    nickName: "",
    name: "Mr.Nuttapong\nPrasertsung",
    position: "Advisor",
  },
  {
    id: 2,
    nickName: "Q",
    name: "Danuphon\nChaiyakham",
    position: "Graphic Designer",
  },
  {
    id: 3,
    nickName: "Ohm",
    name: "Teerapob\nProngrastme",
    position: "Graphic Designer",
  },
  {
    id: 4,
    nickName: "New",
    name: "Jedsadaporn\nJirakunkitti",
    position: "Developer",
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
      className="w-full h-full flex justify-center items-center"
    >
      <div className="max-w-960 min-[3841px]:aspect-video w-full h-dvh max-h-dvh lg:max-h-[95dvh] xl:max-h-dvh py-12 pb-36 relative flex flex-col justify-center items-center">
        {/* Gradient Top */}
        <div className="absolute top-0 w-full h-[15vh] pointer-events-none bg-linear-to-b from-[#0a1738] to-transparent z-5" />
        {/* Image Background */}
        <div className="hidden lg:block">
          <div className="absolute w-full h-full inset-0">
            <Image
              src={MembersBgImg}
              alt="Members Background 1"
              fill
              className="w-full h-full object-cover object-center pointer-events-none"
              priority
            />
          </div>
        </div>
        <motion.div
          className="container mx-auto flex flex-col gap-16 lg:gap-24 lg:px-10 2xl:px-12 z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Title */}
          <motion.h2
            variants={titleVariants}
            className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-white text-center"
          >
            ทีมงานของเรา
          </motion.h2>
          {/* Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-12 xl:gap-24 2xl:gap-36">
            {cards.map((card) => (
              <motion.article
                key={card.id}
                variants={sphereVariants}
                className="flex flex-col items-center xl:items-start gap-6 sm:gap-10 xl:gap-12 w-55 sm:w-65 lg:w-50 2xl:w-75"
              >
                {/* Photo */}
                <div className="w-full aspect-square rounded-4xl sm:rounded-[2.5rem] bg-[#FF0059] shadow-md transition-transform duration-300 ease-out hover:scale-103 cursor-pointer" />
                {/* Info */}
                <div className="flex flex-col items-center lg:items-start gap-3 sm:gap-4 xl:gap-5 text-center lg:text-left">
                  {card.nickName && (
                    <h3 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-[#FF3279] uppercase">
                      {card.nickName}
                    </h3>
                  )}
                  <h4
                    className={`text-lg sm:text-xl xl:text-2xl font-semibold uppercase whitespace-pre-line ${
                      card.id === 1 ? "text-[#FF3279]" : "text-white"
                    }`}
                  >
                    {card.name}
                  </h4>
                  <p className="text-sm sm:text-base xl:text-lg font-light uppercase text-white">
                    {card.position}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
