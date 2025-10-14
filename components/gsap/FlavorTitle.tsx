"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

export default function FlavorTitle() {
  useGSAP(() => {
    const firstTextSplit = SplitText.create(".first-text-split", {
      type: "chars",
    });
    const secondTextSplit = SplitText.create(".second-text-split", {
      type: "chars",
    });

    gsap.from(firstTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top 30%",
      },
    });

    gsap.to(".flavor-text-scroll", {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top 10%",
      },
    });

    gsap.from(secondTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top 1%",
      },
    });
  });

  return (
    <div className="general-title 2xl:text-[8.5rem] md:text-8xl text-5xl font-bold uppercase leading-[9vw] tracking-[-.35vw] col-center flex flex-col justify-center items-center h-full gap-16 xl:gap-24 2xl:gap-32">
      {/* First Title */}
      <div className="overflow-hidden py-3 2xl:py-0 first-text-split md:text-center text-dark-brown">
        <h1>We have 6</h1>
      </div>
      {/* Text label with clipPath */}
      <div
        style={{
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        }}
        className="flavor-text-scroll rotate-[-3deg] md:translate-y-5 border-[.5vw] border-milk absolute z-10"
      >
        <div className="bg-mid-brown pb-5 pt-3 2xl:pt-0 px-3 2xl:px-5">
          <h2 className="text-milk">freaking</h2>
        </div>
      </div>
      {/* Second Title */}
      <div className="overflow-hidden py-3 2xl:py-0 second-text-split md:text-center">
        <h1>delicious flavors</h1>
      </div>
    </div>
  );
}
