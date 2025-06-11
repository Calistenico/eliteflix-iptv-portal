
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AffiliateSection = () => {
  const benefits = [
    {
      title: "50% de Comissão",
      description: "Ganhe metade do valor de cada venda realizada",
      icon: "💰"
    },
    {
      title: "Materiais de Marketing",
      description: "Receba banners, vídeos e conteúdo para promover",
      icon: "📢"
    },
    {
      title: "Pagamentos Semanais",
      description: "Receba seus ganhos toda semana via PIX",
      icon: "⚡"
    },
    {
      title: "Suporte Dedicado",
      description: "Canal exclusivo para afiliados com suporte prioritário",
      icon: "🎧"
    }
  ];

  return (
    <section id="afiliados" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Seja um Afiliado EliteFlix
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ganhe dinheiro promovendo nossos serviços. Com 50% de comissão em todas as vendas, 
              você tem tudo para construir uma renda sólida no mercado de IPTV.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            {/* Benefits */}
            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-card border-border hover:border-primary transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="text-4xl mb-3">{benefit.icon}</div>
                    <CardTitle className="text-xl font-bold text-white">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-center">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-8 rounded-lg border border-primary/30">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">
                Por que ser nosso afiliado?
              </h3>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">50%</div>
                  <p className="text-gray-300">De comissão em todas as vendas</p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">R$ 500+</div>
                  <p className="text-gray-300">Potencial de ganho mensal</p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <p className="text-gray-300">Suporte sempre disponível</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-12 py-4 text-xl rounded-lg transition-all duration-300 hover:scale-105 animate-pulse-red">
              Quero ser um Afiliado EliteFlix
            </Button>
            <p className="text-gray-400 mt-4">
              Comece a ganhar dinheiro hoje mesmo. É grátis para se cadastrar!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AffiliateSection;
