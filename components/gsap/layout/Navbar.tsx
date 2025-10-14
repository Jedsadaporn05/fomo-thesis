import Image from "next/image";
import navLogo from "@/public/gsap/images/nav-logo.svg";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 p-3 md:p-9">
      <Image
        src={navLogo}
        alt="navLogo"
        className="w-20 md:w-24 cursor-pointer"
      />
    </nav>
  );
}
