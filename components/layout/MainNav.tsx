"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Music, Music2, Speaker, VolumeX, X, XIcon } from "lucide-react";
import navLogo from "@/public/logo/LogoGracieShadow.png";
import { useEffect, useRef, useState } from "react";
import { useSound } from "@/context/SoundContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";

const menuItems = [
  {
    id: "Enter the story",
    title: "เข้าสู่เรื่องราว",
    href: "Hero",
  },
  {
    id: "What is FOMO",
    title: "FOMO คืออะไร",
    href: "Knowledge-1",
  },
  {
    id: "How does FOMO affect your life",
    title: "FOMO ส่งผลอะไรต่อชีวิต",
    href: "Knowledge-2",
  },
  {
    id: "How to deal with FOMO",
    title: "วิธีจัดการกับ FOMO",
    href: "Knowledge-3",
  },
  {
    id: "Members",
    title: "ผู้จัดทำ",
    href: "Members",
  },
];

export default function MainNav() {
  const [open, setOpen] = useState(false);

  const {
    bgmVolume,
    setBgmVolume,
    sfxVolume,
    setSfxVolume,
    isBgmPlaying,
    toggleBgm,
    playSfx,
  } = useSound();

  const lastBgmVol = useRef(0.5);
  const lastSfxVol = useRef(0.5);

  const handleToggleBgmMute = () => {
    if (bgmVolume > 0) {
      lastBgmVol.current = bgmVolume;
      setBgmVolume(0);
    } else {
      setBgmVolume(lastBgmVol.current || 0.5);
    }
  };

  const handleToggleSfxMute = () => {
    if (sfxVolume > 0) {
      lastSfxVol.current = sfxVolume;
      setSfxVolume(0);
    } else {
      setSfxVolume(lastSfxVol.current || 0.5);
    }
  };

  // Scroll to Section
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
              width={400}
              height={400}
              className="w-20 sm:w-25 md:w-30 lg:w-35 cursor-pointer"
              priority
            />
          </button>
        </div>
        {/* Right Side */}
        <div className="flex flex-row justify-end gap-3 sm:gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <button className="cursor-pointer group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0a1635]/90 hover:bg-[#0a1635] text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 border border-white/10">
                <div className="relative flex items-center justify-center">
                  <Music2
                    strokeWidth={2.5}
                    className={`size-5 sm:size-6 transition-all duration-500 ${
                      isBgmPlaying
                        ? "text-[#E51E5A] scale-100"
                        : "text-white/70 scale-90"
                    }`}
                  />
                  <span
                    className={`absolute bg-white h-[2px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 transition-all duration-300 ease-out ${
                      !isBgmPlaying ? "w-[120%] opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-[380px] sm:max-w-[420px] rounded-3xl bg-[#0a1635]/95 backdrop-blur-xl border border-white/10 text-white shadow-2xl p-6 sm:p-8">
              <div className="flex flex-row justify-between items-center">
                <DialogHeader>
                  <DialogTitle className="text-start text-white font-medium text-xl md:text-2xl tracking-wide">
                    Sound Settings
                  </DialogTitle>
                </DialogHeader>
                <DialogClose
                  onClick={() => playSfx("click")}
                  className="text-white hover:text-[#E51E5A] transition-colors duration-300 cursor-pointer"
                >
                  <XIcon
                    strokeWidth={3}
                    className="size-4 sm:size-5 md:size-6"
                  />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </div>
              <div className="flex flex-col gap-8 py-2">
                <div className="space-y-6 px-1">
                  {/* BGM */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm sm:text-base font-medium text-gray-200">
                      <button
                        onClick={toggleBgm}
                        className="flex items-center gap-3 cursor-pointer transition-colors duration-300 group"
                      >
                        <div
                          className={`p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors ${
                            bgmVolume === 0 ? "text-gray-500" : "text-[#E51E5A]"
                          }`}
                        >
                          {isBgmPlaying ? (
                            <Music size={20} className="text-[#E51E5A]" />
                          ) : (
                            <VolumeX size={20} className="text-gray-500" />
                          )}
                        </div>
                        <p className="">Background Music</p>
                      </button>
                      <span className="text-[#E51E5A] font-medium text-right">
                        {Math.round(bgmVolume * 100)}%
                      </span>
                    </div>
                    <Slider
                      value={[bgmVolume]}
                      max={1}
                      step={0.01}
                      onValueChange={(val) => setBgmVolume(val[0])}
                      className="cursor-pointer py-2"
                    />
                  </div>

                  {/* SFX */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm sm:text-base font-medium text-gray-200">
                      <button
                        onClick={handleToggleSfxMute}
                        className="flex items-center gap-3 cursor-pointer transition-colors duration-300 group"
                      >
                        <div
                          className={`p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors ${
                            sfxVolume === 0 ? "text-gray-500" : "text-blue-400"
                          }`}
                        >
                          {sfxVolume === 0 ? (
                            <VolumeX size={20} className="text-gray-500" />
                          ) : (
                            <Speaker size={20} className="text-blue-400" />
                          )}
                        </div>
                        <span>Sound Effects</span>
                      </button>

                      <span className="text-blue-400 font-bold-mefont-medium-right">
                        {Math.round(sfxVolume * 100)}%
                      </span>
                    </div>

                    <Slider
                      value={[sfxVolume]}
                      max={1}
                      step={0.01}
                      onValueChange={(val) => setSfxVolume(val[0])}
                      className="cursor-pointer py-2"
                    />
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
                  className="text-sm xl:text-base cursor-pointer rounded-lg px-3 py-2.5 font-medium hover:bg-white/10 focus:bg-white/10 focus:text-white transition-colors"
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
