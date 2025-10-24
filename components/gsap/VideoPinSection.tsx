import Image from "next/image";
import circleText from "@/public/gsap/images/circle-text.svg";
import playBtn from "@/public/gsap/images/play.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

export default function VideoPinSection() {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(() => {
    if (!isMobile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".vd-pin-section",
          start: "-15% top",
          end: "200% top",
          scrub: 1.5,
          pin: true,
        },
      });

      tl.to(".video-box", {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power1.inOut",
      });
    }
  });

  return (
    <div className="vd-pin-section md:h-[110vh] h-dvh overflow-hidden md:!-translate-y-[15%] md:mt-0 mt-20">
      {/* clipPath */}
      <div
        style={{
          clipPath: isMobile
            ? "circle(100% at 50% 50%)"
            : "circle(6% at 50% 50%)",
          willChange: "clip-path",
        }}
        className="size-full video-box"
      >
        {/* Video */}
        <div className="size-full absolute inset-0 object-cover bg-gray-900">
          <div className="w-full h-full flex flex-col justify-center">
            <h1 className="text-[12rem] font-semibold text-start text-white">
              HELLO
            </h1>
            {/* <h1 className="text-[10rem] font-semibold text-center text-white">
              SSSSS
            </h1> */}
            <h1 className="text-[12rem] font-semibold text-end text-white">
              WORLD
            </h1>
          </div>
        </div>
        {/* Button */}
        <div className="abs-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-200 md:scale-100">
          {/* Circle Text */}
          <Image
            src={circleText}
            alt="circleText"
            width={1920}
            height={1080}
            className="spin-circle size-[15vw]"
          />
          {/* Play Button */}
          <div className="play-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[9vw] flex justify-center items-center bg-[#ffffff1a] backdrop-blur-xl rounded-full">
            <Image
              src={playBtn}
              alt="playBtn"
              width={1920}
              height={1080}
              className="size-[3vw] ml-[.5vw] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
