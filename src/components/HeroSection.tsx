
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-black-red"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-shadow animate-fade-in">
            Todo o poder do IPTV em um só lugar
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto animate-fade-in">
            De planos individuais à entrega completa de servidores. Aqui você encontra tudo para consumir, revender e lucrar com IPTV.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 animate-pulse-red"
            >
              Ver Planos
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              Seja um Afiliado
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
