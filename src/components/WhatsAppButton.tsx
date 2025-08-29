import React from 'react';
import { Button } from '@/components/ui/button';

const WhatsAppButton = () => {
  const phoneNumber = "2250709876543"; // Numéro de téléphone au format international (sans le +)
  const message = "Bonjour Maman ZIAHOU, j'aimerais discuter avec vous à propos de votre ministère.";
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 left-6 z-50 rounded-full w-14 h-14 shadow-lg bg-green-500 hover:bg-green-600 text-white p-2"
      size="icon"
      aria-label="Contacter via WhatsApp"
    >
      <img 
        src="/lovable-uploads/82237185-8bac-48d5-92b1-bcf83f0f8dea.png" 
        alt="WhatsApp" 
        className="w-full h-full object-contain"
      />
    </Button>
  );
};

export default WhatsAppButton;