"use client";

import Image from "next/image";
import heroImageTablet from "@/public/gsap/images/hero-img.png";
import heroImageMobile from "@/public/gsap/images/hero-bg.png";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

export default function HeroSection() {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const titleSplit = SplitText.create(".hero-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 1,
    });

    tl.to(".hero-content", {
      opacity: 1,
      y: 0,
      ease: "power1.inOut",
    })
      .to(
        ".hero-text-scroll",
        {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.5"
      )
      .from(
        titleSplit.chars,
        {
          yPercent: 200,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.5"
      );

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    heroTl.to(".hero-container", {
      rotate: 7,
      scale: 0.9,
      yPercent: 30,
      ease: "power1.inOut",
    });
  });

  return (
    <div className="bg-main-bg">
      <div className="hero-container relative bg-milk w-screen h-dvh pb-12 md:pb-0 overflow-hidden">
        {/* Background Image */}
        {isTablet ? (
          <>
            {isMobile && (
              <Image
                src={heroImageMobile}
                alt="heroImageMobile"
                className="absolute bottom-40 size-full object-cover"
              />
            )}
            <Image
              src={heroImageTablet}
              alt="heroImageTablet"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 object-auto"
            />
          </>
        ) : (
          <video
            src="/gsap/videos/hero-bg.mp4"
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Content */}
        <div className="hero-content relative z-10 w-full h-full flex flex-col 2xl:justify-center items-center translate-y-10 2xl:pt-0 md:pt-32 pt-24 opacity-0">
          {/* First Title */}
          <div className="overflow-hidden">
            <h1 className="hero-title text-dark-brown 2xl:text-[8.5rem] md:text-[6.5rem] text-[3.3rem] font-bold uppercase leading-[9vw] tracking-[-.35vw] 2xl:mb-0 mb-5">
              Freaking Delicious
            </h1>
          </div>
          {/* Text label with clipPath */}
          <div
            style={{
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            }}
            className="hero-text-scroll rotate-[-3deg] mb-8 border-[.5vw] border-milk"
          >
            <div className="hero-subtitle bg-mid-brown">
              <h1 className="uppercase 2xl:text-[8.5rem] md:text-[6.5rem] text-[3.3rem] font-bold text-[#fce1cd] leading-[9vw] tracking-[-.35vw] 2xl:px-[1.2vw] px-3 2xl:pb-[1vw] pb-5 2xl:py-0 py-3">
                Portein + Caffine
              </h1>
            </div>
          </div>
          {/* Sub Title */}
          <h2 className="font-paragraph text-dark-brown text-center md:max-w-lg max-w-sm px-5 md:text-lg leading-[115%] mt-3">
            Live life to the fullest  with SPYLT: Shatter boredom and embrace
            your inner kid with every deliciously smooth chug.
          </h2>
          {/* Button */}
          <div className="hero-button md:mt-16 mt-10 text-dark-brown bg-light-brown uppercase font-bold text-lg rounded-full md:p-5 p-3 md:px-16 px-10 cursor-pointer">
            <p>Chug a SPYLT</p>
          </div>
        </div>
      </div>
    </div>
  );
}
