import Image from "next/image";
import footerDip from "@/public/gsap/images/footer-dip.png";
import footerDrink from "@/public/gsap/images/footer-drink.png";
import { useMediaQuery } from "react-responsive";

export default function Footer() {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <div className="footer-section 2xl:min-h-dvh overflow-hidden relative bg-[#222123]">
      {/* Background top footerDip */}
      <Image
        src={footerDip}
        alt="footerDip"
        width={1920}
        height={1080}
        className="w-full object-cover -translate-y-1"
      />
      {/* Title */}
      <div className="2xl:h-[110dvh] relative pt-[10vh] md:pt-[20vh]">
        <div className="overflow-hidden z-10">
          <h1 className="general-title 2xl:text-[8.5rem] md:text-8xl text-5xl font-bold uppercase leading-[9vw] tracking-[-.35vw] text-center text-milk py-5">
            #CHUGRESPONSIBLY
          </h1>
        </div>
      </div>
      {/* Video Splash */}
      {isMobile ? (
        <Image
          src={footerDrink}
          alt="footerDrink"
          width={1920}
          height={1080}
          className="absolute top-0 object-contain"
        />
      ) : (
        <video
          src="/gsap/videos/splash.mp4"
          autoPlay
          playsInline
          muted
          className="absolute top-0 object-contain mix-blend-lighten"
        />
      )}
    </div>
  );
}
