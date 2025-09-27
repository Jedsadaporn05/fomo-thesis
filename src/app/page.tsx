import HeroSection from "@/components/home/HeroSection";
import KnowledgeSection from "@/components/home/KnowledgeSection";
import ContactSection from "@/components/home/ContactSection";
import MemberSection from "@/components/home/MemberSection";

export default function HomePage() {
  return (
    <section>
      <HeroSection />
      <KnowledgeSection />
      <ContactSection />
      <MemberSection />
    </section>
  );
}
