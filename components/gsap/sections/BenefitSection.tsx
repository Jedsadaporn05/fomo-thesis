import { useGSAP } from "@gsap/react";
import ClipPathTitle from "../ClipPathTitle";
import gsap from "gsap";
import VideoPinSection from "../VideoPinSection";

export default function BenefitSection() {
  useGSAP(() => {
    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".benefit-section",
        start: "top 60%",
        end: "top top",
        scrub: 1.5,
      },
    });

    revealTl
      .to(".benefit-section .first-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .second-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .third-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .fourth-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "circ.out",
      });
  });

  return (
    <div className="benefit-section min-h-full md:min-h-dvh bg-gray overflow-hidden relative bg-black">
      {/* label with clipPath */}
      <div className="container mx-auto pt-20">
        <div className="col-center flex flex-col justify-center items-center">
          {/* Header description */}
          <p className="text-milk font-paragraph text-center text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            <br /> Quas itaque harum quasi vitae, repellendus eius.
          </p>
          {/* Text with clipPath components */}
          <div className="mt-20 col-center flex flex-col justify-center items-center">
            <ClipPathTitle
              title={"Lorem ipsum"}
              color={"#faeade"}
              bg={"#c88e64"}
              className={"first-title rotate-[3deg] relative z-10"}
              borderColor={"#222123"}
            />
            <ClipPathTitle
              title={"Lorem + sit amet"}
              color={"#222123"}
              bg={"#faeade"}
              className={"second-title rotate-[-1deg] md:-translate-y-5"}
              borderColor={"#222123"}
            />
            <ClipPathTitle
              title={"consectetur adipisi"}
              color={"#faeade"}
              bg={"#7F3B2D"}
              className={
                "third-title rotate-[1deg] md:-translate-y-12 relative z-10"
              }
              borderColor={"#222123"}
            />
            <ClipPathTitle
              title={"itaque harum"}
              color={"#2E2D2F"}
              bg={"#FED775"}
              className={"fourth-title rotate-[-5deg] md:-translate-y-12"}
              borderColor={"#222123"}
            />
          </div>
          {/* Footer description */}
          <div className="mt-10 md:mt-0 text-milk">
            <p>And much more ...</p>
          </div>
        </div>
      </div>
      {/* Video Circ with clipPath */}
      <div className="relative overlay-box">
        <VideoPinSection />
      </div>
    </div>
  );
}
