
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PlansSection from '@/components/PlansSection';
import SourcesSection from '@/components/SourcesSection';
import ServerSection from '@/components/ServerSection';
import AffiliateSection from '@/components/AffiliateSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <PlansSection />
      <SourcesSection />
      <ServerSection />
      <AffiliateSection />
      <Footer />
    </div>
  );
};

export default Index;
