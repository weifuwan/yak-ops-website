'use client';

import ContextPlatformSection from './components/ContextPlatformSection';
import HomeHeroSection from './components/HomeHeroSection';
import HomeSectionNav from './components/HomeSectionNav';

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-60px)] overflow-hidden bg-white">
      <HomeHeroSection />
      <ContextPlatformSection />
    </main>
  );
}
