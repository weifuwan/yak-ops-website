'use client';

import ContextPlatformSection from './components/ContextPlatformSection';
import HomeMetricsSection from './components/HomeMetricsSection';
import HomeTestimonialsSection from './components/HomeTestimonialsSection';
import HomeBrandsMarquee from './components/HomeBrandsMarquee';
import HomeContextProblemSection from './components/HomeContextProblemSection';
import HomeContextRiskSection from './components/HomeContextRiskSection';
import HomeIndustriesSection from './components/HomeIndustriesSection';
import HomeHeroSection from './components/HomeHeroSection';

export default function HomePage() {
  return (
    <main className="-mt-16 min-h-[calc(100vh-64px)] overflow-hidden bg-white">
      <HomeHeroSection />
      <HomeBrandsMarquee />
      <HomeContextProblemSection />
      <HomeContextRiskSection />
      <ContextPlatformSection />
      <HomeMetricsSection />
      <HomeTestimonialsSection />
      <HomeIndustriesSection />
    </main>
  );
}
