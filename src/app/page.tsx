"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
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
import Navbar from "@/components/gsap/layout/Navbar";

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
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection />
          <MessageSection />
          <FlavorSection />
          {/* <NutritionSection /> */}
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
