import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Play, Clock, Eye, X } from 'lucide-react';

const GallerySection = () => {
  const [filter, setFilter] = useState('tous');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Type definitions
  type ImageItem = {
    type: 'image';
    category: string;
    title: string;
    description: string;
    image: string;
  };

  type VideoItem = {
    type: 'video';
    category: string;
    title: string;
    description: string;
    thumbnail: string;
    duration: string;
    views: string;
    videoUrl: string;
  };

  type GalleryItem = ImageItem | VideoItem;

  // Données de la galerie - Images réelles du ministère
  const galleryImages: ImageItem[] = [
    {
      type: 'image',
      category: 'cultes',
      title: 'Maman ZIAHOU en Prédication',
      description: 'Culte de louange et d\'adoration - 03.08.2025',
      image: '/lovable-uploads/d99e0a7c-4b2b-488c-b21d-3d0fb689a793.png'
    },
    {
      type: 'image',
      category: 'cultes',
      title: 'Moment de Prière Collective',
      description: 'Congrégation en méditation et prière - 24.08.2025',
      image: '/lovable-uploads/4a253aaa-226f-43d3-9de7-b7bc6558fd47.png'
    },
    {
      type: 'image',
      category: 'cultes',
      title: 'Service de Louange',
      description: 'Maman ZIAHOU dirigeant l\'adoration',
      image: '/lovable-uploads/896c6414-6925-4c58-884f-c7ec1ca1e505.png'
    },
    {
      type: 'image',
      category: 'communaute',
      title: 'Fidèles en Méditation',
      description: 'Moments de recueillement avec la Parole',
      image: '/lovable-uploads/dab1fc28-bcdb-4044-817f-bd6f44e052c9.png'
    }
  ];

  // Données de la galerie - Vidéos YouTube authentiques
  const galleryVideos: VideoItem[] = [
    {
      type: 'video',
      category: 'videos',
      title: 'Prédication: "La Foi qui Transforme"',
      description: 'Message puissant de Maman ZIAHOU',
      thumbnail: 'https://img.youtube.com/vi/xMHSxReg1OI/maxresdefault.jpg',
      duration: '45:32',
      views: '12.5K',
      videoUrl: 'https://youtu.be/xMHSxReg1OI?si=bPPZQt7JcdruyDhT'
    },
    {
      type: 'video',
      category: 'videos',
      title: 'Témoignage: Miracle de Guérison',
      description: 'Témoignage touchant et inspiration divine',
      thumbnail: 'https://img.youtube.com/vi/I_UfgyA5erc/maxresdefault.jpg',
      duration: '32:15',
      views: '8.2K',
      videoUrl: 'https://youtu.be/I_UfgyA5erc?si=-vVDhXG8D0zuQYHC'
    },
    {
      type: 'video',
      category: 'videos',
      title: 'Culte de Louange Spécial',
      description: 'Moments d\'adoration exceptionnels avec E.E.R.E.B',
      thumbnail: 'https://img.youtube.com/vi/_J7BfHIaB9M/maxresdefault.jpg',
      duration: '1:23:45',
      views: '15.7K',
      videoUrl: 'https://youtu.be/_J7BfHIaB9M?si=g-lcG4iYEokQRdue'
    }
  ];

  // Toutes les données combinées
  const allGalleryItems: GalleryItem[] = [...galleryImages, ...galleryVideos];

  // Catégories disponibles
  const categories = [
    { id: 'tous', label: 'Tous' },
    { id: 'cultes', label: 'Cultes' },
    { id: 'communaute', label: 'Communauté' },
    { id: 'videos', label: 'Vidéos' }
  ];

  // Filtrage des éléments
  const filteredItems = filter === 'tous' 
    ? allGalleryItems 
    : allGalleryItems.filter(item => item.category === filter);

  // Fonctions pour gérer les modals
  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Fonction pour convertir YouTube URL en embed
  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
  };

  // Composant pour rendre un élément image
  const renderImageItem = (item: ImageItem, index: number) => (
    <Card 
      key={index} 
      className="group overflow-hidden hover:shadow-card transition-all duration-300 bg-background/80 backdrop-blur-sm border-primary/10 cursor-pointer"
      onClick={() => handleItemClick(item)}
    >
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
  );

  // Composant pour rendre un élément vidéo
  const renderVideoItem = (item: VideoItem, index: number) => (
    <Card 
      key={index} 
      className="group overflow-hidden hover:shadow-card transition-all duration-300 bg-background/80 backdrop-blur-sm border-primary/10 cursor-pointer"
      onClick={() => handleItemClick(item)}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
          <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play className="h-8 w-8 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </div>
        {/* Video Duration */}
        <div className="absolute top-2 left-2">
          <span className="bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{item.duration}</span>
          </span>
        </div>
        {/* Video Views */}
        <div className="absolute top-2 right-2">
          <span className="bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
            <Eye className="h-3 w-3" />
            <span>{item.views}</span>
          </span>
        </div>
        {/* Video Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
          <h4 className="font-script text-lg font-semibold mb-1">{item.title}</h4>
          <p className="font-sans text-sm opacity-90">{item.description}</p>
        </div>
      </div>
    </Card>
  );

  return (
    <section id="galerie" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-script text-4xl md:text-6xl font-bold text-foreground mb-4">
              Galerie{' '}
              <span className="text-primary font-bold text-shadow-lg bg-white/90 px-2 py-1 rounded">
                Photos & Vidéos
              </span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Découvrez les moments forts de notre ministère à travers ces images et vidéos inspirantes
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
            {filteredItems.map((item, index) => 
              item.type === 'video' ? renderVideoItem(item, index) : renderImageItem(item, index)
            )}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-sans border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3"
            >
              Voir Plus de Contenus
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

      {/* Modal pour affichage des images et vidéos */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="font-script text-2xl text-foreground">
              {selectedItem?.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden">
            {selectedItem && (
              <div className="h-full flex flex-col">
                {selectedItem.type === 'image' ? (
                  <div className="flex-1 flex items-center justify-center p-6">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="flex-1 p-6">
                    <div className="w-full h-full rounded-lg overflow-hidden">
                      <iframe
                        src={getYouTubeEmbedUrl(selectedItem.videoUrl)}
                        title={selectedItem.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
                
                <div className="p-6 pt-2 border-t border-border">
                  <p className="font-sans text-muted-foreground">
                    {selectedItem.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;