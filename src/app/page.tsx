"use client";

import dynamic from "next/dynamic";

import MainNav from "@/components/layout/MainNav";
import MainHeroSection from "@/components/home/MainHeroSection";
const KnowledgeSection = dynamic(
  () => import("@/components/home/KnowledgeSection")
);
const MemberSection = dynamic(() => import("@/components/home/MemberSection"));

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function HomePage() {
  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.25,
      effects: true,
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <section>
      <MainNav />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <MainHeroSection />
          <KnowledgeSection />
          <MemberSection />
        </div>
      </div>
    </section>
  );
}
