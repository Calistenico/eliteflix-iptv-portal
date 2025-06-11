
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PlansSection = () => {
  const plans = [
    {
      title: "Plano Mensal",
      price: "R$ 20",
      period: "/mês",
      description: "Acesso completo a canais ao vivo e VODs",
      features: [
        "Canais ao vivo HD/FHD",
        "Biblioteca completa de VODs",
        "Suporte técnico",
        "Acesso multiplataforma",
        "Atualizações automáticas"
      ],
      buttonText: "Assinar Agora",
      popular: false,
      link: "https://pay.cakto.com.br/3bo8dvz_374782"
    },
    {
      title: "Plano Revenda",
      price: "Créditos flexíveis",
      period: "",
      description: "10 créditos R$ 3,00 | Acima de 50 créditos R$ 2,80",
      features: [
        "Sistema de créditos flexível",
        "Preços escalonados",
        "Painel de revenda",
        "Relatórios detalhados",
        "Suporte prioritário"
      ],
      buttonText: "Começar Revenda",
      popular: true,
      link: "whatsapp"
    },
    {
      title: "Programa Afiliados",
      price: "50%",
      period: "comissão",
      description: "Ganhe 50% de comissão em qualquer serviço vendido",
      features: [
        "50% de comissão",
        "Materiais de marketing",
        "Link personalizado",
        "Pagamentos semanais",
        "Suporte dedicado"
      ],
      buttonText: "Ser Afiliado",
      popular: false,
      link: "https://app.cakto.com.br/affiliate/invite/87eb917f-3ae9-44c5-af54-ad7f88369f79"
    }
  ];

  const handleButtonClick = (link: string) => {
    if (link === "whatsapp") {
      window.open("https://wa.me/5544991082160?text=Olá! Gostaria de solicitar um orçamento.", "_blank");
    } else {
      window.open(link, "_blank");
    }
  };

  return (
    <section id="planos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nossos Planos
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades e comece a lucrar no mercado de IPTV
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`bg-card border-border hover:border-primary transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-primary relative' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-white">
                  {plan.title}
                </CardTitle>
                <div className="text-4xl font-bold text-primary">
                  {plan.price}
                  <span className="text-lg text-gray-400">{plan.period}</span>
                </div>
                <CardDescription className="text-gray-300">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handleButtonClick(plan.link)}
                  className={`w-full mt-6 ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'bg-secondary hover:bg-secondary/90'
                  } text-white font-semibold py-3`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
