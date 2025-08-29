import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const GallerySection = () => {
  const [filter, setFilter] = useState('tous');

  // Placeholder for gallery images - in a real app, these would be actual image URLs
  const galleryItems = [
    {
      category: 'cultes',
      title: 'Service Dominical',
      description: 'Moment de louange et adoration',
      image: '/placeholder.svg'
    },
    {
      category: 'conferences',
      title: 'Conférence Annuelle',
      description: 'Rassemblement des leaders',
      image: '/placeholder.svg'
    },
    {
      category: 'communaute',
      title: 'Œuvre Sociale',
      description: 'Distribution aux nécessiteux',
      image: '/placeholder.svg'
    },
    {
      category: 'cultes',
      title: 'Baptême',
      description: 'Nouvelle vie en Christ',
      image: '/placeholder.svg'
    },
    {
      category: 'conferences',
      title: 'Croisade d\'Évangélisation',
      description: 'Prédication en plein air',
      image: '/placeholder.svg'
    },
    {
      category: 'communaute',
      title: 'École du Dimanche',
      description: 'Formation des enfants',
      image: '/placeholder.svg'
    },
    {
      category: 'cultes',
      title: 'Prière de Guérison',
      description: 'Moments de miracles',
      image: '/placeholder.svg'
    },
    {
      category: 'conferences',
      title: 'Formation Leadership',
      description: 'Équipement des serviteurs',
      image: '/placeholder.svg'
    }
  ];

  const categories = [
    { id: 'tous', label: 'Tous' },
    { id: 'cultes', label: 'Cultes' },
    { id: 'conferences', label: 'Conférences' },
    { id: 'communaute', label: 'Communauté' }
  ];

  const filteredItems = filter === 'tous' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <section id="galerie" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-script text-4xl md:text-6xl font-bold text-foreground mb-4">
              Galerie{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Photos
              </span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Découvrez les moments forts de notre ministère à travers ces images inspirantes
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filter === category.id ? "default" : "outline"}
                onClick={() => setFilter(category.id)}
                className={`font-sans ${
                  filter === category.id 
                    ? 'bg-primary text-primary-foreground hover:bg-primary-glow' 
                    : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-card transition-all duration-300 bg-background/80 backdrop-blur-sm border-primary/10">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-script text-lg font-semibold mb-1">{item.title}</h4>
                    <p className="font-sans text-sm opacity-90">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="font-sans border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3"
            >
              Voir Plus de Photos
            </Button>
          </div>

          {/* Bible Verse */}
          <div className="mt-16 text-center">
            <div className="max-w-3xl mx-auto bg-primary/5 rounded-2xl p-8 border border-primary/20">
              <blockquote className="font-script text-xl md:text-2xl text-primary italic mb-4">
                "Que toute la terre crie de joie vers l'Éternel ! Servez l'Éternel avec joie, Venez avec allégresse en sa présence !"
              </blockquote>
              <cite className="font-sans text-muted-foreground">Psaume 100:1-2</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;