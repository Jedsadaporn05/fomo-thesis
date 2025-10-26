import Image from "next/image";
import navLogo from "@/public/logo/LogoGracie.png";

export default function MainNav() {
  return (
    <nav className="fixed top-0 left-0 z-50 p-3 md:p-9">
      {/* <h2 className="text-4xl text-[#523122] font-semibold uppercase [-webkit-text-stroke:2px_#faeade]">
        Logo
      </h2> */}
      <Image
        src={navLogo}
        alt="navLogo"
        width={300}
        height={300}
        priority
        className="w-20 md:w-30 cursor-pointer"
      />
    </nav>
  );
}
