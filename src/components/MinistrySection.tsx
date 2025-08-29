import { Church, Users, Heart, BookOpen, Handshake, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MinistrySection = () => {
  const ministryAreas = [
    {
      icon: Church,
      title: "Cultes & Prédications",
      description: "Services réguliers avec des messages transformateurs basés sur la Parole de Dieu",
      stats: "3 services par semaine"
    },
    {
      icon: Users,
      title: "Formation des Leaders",
      description: "Équipement et formation de serviteurs pour l'œuvre de Dieu",
      stats: "50+ leaders formés"
    },
    {
      icon: Heart,
      title: "Œuvres Sociales",
      description: "Assistance aux nécessiteux, orphelins et familles en difficulté",
      stats: "200+ familles aidées"
    },
    {
      icon: BookOpen,
      title: "École Biblique",
      description: "Enseignements approfondis des Écritures pour tous les âges",
      stats: "Classes hebdomadaires"
    },
    {
      icon: Handshake,
      title: "Réconciliation",
      description: "Médiation et restauration des relations brisées",
      stats: "Counseling familial"
    },
    {
      icon: Calendar,
      title: "Événements Spéciaux",
      description: "Conférences, croisades et programmes d'évangélisation",
      stats: "Événements mensuels"
    }
  ];

  const achievements = [
    { number: "20+", label: "Années de Ministère" },
    { number: "1000+", label: "Vies Transformées" },
    { number: "15+", label: "Églises Plantées" },
    { number: "50+", label: "Serviteurs Formés" }
  ];

  return (
    <section id="ministere" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-script text-4xl md:text-6xl font-bold text-foreground mb-4">
              Ministère &{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Œuvres
              </span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              L'Église Évangélique de la Résurrection et de Bénédictions (E.E.R.E.B) œuvre pour l'expansion du Royaume de Dieu
            </p>
          </div>

          {/* E.E.R.E.B Presentation */}
          <div className="mb-20">
            <Card className="bg-gradient-card border-primary/20 shadow-card">
              <CardHeader className="text-center pb-6">
                <CardTitle className="font-script text-3xl text-primary mb-4">
                  Église Évangélique de la Résurrection et de Bénédictions
                </CardTitle>
                <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto">
                  Fondée sous l'inspiration divine, l'E.E.R.E.B est une communauté de foi dynamique dédiée 
                  à l'évangélisation, à la formation spirituelle et au service communautaire.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <h4 className="font-script text-xl text-primary mb-3">Notre Vision</h4>
                    <p className="font-sans text-foreground">
                      Être une église modèle qui forme des disciples authentiques et impacte 
                      positivement la société par l'amour du Christ.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-script text-xl text-primary mb-3">Notre Mission</h4>
                    <p className="font-sans text-foreground">
                      Évangéliser, enseigner, former et servir avec excellence pour la gloire 
                      de Dieu et le salut des âmes.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-script text-xl text-primary mb-3">Nos Valeurs</h4>
                    <p className="font-sans text-foreground">
                      Intégrité, compassion, excellence, unité et engagement total envers 
                      la Parole de Dieu.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ministry Areas */}
          <div className="mb-20">
            <h3 className="font-script text-3xl font-semibold text-center text-primary mb-12">
              Domaines d'Action
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ministryAreas.map((area, index) => {
                const IconComponent = area.icon;
                return (
                  <Card key={index} className="group hover:shadow-card transition-all duration-300 bg-background border-primary/10">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4">
                          <IconComponent className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <h4 className="font-script text-xl font-semibold text-primary mb-2">
                          {area.title}
                        </h4>
                        <p className="font-sans text-sm text-muted-foreground mb-3">
                          {area.description}
                        </p>
                        <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                          {area.stats}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div className="text-center mb-16">
            <h3 className="font-script text-3xl font-semibold text-primary mb-12">
              Impact & Réalisations
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="group">
                  <div className="bg-gradient-card rounded-xl p-6 border border-primary/20 shadow-soft group-hover:shadow-card transition-all duration-300">
                    <div className="font-script text-3xl md:text-4xl font-bold text-primary mb-2">
                      {achievement.number}
                    </div>
                    <div className="font-sans text-sm text-muted-foreground">
                      {achievement.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
              <h4 className="font-script text-2xl text-primary mb-4">
                Rejoignez-nous dans cette Mission
              </h4>
              <p className="font-sans text-foreground mb-6 max-w-2xl mx-auto">
                Que vous cherchiez la paix, la guérison ou simplement à grandir spirituellement, 
                vous êtes le bienvenu dans notre communauté de foi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="font-sans bg-primary text-primary-foreground hover:bg-primary-glow">
                  Visitez notre Église
                </Button>
                <Button variant="outline" className="font-sans border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Demander une Prière
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MinistrySection;