import Image from "next/image";
import footerDip from "@/public/gsap/images/footer-dip.png";
import footerDrink from "@/public/gsap/images/footer-drink.png";
import { useMediaQuery } from "react-responsive";

export default function Footer() {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <div className="footer-section 2xl:min-h-dvh overflow-hidden relative bg-gray-900">
      {/* Background top footerDip */}
      {/* <Image
        src={footerDip}
        alt="footerDip"
        width={1920}
        height={1080}
        className="w-full object-cover -translate-y-1"
      /> */}
      {/* Title */}
      <div className="2xl:h-[100dvh] relative pt-[10vh] md:pt-[20vh]">
        <div className="overflow-hidden z-10">
          <h1 className="general-title 2xl:text-9xl md:text-8xl text-5xl font-semibold uppercase leading-[9vw] tracking-[-.35vw] text-center text-milk py-5">
            INTERACTIVE
            <br />
            STORYTELLING WEBSITE
            <br />
            <p className="text-milk">
              <span className="text-amber-500">ABOUT </span>
              <span className="text-[#E51E5A]">FOMO</span>
            </p>
          </h1>
        </div>
      </div>
    </div>
  );
}
