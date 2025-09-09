import { Heart, Facebook, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'À propos', href: '#apropos' },
    { name: 'Ministère', href: '#ministere' },
    { name: 'Galerie', href: '#galerie' },
    { name: 'Contact', href: '#contact' },
    { name: 'Admin Prières', href: '/admin/prayers' }
  ];

  const services = [
    { name: 'Cultes Dominicaux', time: '8h & 17h' },
    { name: 'Prière Mercredi', time: '18h' },
    { name: 'Jeunesse Vendredi', time: '19h' },
    { name: 'École Biblique', time: 'Samedi 15h' }
  ];

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* About Section */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/lovable-uploads/706bed56-43b4-4188-8f73-ec75cf5708f8.png" 
                  alt="Logo E.E.R.E.B" 
                  className="h-10 w-10 object-contain"
                />
                <div>
                  <div className="font-script text-xl font-bold text-primary">E.E.R.E.B</div>
                  <div className="text-xs text-background/80 font-sans">Ressuscités pour sauver !</div>
                </div>
              </div>
              <p className="font-sans text-background/80 leading-relaxed mb-6">
                Église Évangélique de la Résurrection et de Bénédictions, 
                une communauté de foi dédiée à l'évangélisation et à la transformation des vies.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://web.facebook.com/eerebciv" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="tel:07008183988" className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-script text-xl font-semibold text-primary mb-6">Navigation</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="font-sans text-background/80 hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-script text-xl font-semibold text-primary mb-6">Nos Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="font-sans text-background/80">
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-background/60">{service.time}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-script text-xl font-semibold text-primary mb-6">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-background/80">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-sans text-sm">07 00 81 83 98</span>
                </div>
                <div className="flex items-center space-x-3 text-background/80">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-sans text-sm">eereb-ci.org</span>
                </div>
                <div className="flex items-center space-x-3 text-background/80">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-sans text-sm">Abidjan, Côte d'Ivoire</span>
                </div>
              </div>
            </div>
          </div>

          {/* Biblical Quote */}
          <div className="border-t border-background/20 pt-8 mb-8">
            <div className="text-center">
              <blockquote className="font-script text-xl text-primary italic mb-2">
                "Car là où deux ou trois sont assemblés en mon nom, je suis au milieu d'eux."
              </blockquote>
              <cite className="font-sans text-background/70 text-sm">Matthieu 18:20</cite>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-background/20 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="font-sans text-background/70 text-sm">
                © {currentYear} E.E.R.E.B - Maman ZIAHOU. Tous droits réservés.
              </div>
              <div className="font-sans text-background/70 text-sm">
                Développé avec ❤️ pour la gloire de Dieu
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-background/10">
              <a 
                href="/mentions-legales" 
                className="font-sans text-background/60 text-xs hover:text-primary transition-colors"
              >
                Mentions Légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;