import Image from "next/image";
import navLogo from "@/public/logo/LogoGracie.png";

export default function NavbarLogo() {
  return (
    <Image
      src={navLogo}
      alt="FOMO The Missing Out Logo"
      width={400}
      height={400}
      draggable="false"
      priority
      className="w-20 sm:w-25 md:w-30 lg:w-35 xl:w-40 3xl:w-45 object-contain cursor-pointer"
    />
  );
}
