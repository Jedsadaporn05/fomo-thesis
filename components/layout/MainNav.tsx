"use client";

import Image from "next/image";
import navLogo from "@/public/logo/LogoGracie.png";
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

export default function MainNav() {
  const [dotTop, setDotTop] = useState(0);
  const [dotOpacity, setDotOpacity] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const topPosition = button.offsetTop + button.offsetHeight / 2;

    setDotTop(topPosition);
    setDotOpacity(1);
  };

  const handleMouseLeave = () => {
    if (!activeSection) setDotOpacity(0);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  const scrollToSection = (sectionId: string) => {
    gsap.to(globalThis, {
      duration: 0,
      scrollTo: {
        y: `#${sectionId}`,
        offsetY: 0,
      },
      ease: "power2.inOut",
    });
  };

  const menuItems = [
    {
      id: "hero",
      title: "Start",
    },
    {
      id: "knowledge",
      title: "Knowledge",
    },
    {
      id: "members",
      title: "Members",
    },
    {
      id: "secondHero",
      title: "Start 2",
    },
    {
      id: "secondKnowledge",
      title: "Knowledge 2",
    },
    {
      id: "preview",
      title: "Preview",
    },
    {
      id: "secondMembers",
      title: "Members 2",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0,
      }
    );

    menuItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
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
              >
                {item.title}
              </button>
            ))}
          </nav>
        </HoverCardContent>
      </HoverCard>
    </header>
  );
}
