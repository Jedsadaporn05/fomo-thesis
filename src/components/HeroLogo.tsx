import Image from "next/image";
import Logo from "@/public/logo/LogoGracie.png";

export default function HeroLogo() {
  return (
    <Image
      src={Logo}
      alt="FOMO The Missing Out Logo"
      width={500}
      height={500}
      priority
      className="max-w-50 sm:max-w-60 md:max-w-70 lg:max-w-80 xl:max-w-90 2xl:max-w-100 3xl:max-w-125 h-auto object-contain pointer-events-none"
    />
  );
}
