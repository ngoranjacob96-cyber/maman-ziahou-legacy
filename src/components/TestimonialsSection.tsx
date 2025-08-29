import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sœur Marie K.",
      role: "Membre depuis 5 ans",
      content: "Grâce aux enseignements de Maman ZIAHOU, ma vie a été complètement transformée. J'ai trouvé la paix et la direction que je cherchais depuis longtemps.",
      rating: 5
    },
    {
      name: "Frère Jean-Baptiste D.",
      role: "Leader de groupe de prière",
      content: "L'amour du Christ rayonne à travers le ministère de Maman ZIAHOU. Sa compassion et sa sagesse m'ont aidé à surmonter les défis de ma vie.",
      rating: 5
    },
    {
      name: "Sœur Aya T.",
      role: "Nouvelle convertie",
      content: "Depuis que j'ai rejoint l'E.E.R.E.B, j'ai découvert un amour inconditionnel et une famille spirituelle extraordinaire. Gloire à Dieu !",
      rating: 5
    },
    {
      name: "Frère Emmanuel S.",
      role: "Responsable jeunesse",
      content: "La formation que j'ai reçue m'a équipé pour servir efficacement dans le ministère jeunesse. Maman ZIAHOU est une vraie mère spirituelle.",
      rating: 5
    },
    {
      name: "Sœur Grace N.",
      role: "Membre du conseil",
      content: "Les prières de Maman ZIAHOU ont apporté la guérison dans ma famille. Dieu utilise puissamment sa servante pour toucher les vies.",
      rating: 5
    },
    {
      name: "Pasteur Michel A.",
      role: "Ministre partenaire",
      content: "Je recommande vivement le ministère de Maman ZIAHOU. Son intégrité et son authenticité sont remarquables dans le service de Dieu.",
      rating: 5
    }
  ];

  const biblicalQuotes = [
    {
      verse: "Car mes pensées ne sont pas vos pensées, Et vos voies ne sont pas mes voies, Dit l'Éternel.",
      reference: "Ésaïe 55:8"
    },
    {
      verse: "Je puis tout par celui qui me fortifie.",
      reference: "Philippiens 4:13"
    },
    {
      verse: "Car nous marchons par la foi et non par la vue.",
      reference: "2 Corinthiens 5:7"
    },
    {
      verse: "L'Éternel est mon berger : je ne manquerai de rien.",
      reference: "Psaume 23:1"
    }
  ];

  return (
    <section id="témoignages" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-script text-4xl md:text-6xl font-bold text-foreground mb-4">
              Témoignages &{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Bénédictions
              </span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Découvrez comment Dieu transforme des vies à travers notre ministère
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 bg-gradient-card border-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="h-8 w-8 text-primary opacity-60 mr-3" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-primary fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="font-sans text-foreground leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="border-t border-primary/20 pt-4">
                    <h4 className="font-script text-lg font-semibold text-primary">
                      {testimonial.name}
                    </h4>
                    <p className="font-sans text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Biblical Quotes Section */}
          <div>
            <h3 className="font-script text-3xl font-semibold text-center text-primary mb-12">
              Versets Inspirants
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {biblicalQuotes.map((quote, index) => (
                <Card key={index} className="group hover:shadow-card transition-all duration-300 bg-primary/5 border-primary/20">
                  <CardContent className="p-8 text-center">
                    <Quote className="h-12 w-12 text-primary opacity-40 mx-auto mb-6" />
                    <blockquote className="font-script text-xl text-primary italic mb-4 leading-relaxed">
                      "{quote.verse}"
                    </blockquote>
                    <cite className="font-sans text-muted-foreground font-semibold">
                      - {quote.reference}
                    </cite>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Share Testimony */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-primary rounded-2xl p-8 text-primary-foreground">
              <h4 className="font-script text-2xl font-semibold mb-4">
                Partagez Votre Témoignage
              </h4>
              <p className="font-sans text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                Dieu a-t-il transformé votre vie ? Nous aimerions entendre votre histoire 
                pour encourager d'autres personnes dans leur parcours de foi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="font-sans bg-background text-primary px-6 py-3 rounded-lg hover:bg-background/90 transition-colors">
                  Partager Mon Témoignage
                </button>
                <button className="font-sans border-2 border-background text-background px-6 py-3 rounded-lg hover:bg-background hover:text-primary transition-colors">
                  Demander une Prière
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;