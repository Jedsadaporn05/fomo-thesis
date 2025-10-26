import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "next-view-transitions";

export default function GsapHeroSection() {
  useGSAP(() => {
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
    <div className="w-full min-h-full h-[100dvh] bg-black">
      <div className="hero-container relative w-full h-full">
        {/* Text on Image */}
        <div className="absolute w-full h-full">
          <div className="container mx-atuo w-full h-full flex flex-col justify-center items-center">
            {/* Logo and Start Button */}
            <div className="w-full max-w-[300px] lg:max-w-[450px] h-full flex flex-col justify-center items-center gap-4 lg:gap-6">
              {/* Title */}
              <h2 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-white tracking-normal transition-all blink">
                Gracie
              </h2>
              {/* Button */}
              <Link
                href={"/story"}
                className="w-full flex flex-col justify-center items-center gap-2 lg:gap-3 cursor-pointer transition-all blink hover:[&>*]:text-primary"
              >
                <div className="w-full h-[2px] lg:h-[3px] rounded-md bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <p className="text-lg lg:text-xl xl:text-2xl 2xl:text-[26px] font-bold text-white/90">
                  เข้าสู่เรื่องราว
                </p>
                <div className="w-full h-[2px] lg:h-[3px] rounded-md bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              </Link>
            </div>
          </div>
        </div>
        {/* Video Background */}
        <video
          src="/home/hero-section/PreStart.mp4"
          muted
          autoPlay
          loop
          className="w-full h-full object-cover object-center pointer-events-none"
        />
        {/* Blur Bottom */}
        {/* <div className="absolute bottom-0 left-0 w-full h-[8rem] pointer-events-none bg-gradient-to-t from-[#ff1655] to-transparent" /> */}
      </div>
    </div>
  );
}
