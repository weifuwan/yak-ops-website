'use client';

import ContextPlatformSection from './components/ContextPlatformSection';
import HomeBrandsMarquee from './components/HomeBrandsMarquee';
import HomeHeroSection from './components/HomeHeroSection';

export default function HomePage() {
  return (
    <main className="-mt-16 min-h-[calc(100vh-64px)] overflow-hidden bg-white">
      <HomeHeroSection />
      <HomeBrandsMarquee />
      <ContextPlatformSection />
    </main>
  );
}
