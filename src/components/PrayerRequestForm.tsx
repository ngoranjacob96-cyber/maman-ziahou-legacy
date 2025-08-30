import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { useToast } from './ui/use-toast';
import { Heart, Send, Loader2 } from 'lucide-react';

const prayerRequestSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().optional(),
  prayer_subject: z.string().min(3, 'Le sujet doit contenir au moins 3 caractères'),
  prayer_request: z.string().min(10, 'La demande doit contenir au moins 10 caractères'),
  is_urgent: z.boolean().default(false)
});

type PrayerRequestForm = z.infer<typeof prayerRequestSchema>;

export default function PrayerRequestForm() {
  const { toast } = useToast();
  const form = useForm<PrayerRequestForm>({
    resolver: zodResolver(prayerRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      prayer_subject: '',
      prayer_request: '',
      is_urgent: false
    }
  });

  const onSubmit = async (data: PrayerRequestForm) => {
    try {
      // Ensure all required fields are present
      const prayerData = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        prayer_subject: data.prayer_subject,
        prayer_request: data.prayer_request,
        is_urgent: data.is_urgent
      };

      const { error } = await supabase
        .from('prayer_requests')
        .insert([prayerData]);

      if (error) {
        console.error('Error submitting prayer request:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        toast({
          title: "Erreur",
          description: `Une erreur est survenue: ${error.message || 'Veuillez réessayer'}`,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Demande envoyée",
        description: "Votre demande de prière a été envoyée avec succès. Nous prierons pour vous.",
      });

      form.reset();
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <section id="demande-priere" className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 font-sans">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              Demande de Prière
            </span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Partagez votre besoin de prière avec notre communauté. Nous nous engageons à prier pour vous avec amour et compassion.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-primary/10 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold">Formulaire de Demande de Prière</h3>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom complet *</label>
                  <Input
                    {...form.register("name")}
                    placeholder="Votre nom complet"
                    className="border-primary/20 focus:border-primary"
                  />
                  {form.formState.errors.name && (
                    <p className="text-destructive text-xs">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <Input
                    type="email"
                    {...form.register("email")}
                    placeholder="votre.email@exemple.com"
                    className="border-primary/20 focus:border-primary"
                  />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-xs">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Téléphone (optionnel)</label>
                <Input
                  {...form.register("phone")}
                  placeholder="Votre numéro de téléphone"
                  className="border-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sujet de la prière *</label>
                <Input
                  {...form.register("prayer_subject")}
                  placeholder="Ex: Guérison, Famille, Travail, etc."
                  className="border-primary/20 focus:border-primary"
                />
                {form.formState.errors.prayer_subject && (
                  <p className="text-destructive text-xs">
                    {form.formState.errors.prayer_subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Votre demande de prière *</label>
                <Textarea
                  rows={5}
                  {...form.register("prayer_request")}
                  placeholder="Décrivez votre situation et ce pour quoi vous aimeriez que nous priions..."
                  className="border-primary/20 focus:border-primary resize-none"
                />
                {form.formState.errors.prayer_request && (
                  <p className="text-destructive text-xs">
                    {form.formState.errors.prayer_request.message}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_urgent"
                  checked={form.watch("is_urgent")}
                  onCheckedChange={(checked) => form.setValue("is_urgent", !!checked)}
                />
                <label htmlFor="is_urgent" className="text-sm font-medium cursor-pointer">
                  Cette demande est urgente
                </label>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Envoyer ma Demande de Prière
                    </div>
                  )}
                </Button>
              </div>

              <div className="text-center text-xs text-muted-foreground bg-muted/20 p-3 rounded-lg">
                <p>🙏 Vos informations sont confidentielles et ne seront utilisées que pour prier pour vous.</p>
                <p>Notre équipe pastorale priera pour votre demande dans les plus brefs délais.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}