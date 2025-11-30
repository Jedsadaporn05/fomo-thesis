import MainNav from "@/components/layout/MainNav";
import MainHeroSection from "@/components/home/MainHeroSection";
import KnowledgeSection from "@/components/home/KnowledgeSection";
import MemberSection from "@/components/home/MemberSection";

export default function HomePage() {
  return (
    <>
      <MainNav />
      <MainHeroSection />
      <KnowledgeSection />
      <MemberSection />
    </>
  );
}
