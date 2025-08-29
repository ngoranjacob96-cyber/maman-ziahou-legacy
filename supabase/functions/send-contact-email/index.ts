import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log("Contact form submission received:", formData);

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "EEREB <noreply@eereb-ci.org>",
      to: [formData.email],
      subject: "Confirmation de réception de votre message - EEREB",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #8B5CF6;">Merci pour votre message, ${formData.firstName}!</h2>
          <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Récapitulatif de votre message:</h3>
            <p><strong>Nom:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            ${formData.phone ? `<p><strong>Téléphone:</strong> ${formData.phone}</p>` : ""}
            <p><strong>Sujet:</strong> ${formData.subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 10px; border-radius: 4px; margin-top: 5px;">
              ${formData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <p>Que Dieu vous bénisse!</p>
          <p><strong>L'équipe EEREB</strong></p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            Église Évangélique de la Résurrection et de Bénédictions<br>
            Abidjan, Côte d'Ivoire<br>
            Téléphone: 07 00 81 83 98
          </p>
        </div>
      `,
    });

    // Send notification email to church
    const churchEmailResponse = await resend.emails.send({
      from: "Contact EEREB <contact@eereb-ci.org>",
      to: ["contact@eereb-ci.org"],
      subject: `Nouveau message de contact - ${formData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #8B5CF6;">Nouveau message de contact reçu</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Informations du contact:</h3>
            <p><strong>Nom complet:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
            ${formData.phone ? `<p><strong>Téléphone:</strong> <a href="tel:${formData.phone}">${formData.phone}</a></p>` : ""}
            <p><strong>Sujet:</strong> ${formData.subject}</p>
            
            <h4 style="color: #333; margin-bottom: 10px;">Message:</h4>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #8B5CF6;">
              ${formData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Reçu le ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Abidjan' })}
          </p>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { userEmailResponse, churchEmailResponse });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Message envoyé avec succès",
        userEmailId: userEmailResponse.data?.id,
        churchEmailId: churchEmailResponse.data?.id
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Erreur lors de l'envoi du message", 
        details: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);