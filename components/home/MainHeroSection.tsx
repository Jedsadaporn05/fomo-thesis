import { Link } from "next-view-transitions";
import Image from "next/image";
import Logo from "@/public/logo/LogoGracie.png";
import HeroImg from "@/public/home/hero-section/Hero.jpg";

export default function MainHeroSection() {
  return (
    <div id="Hero" className="w-full min-h-dvh h-[100dvh]">
      <div className="relative w-full h-full">
        {/* Text on Image */}
        <div className="absolute w-full h-full">
          <div className="container mx-atuo w-full h-full flex flex-col justify-center items-center md:items-end">
            {/* Logo and Start Button */}
            <div className="w-full max-w-[300px] lg:max-w-[450px] h-full flex flex-col justify-center items-center gap-4 lg:gap-12">
              {/* Logo Title */}
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={Logo}
                  alt="Logo"
                  width={500}
                  height={500}
                  className="w-full max-w-[250px] sm:max-w-full h-full object-cover object-center"
                />
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-[#FF2D77] text-center">
                  THE MISSING OUT
                </p>
              </div>
              {/* Button */}
              <Link
                href={"/story"}
                className="w-full flex flex-col justify-center items-center gap-2 lg:gap-4 cursor-pointer transition-all blink hover:[&>*]:text-primary"
              >
                <div className="w-full h-[3px] lg:h-[4px] rounded-md bg-gradient-to-r from-transparent via-[#FF2D77] to-transparent" />
                <p className="text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-[26px] font-semibold text-white/90">
                  คลิกเพื่อเข้าสู่เรื่องราว
                </p>
                <div className="w-full h-[3px] lg:h-[4px] rounded-md bg-gradient-to-r from-transparent via-[#FF2D77] to-transparent" />
              </Link>
            </div>
          </div>
        </div>
        {/* Video, Image Background */}
        <Image
          src={HeroImg}
          alt="hero-section"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-center pointer-events-none"
        />
        {/* <video
          src="/home/hero-section/PreStart.mp4"
          muted
          autoPlay
          loop
          className="w-full h-full object-cover object-center pointer-events-none"
        /> */}

        {/* Blur Bottom */}
        <div className="absolute bottom-0 w-full h-[10rem] pointer-events-none bg-gradient-to-t from-[#0a1738] to-transparent" />
      </div>
    </div>
  );
}
