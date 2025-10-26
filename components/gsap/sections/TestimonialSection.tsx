import { cards } from "@/data/gsap/index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function TestimonialSection() {
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

  return (
    <div className="testimonials-section bg-black relative w-full h-[120dvh]">
      {/* Text */}
      <div className="absolute size-full flex flex-col items-center pt-[5vw]">
        <h1 className="uppercase text-[20.5vw] leading-[105%] tracking-[-.4vw] ml-[2vw] font-bold text-milk first-title">
          OUR
        </h1>
        <h1 className="uppercase text-[20.5vw] leading-[105%] tracking-[-.4vw] ml-[2vw] pr-120 font-bold text-light-brown second-title">
          MEMBER
        </h1>
      </div>
      {/* Cards */}
      <div className="pin-box flex items-center justify-center gap-24 w-full absolute 2xl:bottom-32 bottom-[50vh]">
        {cards.map((card) => (
          <div
            key={card.name}
            className={`vd-card md:w-96 w-80 flex-none md:rounded-[2vw] rounded-3xl  overflow-hidden 2xl:relative absolute border-[.5vw] border-milk ${card.translation} ${card.rotation}`}
          >
            <div className="absolute left-1/2 -translate-x-1/2 top-[40%] uppercase text-5xl font-semibold text-white text-center leading-normal">
              <h2>{card.text}</h2>
            </div>
            {/* Members */}
            <div className="min-h-[70dvh] size-full object-cover bg-gray-900" />
          </div>
        ))}
      </div>
    </div>
  );
}
