"use client";

import HomeHeroSection from "./components/HomeHeroSection";
import HomeSectionNav from "./components/HomeSectionNav";

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white">
      <HomeHeroSection />
      <HomeSectionNav />
    </main>
  );
}
