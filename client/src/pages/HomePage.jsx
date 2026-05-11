import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import StatsSection from '../components/home/StatsSection';

/**
 * Home Page
 * Combines Hero, Features, and Stats sections
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
    </>
  );
}
