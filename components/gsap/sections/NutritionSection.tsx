import Image from "next/image";
import sliderDip from "@/public/gsap/images/slider-dip.png";
import bgImage from "@/public/gsap/images/big-img.png";
import { nutrientLists } from "@/data/gsap/index";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

export default function NutritionSection() {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const [lists, setLists] = useState(nutrientLists);

  useEffect(() => {
    if (isMobile) {
      setLists(nutrientLists.slice(0, 3));
    } else {
      setLists(nutrientLists);
    }
  }, [isMobile]);

  useGSAP(() => {
    const titleSplit = SplitText.create(".nutrition-title", {
      type: "chars",
    });
    const paragraphSplit = SplitText.create(".nutrition-section p", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".nutrition-section",
        start: "top center",
      },
    });
    contentTl
      .from(titleSplit.chars, {
        yPercent: 100,
        stagger: 0.02,
        ease: "power2.out",
      })
      .from(paragraphSplit.words, {
        yPercent: 300,
        rotate: 3,
        ease: "power1.inOut",
        duration: 1,
        stagger: 0.01,
      });

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".nutrition-section",
        start: "top 80%",
      },
    });

    titleTl.to(".nutrition-text-scroll", {
      duration: 1,
      opacity: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power1.inOut",
    });
  });

  return (
    <div className="nutrition-section min-h-dvh 2xl:h-[120dvh] overflow-hidden relative">
      {/* Background top sliderDip */}
      <Image
        src={sliderDip}
        alt="sliderDip"
        width={1920}
        height={1080}
        className="w-full object-cover"
      />
      {/* Background Product Image */}
      <Image
        src={bgImage}
        alt="bgImage"
        width={1920}
        height={1080}
        className="big-img w-full absolute 2xl:h-full md:h-2/3 h-1/2 left-0 bottom-0 object-bottom 2xl:object-contain object-cover"
      />
      {/* Content */}
      <div className="flex flex-col md:flex-row justify-between px-5 md:px-10 mt-14 md:mt-0">
        <div className="relative inline-block md:translate-y-20">
          <div className="general-title 2xl:text-[8.5rem] md:text-8xl text-5xl font-bold uppercase leading-[9vw] tracking-[-.35vw] relative flex flex-col justify-center items-center gap-24">
            {/* Title */}
            <div className="overflow-hidden place-self-start">
              <h1 className="nutrition-title 2xl:max-w-4xl xl:max-w-2xl md:py-0 py-3 md:pb-5 pb-0 lg:pb-0 md:text-center text-[#513022]">
                It still does
              </h1>
            </div>
            {/* subTitle with clipPath */}
            <div
              style={{
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
              }}
              className="nutrition-text-scroll rotate-[-3deg] border-[.5vw] border-[#e3d3bc] text-nowrap opacity-0 md:-mt-32 -mt-24 place-self-start"
            >
              <div className="bg-yellow-brown pb-5 pt-3 md:pt-0 px-3 md:px-5 inline-block">
                <h2 className="text-milk">Body Good</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:justify-center items-center translate-y-5">
          {/* Description */}
          <div className="max-w-md md:max-w-xs">
            <p className="text-lg md:text-right text-balance font-paragraph">
              Milk contains a wide array of nutrients, including vitamins,
              minerals, and protein, and this is lactose free
            </p>
          </div>
        </div>
        {/* Label */}
        <div className="nutrition-box absolute md:bottom-16 bottom-5 w-full md:px-0 px-5">
          <div className="list-wrapper bg-[#fdebd2] rounded-full border-[.5vw] border-[#e8ddca] mx-auto max-w-7xl md:py-8 py-5 md:px-0 px-5 flex justify-between items-center">
            {lists.map((nutrient, index) => (
              <div
                key={nutrient.label}
                className="relative flex-1 col-center flex flex-col justify-center items-center"
              >
                <div>
                  <p className="text-[#865720] md:text-lg font-paragraph">
                    {nutrient.label}
                  </p>
                  <p className="text-[#865720] font-paragraph text-sm mt-2">
                    up to
                  </p>
                  <p className="text-[#865720] text-2xl md:text-4xl tracking-tighter font-bold">
                    {nutrient.amount}
                  </p>
                </div>
                {index !== lists.length - 1 && (
                  <div className="spacer-border absolute right-0 top-1/2 transform -translate-y-1/2 md:h-24 h-16 w-px bg-[#C89C6E]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
