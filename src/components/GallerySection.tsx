import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Play, Clock, Eye, X, Volume2, Pause, Download } from 'lucide-react';

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

  type AudioItem = {
    type: 'audio';
    category: string;
    title: string;
    description: string;
    audioUrl: string;
    duration: string;
    date: string;
    image?: string; // Ajout pour l'image du témoignage
  };

  type GalleryItem = ImageItem | VideoItem | AudioItem;

  // Données de la galerie - Images réelles du ministère
  const galleryImages: ImageItem[] = [
    {
      type: 'image',
      category: 'photos',
      title: 'Maman ZIAHOU en Prédication',
      description: 'Message inspirant avec passion - 24.08.2025',
      image: '/lovable-uploads/43c305b1-85ed-4ced-8912-03b915c8c4f8.png'
    },
    {
      type: 'image',
      category: 'photos',
      title: 'Maman ZIAHOU en Prédication',
      description: 'Culte de louange et d\'adoration - 03.08.2025',
      image: '/lovable-uploads/d99e0a7c-4b2b-488c-b21d-3d0fb689a793.png'
    },
    {
      type: 'image',
      category: 'photos',
      title: 'Moment de Prière Collective',
      description: 'Congrégation en méditation et prière - 24.08.2025',
      image: '/lovable-uploads/4a253aaa-226f-43d3-9de7-b7bc6558fd47.png'
    },
    {
      type: 'image',
      category: 'photos',
      title: 'Service de Louange',
      description: 'Maman ZIAHOU dirigeant l\'adoration',
      image: '/lovable-uploads/896c6414-6925-4c58-884f-c7ec1ca1e505.png'
    },
    {
      type: 'image',
      category: 'photos',
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

  // Données de la galerie - Audios de prédication
  const galleryAudios: AudioItem[] = [
    {
      type: 'audio',
      category: 'audios',
      title: 'Culte d\'Auto Délivrance',
      description: 'Service spirituel puissant - EEREB 03.08.2022',
      audioUrl: 'https://soundcloud.com/ngoran-jacob/culte-dauto-delivrance-03082022-eereb_256k-1?in=ngoran-jacob/sets/audio-eereb&si=a5eb0920d34f4e9cb0bfb059892ea8bb&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      duration: '',
      date: '03.08.2022'
    },
    {
      type: 'audio',
      category: 'audios',
      title: 'Culte de Louange et d\'Adoration',
      description: 'Moments de louange inspirants - EEREB 14.08.2022',
      audioUrl: 'https://soundcloud.com/ngoran-jacob/culte-de-louange-et-dadoration-14082022-eereb_256k-2?in=ngoran-jacob/sets/audio-eereb&si=791baa32375b49ed9a2f7bc49be2d450&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      duration: '',
      date: '14.08.2022'
    }
  ];

  // Données témoignages audios
  const testimonialAudios: AudioItem[] = [
    {
      type: 'audio',
      category: 'temoignages',
      title: 'Témoignage d\'Alice Makoma',
      description: 'Témoignage touchant de transformation par la grâce de Dieu - EEREB 24/08/2025',
      audioUrl: 'https://soundcloud.com/ngoran-jacob/temoignage-alice-makoma-1?in=ngoran-jacob/sets/temoignages&si=db772cba3e1f4fd7847ed4232e812583&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      duration: '',
      date: '24.08.2025',
      image: '/lovable-uploads/4b3fe997-fefc-4887-ac9d-828e31094910.png'
    },
    {
      type: 'audio',
      category: 'temoignages',
      title: 'Miracle Financier - Jean Baptiste',
      description: 'Comment Dieu a transformé ma situation financière après les prières',
      audioUrl: 'https://soundcloud.com/ngoran-jacob/temoignage-miracle-jean',
      duration: '12:30',
      date: '20.08.2024'
    },
    {
      type: 'audio',
      category: 'temoignages',
      title: 'Restauration Familiale - Awa Traoré',
      description: 'Témoignage touchant sur la restauration de mon mariage',
      audioUrl: 'https://soundcloud.com/ngoran-jacob/temoignage-famille-awa',
      duration: '15:20',
      date: '05.07.2024'
    },
    {
      type: 'audio',
      category: 'temoignages',
      title: 'Délivrance Spirituelle - Koffi Assamoi',
      description: 'Mon témoignage de délivrance des liens spirituels négatifs',
      audioUrl: 'https://soundcloud.com/ngoran-jacob/temoignage-delivrance-koffi',
      duration: '18:15',
      date: '12.06.2024'
    }
  ];

  // Toutes les données combinées (sans les audios pour la grille principale)
  const allGalleryItems: GalleryItem[] = [...galleryImages, ...galleryVideos];

  // Catégories disponibles (sans audios car ils ont leur propre section)
  const categories = [
    { id: 'tous', label: 'Tous' },
    { id: 'photos', label: 'Photos' },
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

  // Fonction pour convertir SoundCloud URL en embed
  const getSoundCloudEmbedUrl = (url: string) => {
    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
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

  // Composant pour rendre un élément audio
  const renderAudioItem = (item: AudioItem, index: number) => (
    <Card 
      key={index} 
      className="group overflow-hidden hover:shadow-card transition-all duration-300 bg-background/80 backdrop-blur-sm border-primary/10"
    >
      <div className="p-6">
        {/* Image du témoignage si disponible */}
        {item.image && (
          <div className="mb-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
        
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
            <Volume2 className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h4 className="font-script text-lg font-semibold text-foreground mb-1">{item.title}</h4>
            <p className="font-sans text-sm text-muted-foreground mb-2">{item.description}</p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{item.duration}</span>
              </span>
              <span>{item.date}</span>
            </div>
          </div>
        </div>
        
        {/* SoundCloud Player */}
        <div className="mt-4">
          <iframe
            width="100%"
            height="166"
            src={getSoundCloudEmbedUrl(item.audioUrl)}
            allow="autoplay"
            title={item.title}
            className="rounded-lg"
          ></iframe>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-4">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
          <span className="text-xs text-muted-foreground">Audio • MP3</span>
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
                Médias
              </span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Découvrez les moments forts de notre ministère à travers ces images, vidéos et audios inspirants
            </p>
          </div>

          {/* Filter Buttons - Supprimés car sections séparées */}

          {/* Gallery Grid - Supprimée pour séparer en sections */}
          
          {/* Section Photos */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="font-script text-3xl md:text-4xl font-bold text-primary mb-4">
                Nos Photos
              </h3>
              <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
              <p className="font-sans text-muted-foreground max-w-xl mx-auto">
                Découvrez les moments forts de notre ministère en images
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryImages.map((item, index) => renderImageItem(item, index))}
            </div>
          </div>

          {/* Section Vidéos */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="font-script text-3xl md:text-4xl font-bold text-primary mb-4">
                Nos Vidéos
              </h3>
              <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
              <p className="font-sans text-muted-foreground max-w-xl mx-auto">
                Regardez les prédications et témoignages inspirants
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryVideos.map((item, index) => renderVideoItem(item, index))}
            </div>
          </div>

          {/* Audio Section - Toujours visible */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="font-script text-3xl md:text-4xl font-bold text-primary mb-4">
                Nos Audios
              </h3>
              <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
              <p className="font-sans text-muted-foreground max-w-xl mx-auto">
                Écoutez les enseignements et prédications de Maman ZIAHOU
              </p>
            </div>
            
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {galleryAudios.map((item, index) => renderAudioItem(item, index))}
            </div>
          </div>

          {/* Section Témoignages Audios */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="font-script text-3xl md:text-4xl font-bold text-primary mb-4">
                Témoignages
              </h3>
              <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
              <p className="font-sans text-muted-foreground max-w-xl mx-auto">
                Écoutez les témoignages touchants de transformation de vies par la grâce de Dieu
              </p>
            </div>
            
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {testimonialAudios.map((item, index) => renderAudioItem(item, index))}
            </div>
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
                        src={getYouTubeEmbedUrl((selectedItem as VideoItem).videoUrl)}
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