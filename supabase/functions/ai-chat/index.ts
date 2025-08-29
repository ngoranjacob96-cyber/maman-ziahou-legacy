import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('horaire') || lowerMessage.includes('culte') || lowerMessage.includes('service')) {
    return "Salut ! Les cultes ont lieu dimanche à 9h et mercredi à 18h. On se retrouve à Yopougon, Duékoué ou Cocody. Appelez le 0700818398 pour savoir où sera Maman ZIAHOU ! 🙏";
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('téléphone') || lowerMessage.includes('whatsapp')) {
    return "Vous pouvez nous joindre au 0700818398 par téléphone ou WhatsApp. C'est le meilleur moyen de nous contacter ! 📞";
  }
  
  if (lowerMessage.includes('où') || lowerMessage.includes('adresse') || lowerMessage.includes('lieu')) {
    return "Nous avons des églises à Yopougon, Duékoué et Cocody. Appelez le 0700818398 pour l'adresse exacte selon le programme de Maman ZIAHOU ! 📍";
  }
  
  if (lowerMessage.includes('maman ziahou') || lowerMessage.includes('pasteur')) {
    return "Maman ZIAHOU est notre pasteure et fondatrice de l'E.E.R.E.B. Elle évangélise en Côte d'Ivoire depuis plus de 20 ans avec beaucoup de compassion. Contactez le 0700818398 pour son programme ! ✨";
  }
  
  if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello') || lowerMessage.includes('qui es-tu') || lowerMessage.includes('qui êtes-vous')) {
    return "Salut ! Moi c'est Joël, je vous aide pour tout ce qui concerne l'E.E.R.E.B. Que voulez-vous savoir ? 😊";
  }
  
  return "Salut ! Je suis Joël, votre assistant pour l'E.E.R.E.B. Je peux vous renseigner sur les cultes, le contact (0700818398), ou Maman ZIAHOU. Que cherchez-vous ? 🙏";
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    
    console.log('Received message:', message);

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

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
                content: `Tu es Joël, assistant virtuel amical de l'Église Évangélique de la Résurrection et de Bénédictions (E.E.R.E.B) dirigée par Maman ZIAHOU en Côte d'Ivoire.

INSTRUCTIONS IMPORTANTES :
- Réponds de manière courte et directe (max 2-3 phrases)
- Sois courtois et parle comme un humain, pas comme un robot
- Utilise un ton chaleureux et accessible
- Présente-toi comme Joël quand on te demande qui tu es

INFORMATIONS CLÉS :
- Cultes : Dimanche 9h, Mercredi 18h
- Lieux : Yopougon, Duékoué, Cocody
- Contact : 0700818398 (WhatsApp/Téléphone)
- Maman ZIAHOU : Fondatrice, évangélise depuis 20+ ans

Aide les visiteurs avec les horaires, programmes, contact et conseils spirituels bibliques.`
              },
              { role: 'user', content: message }
            ],
            max_completion_tokens: 500,
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
          aiResponse = data.choices[0].message.content;
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