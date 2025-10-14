"use client";

import { flavorlists } from "@/data/gsap/index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

export default function FlavorSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(
    () => {
      if (sliderRef.current) {
        const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

        if (!isTablet) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".flavor-section",
              start: "top top",
              end: `+=${scrollAmount + 1500}`,
              scrub: true,
              pin: true,
            },
          });

          tl.to(".flavor-section", {
            x: `-${scrollAmount + 1500}`,
            ease: "none",
          });
        }

        const titleTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".flavor-section",
            start: "top top",
            end: "bottom 80%",
            scrub: true,
          },
        });

        titleTl
          .to(".first-text-split", {
            xPercent: -30,
            ease: "power1.inOut",
          })
          .to(
            ".flavor-text-scroll",
            {
              xPercent: -22,
              ease: "power1.inOut",
            },
            "<"
          )
          .to(
            ".second-text-split",
            {
              xPercent: -10,
              ease: "power1.inOut",
            },
            "<"
          );
      }
    },
    { dependencies: [isTablet], revertOnUpdate: true }
  );

  return (
    <div
      ref={sliderRef}
      className="slider-wrapper lg:h-dvh min-h-dvh md:min-h-fit w-full mt-0 md:mt-20 xl:mt-0"
    >
      {/* Cards */}
      <div className="flavors h-full w-full flex md:flex-row flex-col items-center 2xl:gap-72 lg:gap-52 md:gap-24 gap-7 flex-nowrap">
        {flavorlists.map((flavor) => (
          <div
            key={flavor.name}
            className={`relative z-30 w-96 md:w-[90vw] lg:w-[50vw] h-80 md:h-[50vh] lg:h-[70vh] flex-none ${flavor.rotation}`}
          >
            {/* Background */}
            <Image
              src={`/gsap/images/${flavor.color}-bg.svg`}
              alt=""
              width={1920}
              height={1080}
              className="absolute bottom-0"
            />
            {/* Drinks */}
            <Image
              src={`/gsap/images/${flavor.color}-drink.webp`}
              alt=""
              width={1920}
              height={1080}
              className="w-auto drinks absolute left-1/2 -translate-x-1/2 bottom-0 md:h-full h-80"
            />
            {/* Elements */}
            <Image
              src={`/gsap/images/${flavor.color}-elements.webp`}
              alt=""
              width={1920}
              height={1080}
              className="elements absolute md:top-0 md:bottom-auto bottom-10 w-full"
            />
            {/* Text on Cards */}
            <h1 className="absolute md:bottom-10 md:left-10 bottom-5 left-5 text-milk md:text-6xl text-3xl font-semibold uppercase tracking-tighter">
              {flavor.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
