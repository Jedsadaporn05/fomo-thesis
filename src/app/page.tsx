"use client";

import dynamic from "next/dynamic";

import MainNav from "@/components/layout/MainNav";
import MainHeroSection from "@/components/home/MainHeroSection";

const KnowledgeSection = dynamic(
  () => import("@/components/home/KnowledgeSection")
);

const MemberSection = dynamic(() => import("@/components/home/MemberSection"));

import GsapHeroSection from "@/components/gsap/sections/GsapHeroSection";
const MessageSection = dynamic(
  () => import("@/components/gsap/sections/MessageSection")
);
const FlavorSection = dynamic(
  () => import("@/components/gsap/sections/FlavorSection")
);
const BenefitSection = dynamic(
  () => import("@/components/gsap/sections/BenefitSection")
);
const TestimonialSection = dynamic(
  () => import("@/components/gsap/sections/TestimonialSection")
);

import Footer from "@/components/gsap/layout/Footer";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function HomePage() {
  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <section>
      <MainNav />
      {/* <MainHeroSection />
      <KnowledgeSection />
      <MemberSection /> */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <MainHeroSection />
          <KnowledgeSection />
          <MemberSection />

          <GsapHeroSection />
          <MessageSection />
          <FlavorSection />
          <div>
            <BenefitSection />
            <TestimonialSection />
          </div>
          <Footer />
        </div>
      </div>
    </section>
  );
}
