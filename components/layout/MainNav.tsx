"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import navLogo from "@/public/logo/LogoGracie.png";

const menuItems = [
  {
    id: "knowledge",
    title: "Knowledge",
  },
  {
    id: "members",
    title: "Members",
  },
];

export default function MainNav() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    menuItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      menuItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    gsap.to(globalThis, {
      duration: 0.1,
      scrollTo: {
        y: `#${sectionId}`,
        offsetY: 0,
      },
      ease: "power2.inOut",
    });
  };

  return (
<<<<<<< HEAD
    <header className="fixed top-5 sm:top-7 left-5 sm:left-7 z-50">
      <nav>
        {/* Left Side */}
        <Link href="/" className="w-full h-full">
          {/* Logo */}
          <Image
            src={navLogo}
            alt="navLogo"
            width={300}
            height={300}
            priority
            className="w-20 sm:w-25 md:w-30 cursor-pointer"
          />
        </Link>
        {/* Right Side */}
        <div className="w-full h-full">
          {/* Menu Bar */}
          <HoverCard openDelay={100} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="fixed top-5 sm:top-7 right-5 sm:right-7 z-50 p-0 sm:p-3 md:p-4 lg:p-5 rounded-sm bg-black hover:bg-black border-black text-white/90 hover:text-white"
=======
    <header className="fixed top-0 left-0 z-50 p-3 md:p-9">
      {/* Logo */}
      <Image
        src={navLogo}
        alt="navLogo"
        width={300}
        height={300}
        priority
        className="w-20 md:w-30 cursor-pointer"
      />
      {/* Dropdown */}
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 fixed top-0 right-0 z-50 m-3 md:m-9 bg-black border-black rounded-full"
          >
            <Menu className="size-auto" />
            <span className="sr-only">Menu</span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent
          side="right"
          align="start"
          className="w-[300px] flex flex-col text-white rounded-2xl border-none bg-black p-8"
        >
          <nav
            className="relative flex flex-col gap-4"
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute left-[10px] top-0 w-0.5 h-full bg-white/50 -translate-x-1/2" />
            <div
              className={`absolute w-2.5 h-2.5 left-[10px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-full transition-all duration-300 ease-in-out`}
              style={{
                top: dotTop,
                opacity: dotOpacity,
              }}
            />
            {menuItems.map((item) => (
              <button
                onClick={() => scrollToSection(item.id)}
                key={item.id}
                onMouseEnter={handleMouseOver}
                className={`group relative flex items-center text-2xl font-bold pl-8 py-2 cursor-pointer transition-colors hover:text-white/80
                  ${activeSection === item.id ? "text-white" : "text-white/70"}
                  `}
>>>>>>> 37f5f2663788403d2226c40f228fbd496c56af6b
              >
                <Menu className="size-4 sm:size-5 lg:size-6" />
              </Button>
            </HoverCardTrigger>
            {/* Hover Contents */}
            <HoverCardContent
              side="left"
              align="start"
              className="w-fit h-auto flex flex-col rounded-sm border-none bg-black p-3 sm:p-4 lg:p-5"
            >
              {/* Details */}
              <div className="w-full h-full flex flex-col justify-center items-start gap-3">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    className="w-full h-full flex flex-row items-center cursor-pointer gap-3 transition-all duration-200 ease-in-out"
                    onClick={() => scrollToSection(item.id)}
                  >
                    {/* Circle */}
                    {/* <div
                      className={`p-1 rounded-full
                      ${activeSection === item.id ? "bg-white" : "bg-black"}
                      `}
                    /> */}
                    {/* Text */}
                    <p
                      className={`w-full text-sm sm:text-base lg:text-lg font-semibold text-start text-white/90 hover:text-white`}
                    >
                      {item.title}
                    </p>
                  </button>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </nav>
    </header>
  );
}
