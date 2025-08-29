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
    return "🙏 Les cultes de l'E.E.R.E.B ont lieu:\n• Dimanche à 9h00\n• Mercredi à 18h00\n\nNous nous réunissons dans nos églises à Yopougon, Duékoué et Cocody. Pour connaître le programme de passage de Maman ZIAHOU, contactez-nous au 0700818398.";
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('téléphone') || lowerMessage.includes('whatsapp')) {
    return "📞 Pour nous contacter:\n• Téléphone/WhatsApp: 0700818398\n• Visitez nos églises E.E.R.E.B à Yopougon, Duékoué ou Cocody selon le programme de Maman ZIAHOU\n\nN'hésitez pas à nous appeler pour plus d'informations !";
  }
  
  if (lowerMessage.includes('où') || lowerMessage.includes('adresse') || lowerMessage.includes('lieu')) {
    return "📍 L'E.E.R.E.B est présente dans plusieurs villes:\n• Yopougon\n• Duékoué  \n• Cocody\n\nPour connaître l'adresse exacte et le programme de Maman ZIAHOU, contactez-nous au 0700818398.";
  }
  
  if (lowerMessage.includes('maman ziahou') || lowerMessage.includes('pasteur')) {
    return "✨ Maman ZIAHOU est la fondatrice et dirigeante de l'Église Évangélique de la Résurrection et de Bénédictions (E.E.R.E.B). Depuis plus de deux décennies, elle se consacre à l'évangélisation en Côte d'Ivoire avec un ministère marqué par la compassion et l'authenticité. Pour connaître son programme de passage, contactez le 0700818398.";
  }
  
  if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
    return "🙏 Que la paix du Seigneur soit avec vous ! Bienvenue dans la famille E.E.R.E.B. Je suis ici pour vous aider avec des informations sur notre église, nos horaires de culte, et comment contacter Maman ZIAHOU. Comment puis-je vous aider aujourd'hui ?";
  }
  
  return "🙏 Bienvenue à l'E.E.R.E.B ! Je suis là pour vous renseigner sur:\n• Les horaires de culte (Dimanche 9h, Mercredi 18h)\n• Les informations de contact (0700818398)\n• Le programme de Maman ZIAHOU\n• Nos différentes églises (Yopougon, Duékoué, Cocody)\n\nComment puis-je vous aider ?";
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
                content: `Tu es un assistant virtuel pour l'Église Évangélique de la Résurrection et de Bénédictions (E.E.R.E.B) dirigée par Maman ZIAHOU en Côte d'Ivoire. Tu aides les visiteurs à :
                - Connaître les horaires des cultes et services
                - Obtenir des informations sur les programmes de l'église
                - Comprendre la vision et mission de l'église
                - Recevoir des conseils spirituels basés sur la Bible
                - Obtenir des informations de contact
                
                Réponds toujours avec compassion, sagesse biblique et dans un esprit chrétien. Les cultes ont lieu les dimanches à 9h et les mercredis à 18h. L'église est située à Abidjan, Côte d'Ivoire.`
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