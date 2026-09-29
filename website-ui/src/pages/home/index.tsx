"use client";

import HomeClosingSection from "./components/HomeClosingSection";
import HomeHeroSection from "./components/HomeHeroSection";
import HomeOpenSourceSection from "./components/HomeOpenSourceSection";
import HomeProductSection from "./components/HomeProductSection";
import HomeValueSection from "./components/HomeValueSection";

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-84px)] overflow-hidden bg-white text-[#101828] [font-family:var(--yak-font-marketing)]">
      <HomeHeroSection />
      <HomeValueSection />
      <HomeProductSection />
      <HomeOpenSourceSection />
      <HomeClosingSection />
    </main>
  );
}
