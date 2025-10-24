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
    <div className="general-title 2xl:text-9xl md:text-8xl text-5xl font-bold uppercase tracking-[-.35vw] flex flex-col justify-center items-center h-full gap-16 xl:gap-24 2xl:gap-50">
      {/* First Title */}
      <div className="w-full overflow-hidden py-3 2xl:py-0 first-text-split md:text-center text-white">
        <h1>IS</h1>
      </div>
      {/* Text label with clipPath */}
      <div
        style={{
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        }}
        className="flavor-text-scroll rotate-[-3deg] md:-translate-y-18 border-[.5vw] border-yellow-brown absolute z-10"
      >
        <div className="bg-light-brown py-3 px-3 2xl:px-5">
          <h2 className="text-white">FOMO</h2>
        </div>
      </div>
      {/* Second Title */}
      <div className="w-full overflow-hidden py-3 2xl:py-0 second-text-split md:text-center text-white">
        <h1>That <br/> scary?</h1>
      </div>
    </div>
  );
}
