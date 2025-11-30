"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Music2, X } from "lucide-react";
import navLogo from "@/public/logo/LogoGracieShadow.png";
import { useEffect, useRef, useState } from "react";

const menuItems = [
  {
    id: "Enter the story",
    title: "เข้าสู่เรื่องราว",
    href: "Hero",
  },
  {
    id: "What is FOMO",
    title: "FOMO คืออะไร",
    href: "knowledge",
  },
  {
    id: "How does FOMO affect your life",
    title: "FOMO ส่งผลอะไรต่อชีวิต",
    href: "knowledge",
  },
  {
    id: "How to deal with FOMO",
    title: "วิธีจัดการกับ FOMO",
    href: "knowledge",
  },
  {
    id: "members",
    title: "ผู้จัดทำ",
    href: "members",
  },
];

export default function MainNav() {
  const [open, setOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Navbar Scroll and Hide
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY < 10) {
            setShowNavbar(true);
          } else if (currentScrollY < lastScrollY.current) {
            setShowNavbar(true);
          } else if (
            currentScrollY > lastScrollY.current &&
            currentScrollY > 80
          ) {
            setShowNavbar(false);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-5 sm:left-7 right-8 z-50 pt-5 ${
        !showNavbar ? "-translate-y-full" : "translate-y-0"
      } transition-transform duration-500 ease-in-out`}
    >
      {/* Shadow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-20 lg:h-25 bg-gradient-to-b from-[#1A060D]/40 to-transparent -z-10" />
      <nav className="w-full h-full flex flex-row justify-between items-center">
        {/* Left Side */}
        <div className="flex flex-row justify-start">
          <button onClick={() => scrollToSection("Hero")}>
            <Image
              src={navLogo}
              alt="navLogo"
              width={300}
              height={300}
              className="w-20 sm:w-25 md:w-30 lg:w-35 cursor-pointer"
              priority
            />
          </button>
        </div>
        {/* Right Side */}
        <div className="flex flex-row justify-end gap-3 sm:gap-4">
          <button
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            className="cursor-pointer group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0a1635]/90 hover:bg-[#0a1635] text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 border border-white/10"
          >
            <div className="relative flex items-center justify-center">
              <Music2
                strokeWidth={2.5}
                className={`size-5 sm:size-6 transition-all duration-500 ${
                  isMusicPlaying
                    ? "text-[#E51E5A] scale-100"
                    : "text-white/70 scale-90"
                }`}
              />
              <span
                className={`absolute bg-white h-[2px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 transition-all duration-300 ease-out
                ${!isMusicPlaying ? "w-[120%] opacity-100" : "w-0 opacity-0"} 
                `}
              />
            </div>
          </button>
          <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
            <DropdownMenuTrigger asChild>
              <button className="cursor-pointer group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0a1635]/90 hover:bg-[#0a1635] text-white hover:text-[#E51E5A] shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 border border-white/10 outline-none">
                <div className="relative flex items-center justify-center w-full h-full">
                  <Menu
                    strokeWidth={2.5}
                    className={`absolute size-5 sm:size-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] 
                      ${
                        open
                          ? "opacity-0 rotate-90 scale-50"
                          : "opacity-100 rotate-0 scale-100 group-hover:text-white"
                      }`}
                  />
                  <X
                    strokeWidth={2.5}
                    className={`absolute size-5 sm:size-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] 
                      ${
                        open
                          ? "opacity-100 rotate-0 scale-100 text-[#E51E5A]"
                          : "opacity-0 -rotate-90 scale-50"
                      }`}
                  />
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={12}
              className="min-w-[180px] rounded-xl border border-white/10 bg-[#0a1635]/95 backdrop-blur-md p-2 text-white shadow-xl"
            >
              {menuItems.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className="cursor-pointer rounded-lg px-3 py-2.5 font-medium hover:bg-white/10 focus:bg-white/10 focus:text-white transition-colors"
                >
                  {item.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
