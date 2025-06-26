
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MoviesCarousel from '@/components/MoviesCarousel';
import PlansSection from '@/components/PlansSection';
import SourcesSection from '@/components/SourcesSection';
import ServerSection from '@/components/ServerSection';
import RandomChannelsCarousel from '@/components/RandomChannelsCarousel';
import AffiliateSection from '@/components/AffiliateSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Movies Carousel */}
      <section className="py-12 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Filmes em Destaque
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Descubra os filmes mais populares disponíveis na nossa plataforma
            </p>
          </div>
          <MoviesCarousel />
        </div>
      </section>
      
      <PlansSection />
      <SourcesSection />
      <ServerSection />
      
      {/* Channels Demo Carousel */}
      <section className="py-12 bg-secondary/20">
        <div className="container mx-auto px-4">
          <RandomChannelsCarousel />
        </div>
      </section>
      
      <AffiliateSection />
      <Footer />
    </div>
  );
};

export default Index;
