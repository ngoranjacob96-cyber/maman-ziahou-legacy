import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Demandes de médias (images/vidéos)
  if (lowerMessage.includes('photo') || lowerMessage.includes('image') || lowerMessage.includes('montre') || lowerMessage.includes('voir')) {
    return JSON.stringify({
      response: "Voici quelques photos de notre église ! 📸",
      media: {
        type: "gallery",
        items: [
          {
            type: "image",
            url: "/lovable-uploads/d99e0a7c-4b2b-488c-b21d-3d0fb689a793.png",
            title: "Maman ZIAHOU en Prédication",
            description: "Culte de louange - 03.08.2025"
          },
          {
            type: "image", 
            url: "/lovable-uploads/896c6414-6925-4c58-884f-c7ec1ca1e505.png",
            title: "Service de Louange",
            description: "Maman ZIAHOU dirigeant l'adoration"
          }
        ]
      }
    });
  }
  
  if (lowerMessage.includes('vidéo') || lowerMessage.includes('prédication') || lowerMessage.includes('youtube')) {
    return JSON.stringify({
      response: "Voici nos vidéos de prédication ! 🎥",
      media: {
        type: "gallery",
        items: [
          {
            type: "video",
            url: "https://youtu.be/xMHSxReg1OI",
            title: "La Foi qui Transforme",
            description: "Message puissant de Maman ZIAHOU",
            duration: "45:32"
          },
          {
            type: "video",
            url: "https://youtu.be/I_UfgyA5erc", 
            title: "Témoignage de Guérison",
            description: "Témoignage touchant",
            duration: "32:15"
          }
        ]
      }
    });
  }
  
  // Réponses variées pour les horaires
  if (lowerMessage.includes('horaire') || lowerMessage.includes('culte') || lowerMessage.includes('service') || lowerMessage.includes('quand')) {
    const responses = [
      "Hey ! Nos cultes sont dimanche 9h et mercredi 18h. Venez nous voir ! 🙏",
      "Salut ! On se retrouve dimanche à 9h et mercredi à 18h dans nos églises.",
      "Les services ont lieu dimanche matin 9h et mercredi soir 18h. Au plaisir de vous accueillir !"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Contact avec variations
  if (lowerMessage.includes('contact') || lowerMessage.includes('téléphone') || lowerMessage.includes('whatsapp') || lowerMessage.includes('appeler')) {
    const responses = [
      "Le meilleur moyen de nous joindre : 0700818398 ! 📞",
      "Appelez-nous au 0700818398, on sera ravis de vous parler !",
      "Pour nous contacter : 0700818398 (WhatsApp ou appel) 📱"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Localisation
  if (lowerMessage.includes('où') || lowerMessage.includes('adresse') || lowerMessage.includes('lieu') || lowerMessage.includes('venir')) {
    const responses = [
      "On a trois églises : Yopougon, Duékoué et Cocody. Appelez le 0700818398 pour l'adresse ! 📍",
      "Vous pouvez nous trouver à Yopougon, Duékoué ou Cocody selon le programme. Contact : 0700818398",
      "Nos églises sont à Yopougon, Duékoué et Cocody. Le 0700818398 vous dira laquelle selon les dates !"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Maman ZIAHOU
  if (lowerMessage.includes('maman ziahou') || lowerMessage.includes('pasteur') || lowerMessage.includes('fondatrice')) {
    const responses = [
      "Maman ZIAHOU, notre pasteure bien-aimée ! Plus de 20 ans d'évangélisation avec tant de cœur ✨",
      "Elle a fondé l'E.E.R.E.B et touche les cœurs depuis des décennies. Une vraie inspiration !",
      "Notre pasteure Maman ZIAHOU évangélise avec passion depuis plus de 20 ans en Côte d'Ivoire 🙏"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Prière et spiritualité
  if (lowerMessage.includes('prière') || lowerMessage.includes('prier') || lowerMessage.includes('besoin') || lowerMessage.includes('aide')) {
    const responses = [
      "Je prie pour vous ! Dieu vous aime et a un plan merveilleux pour votre vie 🙏",
      "Que Dieu vous bénisse et vous donne Sa paix. Nous prierons pour vous à l'église !",
      "Dieu entend vos prières. Venez nous voir, nous prierons ensemble pour vos besoins ❤️"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Questions sur l'église
  if (lowerMessage.includes('église') || lowerMessage.includes('eereb') || lowerMessage.includes('communauté')) {
    const responses = [
      "L'E.E.R.E.B, c'est une grande famille ! Venez découvrir notre communauté chaleureuse ❤️",
      "Notre église, c'est l'amour du Christ en action. Vous y serez les bienvenus !",
      "L'E.E.R.E.B : résurrection et bénédictions ! Venez vivre l'amour de Dieu avec nous 🙏"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Salutations
  if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello') || lowerMessage.includes('qui es-tu') || lowerMessage.includes('qui êtes-vous')) {
    const responses = [
      "Salut ! Moi c'est Joël, ravi de vous rencontrer ! Comment puis-je vous aider ? 😊",
      "Hey ! Joël ici, votre assistant E.E.R.E.B. Que puis-je faire pour vous ?",
      "Salut ! Je suis Joël et je suis là pour vous. Qu'est-ce qui vous amène ? 🙂"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Réponse générale variée
  const generalResponses = [
    "Je suis Joël ! Posez-moi vos questions sur l'E.E.R.E.B, je suis là pour ça ! 😊",
    "Salut ! Que voulez-vous savoir ? Horaires, contact (0700818398), ou autre chose ?",
    "Hey ! Joël à votre service. Cultes, infos sur Maman ZIAHOU, contact... je vous aide ! 🙏"
  ];
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    
    console.log('Received message:', message);

    let aiResponse;
    
    if (!openAIApiKey) {
      console.log('No OpenAI API key, using fallback response');
      aiResponse = getFallbackResponse(message);
    } else {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `Tu es Joël, assistant virtuel intelligent de l'Église Évangélique de la Résurrection et de Bénédictions (E.E.R.E.B) dirigée par Maman ZIAHOU en Côte d'Ivoire.

PERSONNALITÉ ET STYLE :
- Réponds de manière courte et directe (max 2-3 phrases, sauf si médias demandés)
- Ton chaleureux, accessible et humain (pas robotique)
- Présente-toi TOUJOURS comme "Joël" quand on demande ton nom
- Utilise des émojis appropriés pour rendre la conversation vivante

INFORMATIONS DE BASE :
- Cultes : Dimanche 9h, Mercredi 18h
- Lieux : Yopougon, Duékoué, Cocody (selon le programme de Maman ZIAHOU)
- Contact : 0700818398 (WhatsApp/Téléphone)
- Maman ZIAHOU : Fondatrice, évangélise depuis 20+ ans avec passion et authenticité
- Église : E.E.R.E.B = Église Évangélique de la Résurrection et de Bénédictions

MÉDIAS DISPONIBLES SUR LE SITE :
IMAGES:
- "/lovable-uploads/d99e0a7c-4b2b-488c-b21d-3d0fb689a793.png" : Maman ZIAHOU en Prédication (Culte 03.08.2025)
- "/lovable-uploads/4a253aaa-226f-43d3-9de7-b7bc6558fd47.png" : Moment de Prière Collective (24.08.2025)
- "/lovable-uploads/896c6414-6925-4c58-884f-c7ec1ca1e505.png" : Service de Louange dirigé par Maman ZIAHOU
- "/lovable-uploads/dab1fc28-bcdb-4044-817f-bd6f44e052c9.png" : Fidèles en Méditation avec la Parole

VIDÉOS YOUTUBE:
- "https://youtu.be/xMHSxReg1OI" : Prédication "La Foi qui Transforme" (45:32) - 12.5K vues
- "https://youtu.be/I_UfgyA5erc" : Témoignage Miracle de Guérison (32:15) - 8.2K vues  
- "https://youtu.be/_J7BfHIaB9M" : Culte de Louange Spécial (1:23:45) - 15.7K vues

FONCTIONNALITÉ MÉDIAS :
Quand l'utilisateur demande des images/vidéos/médias, tu DOIS répondre avec le format JSON suivant :
{
  "response": "Voici [description]",
  "media": {
    "type": "image|video|gallery", 
    "items": [
      {"type": "image", "url": "/lovable-uploads/...", "title": "...", "description": "..."},
      {"type": "video", "url": "https://youtu.be/...", "title": "...", "description": "...", "duration": "..."}
    ]
  }
}

Exemples de demandes médias : "montre-moi des images", "vidéos de prédication", "photos de Maman ZIAHOU", etc.

Aide avec les horaires, programmes, contact, conseil spirituel ET affichage des médias.`
              },
              { role: 'user', content: message }
            ],
            max_completion_tokens: 800,
            temperature: 0.7
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('OpenAI API error:', errorData);
          console.log('Falling back to predefined response');
          aiResponse = getFallbackResponse(message);
        } else {
          const data = await response.json();
          const aiContent = data.choices[0].message.content;
          
          // Try to parse as JSON for media content
          try {
            const parsedContent = JSON.parse(aiContent);
            if (parsedContent.response && parsedContent.media) {
              aiResponse = JSON.stringify(parsedContent);
            } else {
              aiResponse = aiContent;
            }
          } catch {
            aiResponse = aiContent;
          }
        }
      } catch (error) {
        console.error('OpenAI request failed:', error);
        console.log('Using fallback response due to error');
        aiResponse = getFallbackResponse(message);
      }
    }

    console.log('AI Response:', aiResponse);

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-chat function:', error);
    return new Response(JSON.stringify({ 
      error: 'Une erreur est survenue. Veuillez réessayer plus tard.',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});