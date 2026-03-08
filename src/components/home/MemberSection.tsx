"use client";

import Image from "next/image";
import { useMemo } from "react";
import { easeOut, motion } from "framer-motion";
import Advisor from "@/public/home/member-section/Advisor.png";
import Q from "@/public/home/member-section/Q.png";
import Ohm from "@/public/home/member-section/Ohm.png";
import New from "@/public/home/member-section/New.png";
import MembersBgImg from "@/public/home/member-section/MembersBg-Mockup.png";
import MembersBgMobileImg from "@/public/home/member-section/MembersBg-Mobile-Mockup.png";

const cards = [
  {
    id: 1,
    nickName: "",
    name: "Mr.Nuttapong\nPrasertsung",
    position: "Advisor",
    image: Advisor,
  },
  {
    id: 2,
    nickName: "Q",
    name: "Danuphon\nChaiyakham",
    position: "Graphic Designer",
    image: Q,
  },
  {
    id: 3,
    nickName: "Ohm",
    name: "Teerapob\nProngrastme",
    position: "Graphic Designer",
    image: Ohm,
  },
  {
    id: 4,
    nickName: "New",
    name: "Jedsadaporn\nJirakunkitti",
    position: "Developer",
    image: New,
  },
];

export default function MemberSection() {
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.12,
          delayChildren: 0.2,
        },
      },
    }),
    [],
  );

  const titleVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: -50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: easeOut },
      },
    }),
    [],
  );

  const sphereVariants = useMemo(
    () => ({
      hidden: { y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: easeOut },
      },
    }),
    [],
  );

  return (
    <section
      id="Members"
      className="w-full h-full flex justify-center items-center"
    >
      <div className="max-w-960 min-[3841px]:aspect-video min-[3841px]:min-h-full w-full min-h-dvh py-12 relative flex flex-col justify-center items-center">
        {/* Gradient Top */}
        <div className="absolute top-0 w-full h-[7dvh] pointer-events-none bg-linear-to-b from-[#0f1636] to-transparent z-5" />
        {/* Image Background */}
        <div className="absolute w-full h-full inset-0 aspect-auto">
          {/* Desktop */}
          <Image
            src={MembersBgImg}
            alt="Members Background"
            fill
            className=" w-full h-full object-cover object-center pointer-events-none"
          />
          {/* Mobile */}
          <Image
            src={MembersBgMobileImg}
            alt="Members Background Mobile"
            fill
            className="block lg:hidden w-full h-full object-cover object-center pointer-events-none"
          />
        </div>
        <motion.div
          className="container mx-auto flex flex-col gap-12 sm:gap-16 lg:gap-24 z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Title */}
          <motion.h2
            variants={titleVariants}
            className="text-2xl sm:text-3xl md:text-4xl 2xl:text-[40px] 3xl:text-5xl font-bold text-white text-center"
          >
            ทีมงานของเรา
          </motion.h2>
          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 justify-items-center gap-6 lg:gap-0">
            {cards.map((card) => (
              <motion.article
                key={card.id}
                variants={sphereVariants}
                className="w-full h-full flex flex-row lg:flex-col items-center xl:items-start gap-6 sm:gap-10 xl:gap-12 max-w-full lg:max-w-50 2xl:max-w-60 3xl:max-w-90"
              >
                {/* Photo */}
                <div className="relative w-full shadow-md transition-all duration-300 ease-in-out hover:scale-103 cursor-pointer overflow-hidden aspect-square">
                  <Image
                    src={card.image}
                    alt={card.nickName || card.name}
                    fill
                    className="object-cover object-center pointer-events-none"
                  />
                </div>
                {/* Info */}
                <div className="w-full flex flex-col items-center lg:items-start gap-3 sm:gap-4 xl:gap-5 text-center lg:text-left">
                  {card.nickName && (
                    <h3 className="text-2xl sm:text-3xl 2xl:text-[32px] 3xl:text-[34px] font-bold text-[#FF3279] uppercase">
                      {card.nickName}
                    </h3>
                  )}
                  <h4
                    className={`text-lg sm:text-xl 2xl:text-[22px] 3xl:text-2xl font-semibold uppercase whitespace-pre-line ${
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
