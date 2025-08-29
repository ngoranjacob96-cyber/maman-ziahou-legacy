import { ArrowDown, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/lovable-uploads/1fac5717-8a81-4835-91d7-cb03ec4cd10b.png"
          alt="Maman ZIAHOU en ministère - Culte de louange et d'adoration"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background/70 to-primary/20"></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 animate-pulse">
        <Star className="h-6 w-6 text-primary opacity-70" />
      </div>
      <div className="absolute top-32 right-20 animate-pulse delay-1000">
        <Heart className="h-8 w-8 text-primary opacity-60" />
      </div>
      <div className="absolute bottom-40 left-20 animate-pulse delay-2000">
        <Star className="h-4 w-4 text-primary opacity-80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo E.E.R.E.B */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-4 bg-background/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-card">
            <img 
              src="/lovable-uploads/706bed56-43b4-4188-8f73-ec75cf5708f8.png" 
              alt="Logo E.E.R.E.B" 
              className="h-12 w-12 object-contain"
            />
            <div>
              <span className="font-script text-2xl font-bold text-primary">E.E.R.E.B</span>
              <div className="font-sans text-sm text-muted-foreground">Ressuscités pour sauver !</div>
            </div>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="font-script text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-foreground leading-tight">
          Maman{' '}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            ZIAHOU
          </span>
        </h1>

        {/* Citation Principale */}
        <div className="mb-8 p-6 bg-background/90 backdrop-blur-sm rounded-2xl shadow-card border border-primary/20">
          <p className="font-script text-2xl md:text-3xl text-primary mb-2 leading-relaxed">
            "Seul Jésus peut changer ton histoire"
          </p>
          <p className="font-sans text-lg text-muted-foreground">
            Leader Spirituelle • Fondatrice E.E.R.E.B • Servante de Dieu
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg"
            className="font-sans text-lg px-8 py-4 bg-primary text-primary-foreground hover:bg-primary-glow shadow-golden"
          >
            Découvrir mon ministère
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="font-sans text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Nos témoignages
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 text-primary mx-auto" />
        </div>
      </div>

      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 z-5 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             }}
        ></div>
      </div>
    </section>
  );
};

export default HeroSection;