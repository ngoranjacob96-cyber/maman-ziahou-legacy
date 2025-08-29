import { Heart, Cross, Users, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const highlights = [
    {
      icon: Cross,
      title: "Appel Divin",
      description: "Appelée par Dieu pour servir et transformer des vies"
    },
    {
      icon: Users,
      title: "Communauté",
      description: "Fondatrice d'une église dynamique et bienveillante"
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "Un cœur ouvert pour tous ceux qui cherchent l'espoir"
    },
    {
      icon: Award,
      title: "Leadership",
      description: "Leader reconnue dans la communauté spirituelle"
    }
  ];

  return (
    <section id="apropos" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-script text-4xl md:text-6xl font-bold text-foreground mb-4">
              À propos de{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Maman ZIAHOU
              </span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Découvrez le parcours inspirant d'une femme de foi dévouée à transformer des vies par l'amour du Christ
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="font-script text-3xl font-semibold text-primary">
                  Une Mission Divine
                </h3>
                <p className="font-sans text-lg leading-relaxed text-foreground">
                  Maman ZIAHOU est une leader spirituelle reconnue en Côte d'Ivoire, fondatrice et dirigeante de l'Église Évangélique 
                  de la Résurrection et de Bénédictions (E.E.R.E.B) basée à Abidjan. Depuis plus de deux décennies, elle consacre 
                  sa vie à l'évangélisation en Côte d'Ivoire et au service communautaire à travers son ministère chrétien.
                </p>
                <p className="font-sans text-lg leading-relaxed text-foreground">
                  Son ministère de louange et adoration est marqué par une compassion profonde pour les âmes perdues et un engagement 
                  indéfectible envers l'œuvre de Dieu. Elle prêche avec autorité lors de cultes en direct et formation biblique, touchant 
                  les cœurs par sa sincérité et son authenticité dans l'Église en ligne Afrique.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-script text-2xl font-semibold text-primary">Vision & Mission</h4>
                <div className="bg-accent/50 rounded-xl p-6 border border-primary/20">
                  <p className="font-script text-xl text-primary italic mb-3">
                    "Porter l'espoir et la transformation par l'Évangile du Christ"
                  </p>
                  <p className="font-sans text-foreground leading-relaxed">
                    Établir des communautés de foi solides, former des leaders spirituels et 
                    impacter positivement la société par l'amour et la vérité biblique.
                  </p>
                </div>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-6">
              {highlights.map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <Card key={index} className="group hover:shadow-card transition-all duration-300 bg-background/80 backdrop-blur-sm border-primary/10">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 flex justify-center">
                        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="h-8 w-8 text-primary-foreground" />
                        </div>
                      </div>
                      <h4 className="font-script text-xl font-semibold text-primary mb-2">
                        {highlight.title}
                      </h4>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                        {highlight.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Quote Section */}
          <div className="mt-20 text-center">
            <div className="max-w-4xl mx-auto bg-primary/5 rounded-2xl p-8 border border-primary/20">
              <blockquote className="font-script text-2xl md:text-3xl text-primary italic mb-4">
                "La vraie richesse n'est pas dans ce que nous possédons, mais dans l'amour que nous partageons et les vies que nous touchons pour Christ."
              </blockquote>
              <cite className="font-sans text-lg text-muted-foreground">- Maman ZIAHOU</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;