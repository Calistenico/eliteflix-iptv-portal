
const Footer = () => {
  const quickLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Planos', href: '#planos' },
    { label: 'Fontes', href: '#fontes' },
    { label: 'Servidor', href: '#servidor' },
    { label: 'Afiliados', href: '#afiliados' }
  ];

  const legalLinks = [
    { label: 'Termos de Uso', href: '#' },
    { label: 'Política de Privacidade', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Suporte', href: '#' }
  ];

  const socialLinks = [
    { label: 'WhatsApp', href: 'https://wa.me/5544991082160', icon: '📱' },
    { label: 'Telegram', href: '#', icon: '✈️' },
    { label: 'Instagram', href: 'https://instagram.com/desenvolvedor_ofc', icon: '📷' },
    { label: 'Email', href: '#', icon: '✉️' }
  ];

  return (
    <footer id="contato" className="bg-black border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold text-white mb-4">
              Elite<span className="text-primary">Flix</span>
            </div>
            <p className="text-gray-400 mb-4">
              Seu parceiro completo no mundo IPTV. Oferecemos soluções profissionais para consumir, revender e lucrar.
            </p>
            <p className="text-primary font-semibold">
              EliteFlix — seu parceiro completo no mundo IPTV.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 hover:text-primary transition-colors duration-300"
                >
                  <span className="mr-3 text-lg">{social.icon}</span>
                  {social.label}
                </a>
              ))}
            </div>
            <div className="mt-4 text-gray-400">
              <p className="text-sm">WhatsApp: (44) 99108-2160</p>
              <p className="text-sm">Instagram: @desenvolvedor_ofc</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 EliteFlix. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
