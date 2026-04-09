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
import { Github, Instagram, Mail } from "lucide-react";
import { BehanceIcon, TwitterXIcon } from "../Icons";
import Link from "next/link";

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
    contacts: [
      {
        icon: Instagram,
        link: "https://www.instagram.com/q_nuphon",
        label: "Instagram",
      },
      {
        icon: Mail,
        link: "mailto:danuphonchaiyakham@gmail.com",
        label: "Email",
      },
    ],
  },
  {
    id: 3,
    nickName: "Ohm",
    name: "Teerapob\nProngrastme",
    position: "Graphic Designer",
    image: Ohm,
    contacts: [
      {
        icon: Instagram,
        link: "https://www.instagram.com/zoexzone_",
        label: "Instagram",
      },
      {
        icon: TwitterXIcon,
        link: "https://x.com/zoexzone_",
        label: "Twitter",
      },
      {
        icon: BehanceIcon,
        link: "https://www.behance.net/teerao1",
        label: "Behance",
      },
    ],
  },
  {
    id: 4,
    nickName: "New",
    name: "Jedsadaporn\nJirakunkitti",
    position: "Developer",
    image: New,
    contacts: [
      {
        icon: Instagram,
        link: "https://www.instagram.com/4tarashii_",
        label: "Instagram",
      },
      {
        icon: Github,
        link: "https://github.com/Jedsadaporn05",
        label: "GitHub",
      },
    ],
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
      <div className="max-w-960 min-[3841px]:aspect-video min-[3841px]:min-h-full w-full min-h-dvh relative flex flex-col justify-center items-center py-30 lg:py-12">
        {/* Gradient Top */}
        <div className="absolute top-0 w-full h-[5dvh] lg:h-[7dvh] pointer-events-none bg-linear-to-b from-[#0f1636] to-transparent z-5" />
        {/* Image Background */}
        <div className="absolute w-full h-full inset-0 aspect-auto">
          {/* Desktop */}
          <Image
            src={MembersBgImg}
            alt="Members Background"
            fill
            sizes="100vw"
            className=" w-full h-full object-cover object-center pointer-events-none"
          />
          {/* Mobile */}
          <Image
            src={MembersBgMobileImg}
            alt="Members Background Mobile"
            fill
            sizes="100vw"
            className="block lg:hidden w-full h-full object-cover object-center pointer-events-none"
          />
        </div>
        <motion.div
          className="container mx-auto max-w-none flex flex-col gap-18 sm:gap-20 md:gap-22 lg:gap-20 xl:gap-24 3xl:gap-32 z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Title */}
          <motion.h2
            variants={titleVariants}
            data-cursor-expand
            className="w-fit mx-auto text-2xl sm:text-3xl md:text-[40px] lg:text-4xl 2xl:text-[40px] 3xl:text-6xl font-bold text-white text-center"
          >
            ทีมงานของเรา
          </motion.h2>
          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 justify-items-center gap-14 min-[475px]:gap-18 sm:gap-20 lg:gap-0">
            {cards.map((card) => (
              <motion.article
                key={card.id}
                variants={sphereVariants}
                className="w-full h-full flex flex-row lg:flex-col items-start gap-6 min-[475px]:gap-16 sm:gap-20 md:gap-24 lg:gap-10 xl:gap-12 max-w-100 sm:max-w-110 md:max-w-140 lg:max-w-45 xl:max-w-50 2xl:max-w-60 3xl:max-w-80"
              >
                {/* Photo */}
                <div
                  data-cursor-expand
                  className="relative max-[475px]:w-[40%] max-[475px]:shrink-0 w-full shadow-md transition-all duration-300 ease-in-out hover:scale-103 overflow-hidden aspect-square"
                >
                  <Image
                    src={card.image}
                    alt={card.nickName || card.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-contain object-center pointer-events-none"
                  />
                </div>
                {/* Info */}
                <div
                  data-cursor-expand
                  className={`w-full h-full lg:h-fit flex flex-col items-start gap-2 min-[475px]:gap-4 md:gap-5 lg:gap-4 xl:gap-5 text-left ${card.id === 1 ? "pt-2 md:pt-4 lg:pt-0" : "pt-1 lg:pt-0"}`}
                >
                  {card.nickName && (
                    <h3 className="text-xl min-[475px]:text-3xl sm:text-[34px] md:text-[45px] lg:text-3xl 2xl:text-[32px] 3xl:text-[42px] font-bold text-[#FF3279] uppercase">
                      {card.nickName}
                    </h3>
                  )}
                  <h3
                    className={`font-semibold uppercase whitespace-pre-line ${
                      card.id === 1
                        ? "text-[#FF3279] text-base min-[475px]:text-xl sm:text-2xl md:text-3xl lg:text-xl 2xl:text-[22px] 3xl:text-3xl"
                        : "text-white text-base min-[475px]:text-xl sm:text-[22px] md:text-2xl lg:text-xl 2xl:text-[22px] 3xl:text-3xl"
                    }`}
                  >
                    {card.name}
                  </h3>
                  <div className="flex flex-col items-start gap-2 min-[475px]:gap-4 md:gap-5 lg:gap-4 xl:gap-5">
                    <p className="text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 3xl:text-xl font-light uppercase text-white">
                      {card.position}
                    </p>
                    {/* Social Links */}
                    <div className="flex flex-row justify-start items-start gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-4">
                      {card.contacts?.map((contact, index) => {
                        const Icon = contact.icon;

                        return (
                          <Link
                            key={index}
                            href={contact.link}
                            target="_blank"
                            aria-label={contact.label}
                            className="text-white/85 hover:text-[#FF3279] transition-colors duration-300 ease-in-out"
                          >
                            <Icon
                              strokeWidth={1.75}
                              className={`${contact.icon === Mail ? "size-4.5 sm:size-5.75 md:size-6.25 lg:size-5.75 xl:size-6.25 2xl:size-6.75 3xl:size-7.5" : "size-4.25 sm:size-5.25 md:size-6 lg:size-5.5 xl:size-6 2xl:size-6.5 3xl:size-7"}`}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
