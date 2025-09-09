import { Phone, Mail, MapPin, Clock, Facebook, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      content: "07 00 81 83 98",
      action: "Appeler maintenant"
    },
    {
      icon: Mail,
      title: "Site Web",
      content: "eereb-ci.org",
      action: "Visiter le site"
    },
    {
      icon: MapPin,
      title: "Adresse",
      content: "Abidjan, Côte d'Ivoire",
      action: "Voir sur la carte"
    },
    {
      icon: Clock,
      title: "Horaires de Culte",
      content: "Dim: 8h & 17h • Mer: 18h • Ven: 19h",
      action: "Voir le programme"
    }
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      handle: "@EEREBOfficiel",
      color: "text-blue-600",
      url: "https://web.facebook.com/eerebciv"
    },
    {
      icon: MessageCircle,
      name: "WhatsApp",
      handle: "07 00 81 83 98",
      color: "text-green-600"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-script text-4xl md:text-6xl font-bold text-foreground mb-4">
              Restons en{' '}
              <span className="text-primary font-bold text-shadow-lg bg-white/90 px-2 py-1 rounded">
                Contact
              </span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              N'hésitez pas à nous contacter pour toute question, prière ou pour rejoindre notre communauté
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="font-script text-3xl font-semibold text-primary mb-8">
                  Informations de Contact
                </h3>
                <div className="grid gap-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <Card key={index} className="group hover:shadow-card transition-all duration-300 bg-background/80 backdrop-blur-sm border-primary/10">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <IconComponent className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-script text-lg font-semibold text-primary mb-1">
                                {info.title}
                              </h4>
                              <p className="font-sans text-foreground mb-2">
                                {info.content}
                              </p>
                              <Button variant="ghost" size="sm" className="font-sans text-primary hover:text-primary-foreground hover:bg-primary p-0">
                                {info.action}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-script text-2xl font-semibold text-primary mb-6">
                  Suivez-nous
                </h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a 
                        key={index}
                        href={social.url || `tel:${social.handle.replace(/\s/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Card className="group hover:shadow-card transition-all duration-300 bg-background/80 backdrop-blur-sm border-primary/10 cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <IconComponent className={`h-6 w-6 ${social.color} group-hover:scale-110 transition-transform duration-300`} />
                              <div>
                                <div className="font-script font-semibold text-foreground">
                                  {social.name}
                                </div>
                                <div className="font-sans text-sm text-muted-foreground">
                                  {social.handle}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* QR Code Section */}
              <div>
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="font-script text-xl text-primary text-center">
                      Accès Rapide
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 border-2 border-primary/20 flex items-center justify-center">
                      {/* Placeholder for QR Code */}
                      <div className="text-primary font-sans text-xs">QR CODE</div>
                    </div>
                    <p className="font-sans text-sm text-muted-foreground">
                      Scannez pour accéder à notre site officiel
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Final Quote */}
          <div className="mt-20 text-center">
            <div className="max-w-3xl mx-auto bg-primary/5 rounded-2xl p-8 border border-primary/20">
              <blockquote className="font-script text-2xl text-primary italic mb-4">
                "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos."
              </blockquote>
              <cite className="font-sans text-muted-foreground">Matthieu 11:28</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;