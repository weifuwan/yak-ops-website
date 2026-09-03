"use client";

import HomeCapabilitiesSection from "./components/HomeCapabilitiesSection";
import HomeHeroSection from "./components/HomeHeroSection";

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-84px)] overflow-hidden bg-[#faf9f5] text-[#181817] [font-family:var(--yak-font-marketing)]">
      <HomeHeroSection />
      <HomeCapabilitiesSection />
    </main>
  );
}
