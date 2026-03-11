"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Menu,
  Music,
  Music2,
  Speaker,
  VolumeX,
  X,
  XIcon,
  Eye,
} from "lucide-react";
import navLogo from "@/public/logo/LogoGracie.png";
import { useEffect, useRef, useState } from "react";
import { useAudioStore } from "@/src/store/useAudioStore";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Slider } from "@/src/components/ui/slider";

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
    sfxVolume,
    setBgmVolume,
    setSfxVolume,
    toggleBgmMute,
    toggleSfxMute,
    playSFX,
    bgmEnabled,
    sfxEnabled,
  } = useAudioStore();

  // Scroll to Section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Navbar Scroll and Hide Logic
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
            setOpen(false);
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

  const [activeSection, setActiveSection] = useState<string>("Hero");

  // IntersectionObserver to detect active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -25% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Polling mechanism to handle Dynamic Components (ssr: false)
    const observedIds = new Set<string>();

    const startObserving = () => {
      menuItems.forEach((item) => {
        if (!observedIds.has(item.href)) {
          const el = document.getElementById(item.href);
          if (el) {
            observer.observe(el);
            observedIds.add(item.href);
          }
        }
      });

      // Stop polling if all items are found
      if (observedIds.size === menuItems.length) {
        clearInterval(pollInterval);
      }
    };

    const pollInterval = setInterval(startObserving, 500);

    startObserving();

    return () => {
      observer.disconnect();
      clearInterval(pollInterval);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-2 sm:left-3 md:left-4 lg:left-5 xl:left-6 2xl:left-7 right-2 sm:right-3 md:right-4 lg:right-5 xl:right-6 2xl:right-7 z-50 pt-4 lg:pt-5 transition-transform duration-500 ease-in-out
        ${!showNavbar ? "-translate-y-full" : "translate-y-0"}
       `}
    >
      {/* Background Shadow Gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-20 lg:h-25 lg:bg-linear-to-b from-[#1A060D]/40 to-transparent -z-10"
        aria-hidden="true"
      />

      <nav
        className="w-full h-full flex flex-row justify-between items-center"
        aria-label="Main navigation"
      >
        {/* Logo Section */}
        <div className="flex flex-row justify-start">
          <button
            type="button"
            onClick={() => scrollToSection("Hero")}
            aria-label="กลับไปที่หน้าแรกด้านบนสุด"
            className="outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D77] rounded-lg transition-all"
          >
            <Image
              src={navLogo}
              alt="FOMO The Missing Out Logo"
              width={400}
              height={400}
              draggable="false"
              className="w-20 sm:w-25 md:w-30 lg:w-35 xl:w-40 3xl:w-45 object-cover cursor-pointer"
              priority
            />
          </button>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-row justify-end gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
          {/* Audio Settings Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label="ตั้งค่าเสียงประกอบ"
                className="cursor-pointer group flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-13 2xl:w-12 3xl:w-14 lg:h-13 2xl:h-12 3xl:h-14 rounded-full bg-[#0a1635]/90 hover:bg-[#0a1635] text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 border border-white/10 outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D77]"
              >
                <div className="relative flex items-center justify-center">
                  <Music2
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className={`size-4 sm:size-5 md:size-6 3xl:size-7 transition-all duration-500 ${
                      bgmEnabled
                        ? "text-[#E51E5A] scale-100"
                        : "text-white/70 scale-90"
                    }`}
                  />
                  <span
                    className={`absolute bg-white h-[1.25px] sm:h-[1.5px] md:h-[1.75px] lg:h-0.75 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 transition-all duration-300 ease-out ${
                      !bgmEnabled ? "w-[120%] opacity-100" : "w-0 opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-80 sm:max-w-90 md:max-w-95 lg:max-w-100 xl:max-w-105 2xl:max-w-110 rounded-2xl bg-[#0a1635]/90 backdrop-blur-xl border border-white/5 text-white shadow-2xl p-5 sm:p-6">
              <div className="flex flex-row justify-between items-center">
                <DialogHeader>
                  <DialogTitle className="text-start text-white font-medium text-base sm:text-lg md:text-xl 3xl:text-2xl tracking-wide">
                    การตั้งค่าเสียง
                  </DialogTitle>
                </DialogHeader>
                <DialogClose
                  className="text-white hover:text-[#E51E5A] transition-colors duration-300 cursor-pointer outline-none focus-visible:text-[#E51E5A]"
                  aria-label="ปิดหน้าต่างตั้งค่า"
                >
                  <XIcon
                    strokeWidth={3}
                    className="size-4 sm:size-5 md:size-6"
                    aria-hidden="true"
                  />
                </DialogClose>
              </div>
              <div className="flex flex-col gap-8 py-2">
                <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 px-1">
                  {/* BGM Control */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm sm:text-base font-medium text-gray-200">
                      <button
                        type="button"
                        onClick={toggleBgmMute}
                        aria-label={
                          bgmEnabled ? "ปิดดนตรีประกอบ" : "เปิดดนตรีประกอบ"
                        }
                        className="flex items-center gap-3 cursor-pointer transition-colors duration-300 group outline-none"
                      >
                        <div
                          className={`p-2 rounded-lg bg-white/5 group-hover:bg-white/10 group-focus-visible:ring-2 group-focus-visible:ring-[#FF2D77] transition-colors ${
                            bgmVolume === 0 ? "text-gray-500" : "text-[#E51E5A]"
                          }`}
                        >
                          {bgmEnabled && bgmVolume > 0 ? (
                            <Music
                              size={20}
                              className="text-[#E51E5A]"
                              aria-hidden="true"
                            />
                          ) : (
                            <VolumeX
                              size={20}
                              className="text-gray-500"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <span className="text-sm sm:text-base md:text-lg 3xl:text-xl font-medium">
                          ดนตรีประกอบ
                        </span>
                      </button>
                      <span
                        className="text-sm sm:text-base md:text-lg 3xl:text-xl text-[#E51E5A] font-medium"
                        aria-live="polite"
                      >
                        {Math.round(bgmVolume * 100)}%
                      </span>
                    </div>
                    <Slider
                      value={[bgmVolume]}
                      max={1}
                      step={0.01}
                      onValueChange={(val) => setBgmVolume(val[0])}
                      aria-label="ปรับระดับเสียงดนตรีประกอบ"
                      className="cursor-pointer py-1"
                    />
                  </div>

                  {/* SFX Control */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm sm:text-base font-medium text-gray-200">
                      <button
                        type="button"
                        onClick={toggleSfxMute}
                        aria-label={
                          sfxEnabled ? "ปิดเอฟเฟกต์เสียง" : "เปิดเอฟเฟกต์เสียง"
                        }
                        className="flex items-center gap-3 cursor-pointer transition-colors duration-300 group outline-none"
                      >
                        <div
                          className={`p-2 rounded-lg bg-white/5 group-hover:bg-white/10 group-focus-visible:ring-2 group-focus-visible:ring-blue-400 transition-colors ${
                            sfxVolume === 0 ? "text-gray-500" : "text-blue-400"
                          }`}
                        >
                          {sfxEnabled && sfxVolume > 0 ? (
                            <Speaker
                              size={20}
                              className="text-blue-400"
                              aria-hidden="true"
                            />
                          ) : (
                            <VolumeX
                              size={20}
                              className="text-gray-500"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <span className="text-sm sm:text-base md:text-lg 3xl:text-xl font-medium">
                          เอฟเฟกต์เสียง
                        </span>
                      </button>
                      <span
                        className="text-sm sm:text-base md:text-lg 3xl:text-xl text-blue-400 font-medium"
                        aria-live="polite"
                      >
                        {Math.round(sfxVolume * 100)}%
                      </span>
                    </div>
                    <Slider
                      value={[sfxVolume]}
                      max={1}
                      step={0.01}
                      onValueChange={(val) => setSfxVolume(val[0])}
                      aria-label="ปรับระดับเสียงเอฟเฟกต์"
                      className="cursor-pointer py-1"
                    />
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                onClick={() =>
                  playSFX("click", "/sounds/interactive/click-1.mp3")
                }
                aria-label={open ? "ปิดเมนู" : "เปิดเมนูนำทาง"}
                className="cursor-pointer group flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-13 2xl:w-12 3xl:w-14 lg:h-13 2xl:h-12 3xl:h-14 rounded-full bg-[#0a1635]/90 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 border border-white/10 outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D77]"
              >
                <div className="relative flex items-center justify-center w-full h-full">
                  <Menu
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className={`absolute size-4 sm:size-5 md:size-6 3xl:size-7 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] 
                        ${open ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100 group-hover:text-white"}`}
                  />
                  <X
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className={`absolute size-4 sm:size-5 md:size-6 3xl:size-7 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] 
                        ${open ? "opacity-100 rotate-0 scale-100 text-[#E51E5A]" : "opacity-0 -rotate-90 scale-50"}`}
                  />
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={12}
              className="w-full rounded-xl border border-white/10 bg-[#0a1635]/95 backdrop-blur-md px-0 py-1 sm:p-1.25 md:p-1.5 lg:p.1-.75 xl:p-2 text-white shadow-xl"
            >
              {menuItems.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.href);
                    setOpen(false);
                  }}
                  className={`group relative flex items-center justify-between gap-1.5 sm:gap-2.5 lg:gap-3.5 text-xs sm:text-sm md:text-base lg:text-lg 3xl:text-xl cursor-pointer rounded-lg px-3.5 py-2.5 3xl:py-3 font-medium transition-all duration-300 ease-out outline-none overflow-hidden focus:bg-transparent focus:text-[#FF2D77]
                    ${activeSection === item.href ? "text-[#FF2D77]" : "text-white hover:text-[#FF2D77]"}
                  `}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <span
                    className={`relative z-10 transition-transform duration-300 ${activeSection !== item.href ? "group-hover:translate-x-2" : ""}`}
                  >
                    {item.title}
                  </span>
                  <div className="relative z-10 flex items-center">
                    {activeSection === item.href && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{
                          duration: 0.4,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <Eye
                          className="size-4 sm:size-5 lg:size-6 xl:size-7 pb-0.75 xl:pb-1.25 text-[#FF2D77] drop-shadow-[0_0_3px_rgba(255,45,119,0.6)]"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </motion.div>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
