"use client";

import HeroSection from "@/components/home/HeroSection";
// import KnowledgeSection from "@/components/home/KnowledgeSection";
// import ContactSection from "@/components/home/ContactSection";
// import MemberSection from "@/components/home/MemberSection";

import dynamic from "next/dynamic";
import HeroSectionGSAP from "@/components/gsap/sections/HeroSection";
import Footer from "@/components/gsap/layout/Footer";

const MessageSection = dynamic(
  () => import("@/components/gsap/sections/MessageSection")
);

const FlavorSection = dynamic(
  () => import("@/components/gsap/sections/FlavorSection")
);

const NutritionSection = dynamic(
  () => import("@/components/gsap/sections/NutritionSection")
);

const BenefitSection = dynamic(
  () => import("@/components/gsap/sections/BenefitSection")
);

const TestimonialSection = dynamic(
  () => import("@/components/gsap/sections/TestimonialSection")
);

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
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection />
          {/* <KnowledgeSection />
          <ContactSection />
          <MemberSection /> */}

          {/* <HeroSectionGSAP /> */}
          <MessageSection />
          <FlavorSection />
          <NutritionSection />
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
