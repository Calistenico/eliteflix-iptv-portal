
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ServerSection = () => {
  const features = [
    {
      title: "Painéis Administrativos",
      description: "XUI, Xtream UI e outros painéis profissionais",
      icon: "⚙️"
    },
    {
      title: "Fontes Inclusas",
      description: "Pacote completo de canais e conteúdos VOD",
      icon: "📺"
    },
    {
      title: "Configuração Profissional",
      description: "Setup completo e otimizado para performance",
      icon: "🔧"
    },
    {
      title: "Treinamento Básico",
      description: "Aprenda a gerenciar seu servidor com eficiência",
      icon: "🎓"
    }
  ];

  return (
    <section id="servidor" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Quer ter seu próprio servidor IPTV?
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Oferecemos construção completa de servidores para você se tornar dono do seu negócio. 
              Inclui sistema, painéis, fontes, suporte e entrega pronta para uso.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-card border-border hover:border-primary transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="text-4xl mb-3">{feature.icon}</div>
                    <CardTitle className="text-xl font-bold text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-8 rounded-lg border border-primary/30">
              <h3 className="text-2xl font-bold text-white mb-4">
                Servidor Completo e Profissional
              </h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                  Entrega em até 48 horas
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                  Suporte técnico por 30 dias
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                  Documentação completa
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                  Garantia de funcionamento
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 text-lg">
                Solicitar Orçamento
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerSection;
