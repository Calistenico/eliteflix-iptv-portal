
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SourcesSection = () => {
  const sourceOptions = [
    {
      title: "Pacote Básico",
      connections: "50 conexões",
      price: "R$ 250",
      features: [
        "Canais HD e FHD",
        "Fontes estáveis e atualizadas",
        "Suporte técnico incluso",
        "Atualizações regulares"
      ]
    },
    {
      title: "Pacote Premium",
      connections: "100 conexões",
      price: "R$ 450",
      features: [
        "Canais HD e FHD",
        "Fontes premium exclusivas",
        "Suporte técnico prioritário",
        "Atualizações em tempo real"
      ]
    },
    {
      title: "Pacote Ilimitado",
      connections: "Conexões ilimitadas",
      price: "R$ 2.500",
      features: [
        "Canais HD e FHD",
        "Todas as fontes disponíveis",
        "Suporte técnico 24/7",
        "API completa inclusa"
      ]
    }
  ];

  return (
    <section id="fontes" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Fontes de Canais Premium
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Tenha acesso às melhores fontes de canais ao vivo e conteúdos VOD para seu servidor.
          </p>
          
          <div className="bg-card p-8 rounded-lg max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">HD & FHD</div>
                <p className="text-gray-300">Canais em alta definição</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <p className="text-gray-300">Fontes estáveis e atualizadas</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Suporte</div>
                <p className="text-gray-300">Suporte técnico incluso</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {sourceOptions.map((option, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-white">
                  {option.title}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {option.connections}
                </CardDescription>
                <div className="text-4xl font-bold text-primary">
                  {option.price}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                  Adquirir Fontes
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SourcesSection;
