"use client";

import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

export default function MessageSection() {
  useGSAP(() => {
    const firstMsgSplit = SplitText.create(".first-message", {
      type: "words",
    });
    const secMsgSplit = SplitText.create(".second-message", {
      type: "words",
    });
    const paragraphSplit = SplitText.create(".message-content p", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    gsap.to(firstMsgSplit.words, {
      color: "#faeade",
      ease: "power1.in",
      stagger: 1,
      scrollTrigger: {
        trigger: ".message-content",
        start: "top center",
        end: "30% center",
        scrub: true,
      },
    });
    gsap.to(secMsgSplit.words, {
      color: "#faeade",
      ease: "power1.in",
      stagger: 1,
      scrollTrigger: {
        trigger: ".second-message",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    const revealTl = gsap.timeline({
      delay: 0.5,
      scrollTrigger: {
        trigger: ".msg-text-scroll",
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play none none reset",
      },
    });
    revealTl.to(".msg-text-scroll", {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
      ease: "circ.inOut",
    });

    const paragraphTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".message-content p",
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play none none reset",
      },
    });
    paragraphTl.from(paragraphSplit.words, {
      yPercent: 300,
      rotate: 3,
      ease: "power1.inOut",
      duration: 0.5,
      stagger: 0.01,
    });
  });

  return (
    <div className="message-content bg-[#7f3b2d] text-milk min-h-dvh overflow-hidden flex justify-center items-center relative z-20">
      <div className="relative container mx-auto flex-center flex justify-center items-center py-28">
        {/* Content */}
        <div className="w-full h-full">
          <div className="msg-wrapper 2xl:text-[8.5rem] md:text-8xl text-5xl font-bold uppercase leading-[9vw] tracking-[-.35vw] flex flex-col justify-center items-center md:gap-24 gap-14">
            {/* First Title */}
            <h1 className="first-message 2xl:max-w-4xl md:max-w-2xl max-w-xs text-center  text-[#faeade10] leading-none">
              Stir up your fearless past and
            </h1>
            {/* Text label with clipPath */}
            <div
              style={{
                clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
              }}
              className="msg-text-scroll rotate-[3deg] 2xl:translate-y-5 -translate-y-5 absolute z-10 border-[.5vw] border-[#7f3b2d]"
            >
              <div className="bg-light-brown pb-3 md:pb-5 px-5">
                <h2 className="text-red-brown leading-none">Fuel Up</h2>
              </div>
            </div>
            {/* Second Title */}
            <h1 className="second-message leading-none">
              your future with every gulp of Perfect Protein
            </h1>
          </div>
          {/* Description */}
          <div className="flex-center flex justify-center items-center mt-10 md:mt-20">
            <div className="max-w-md px-10 flex-center flex justify-center items-center overflow-hidden">
              <p className="text-center font-paragraph">
                Rev up your rebel spirit and feed the adventure of life with
                SPYLT, where you’re one chug away from epic nostalgia and
                fearless fun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
