"use client";

import HomeCapabilitiesSection from "./components/HomeCapabilitiesSection";
import HomeClosingSection from "./components/HomeClosingSection";
import HomeCommunitySection from "./components/HomeCommunitySection";
import HomeDataLifecycleSection from "./components/HomeDataLifecycleSection";
import HomeDataStackSection from "./components/HomeDataStackSection";
import HomeHeroSection from "./components/HomeHeroSection";
import HomeInActionSection from "./components/HomeInActionSection";
import HomeUseCasesSection from "./components/HomeUseCasesSection";

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-84px)] overflow-hidden bg-[#faf9f5] text-[#181817] [font-family:var(--yak-font-marketing)]">
      <HomeHeroSection />
      <HomeCapabilitiesSection />
      <HomeUseCasesSection />
      <HomeDataLifecycleSection />
      <HomeDataStackSection />
      <HomeInActionSection />
      <HomeCommunitySection />
      <HomeClosingSection />
    </main>
  );
}
