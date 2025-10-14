import { cards } from "@/data/gsap/index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function TestimonialSection() {
  const vdRef = useRef<(HTMLVideoElement | null)[]>([]);

  useGSAP(() => {
    gsap.set(".testimonials-section", {
      marginTop: "-140vh",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top bottom",
        end: "200% top",
        scrub: true,
      },
    });

    tl.to(".testimonials-section .first-title", {
      xPercent: 70,
    })
      .to(
        ".testimonials-section .second-title",
        {
          xPercent: 25,
        },
        "<"
      )
      .to(
        ".testimonials-section .third-title",
        {
          xPercent: -50,
        },
        "<"
      );

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "10% top",
        end: "200% top",
        scrub: 1.5,
        pin: true,
      },
    });

    pinTl.from(".vd-card", {
      yPercent: 150,
      stagger: 0.2,
      ease: "power1.inOut",
    });
  });

  // Hover Play function
  const handlePlay = (index: number) => {
    const video = vdRef.current[index];
    if (video) {
      video.play();
    }
  };
  // Leave Hover Play to Pause function
  const handlePause = (index: number) => {
    const video = vdRef.current[index];
    if (video) {
      video.pause();
    }
  };

  return (
    <div className="testimonials-section bg-milk relative w-full h-[120dvh]">
      {/* Text */}
      <div className="absolute size-full flex flex-col items-center pt-[5vw]">
        <h1 className="uppercase text-[20.5vw] leading-[105%] tracking-[-.4vw] ml-[2vw] font-bold text-black first-title">
          What’s
        </h1>
        <h1 className="uppercase text-[20.5vw] leading-[105%] tracking-[-.4vw] ml-[2vw] font-bold text-light-brown second-title">
          Everyone
        </h1>
        <h1 className="uppercase text-[20.5vw] leading-[105%] tracking-[-.4vw] ml-[2vw] font-bold text-black third-title">
          Talking
        </h1>
      </div>
      {/* Cards */}
      <div className="pin-box flex items-center justify-center w-full ps-52 absolute 2xl:bottom-32 bottom-[50vh]">
        {cards.map((card, index) => (
          <div
            key={card.name}
            className={`vd-card md:w-96 w-80 flex-none md:rounded-[2vw] rounded-3xl -ms-44 overflow-hidden 2xl:relative absolute border-[.5vw] border-milk ${card.translation} ${card.rotation}`}
            onMouseEnter={() => handlePlay(index)}
            onMouseLeave={() => handlePause(index)}
          >
            {/* Videos */}
            <video
              ref={(el) => {
                vdRef.current[index] = el;
              }}
              src={card.src}
              playsInline
              muted
              loop
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
