import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WarningBanner from '@/components/WarningBanner';

const MentionsLegales = () => {
  return (
    <main className="min-h-screen">
      <WarningBanner />
      <Navigation />
      <div className="pt-24 pb-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-12 text-primary">
            Mentions Légales
          </h1>
          
          <div className="bg-card rounded-lg shadow-soft p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">1. Éditeur du site</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Le site eereb-ci.org est édité par :</p>
                <p><strong>Église Évangélique de la Résurrection et de Bénédictions (E.E.R.E.B)</strong></p>
                <p>Adresse : Abidjan, Côte d'Ivoire</p>
                <p>Téléphone : +225 07 00 81 83 98</p>
                <p>Email : contact@eereb-ci.org</p>
                <p>Responsable de la publication : Maman ZIAHOU, Leader spirituelle et fondatrice.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">2. Hébergement</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Le site est hébergé par :</p>
                <p><strong>Lovable</strong></p>
                <p>Plateforme de développement web</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">3. Propriété intellectuelle</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Le contenu du site (textes, images, vidéos, audios, graphismes, logo) est la propriété exclusive de l'Église Évangélique de la Résurrection et de Bénédictions (E.E.R.E.B) ou de ses partenaires.</p>
                <p>Toute reproduction, distribution, modification, adaptation ou publication, même partielle, est strictement interdite sans autorisation écrite préalable.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">4. Finalité du site</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Le site eereb-ci.org a pour objectifs :</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Informer sur les activités et les cultes de l'E.E.R.E.B</li>
                  <li>Partager les enseignements et ressources spirituelles (articles, vidéos, audios)</li>
                  <li>Offrir un espace pour demander des prières et partager des témoignages</li>
                  <li>Faciliter la communication entre les membres et les responsables de l'église</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">5. Données personnelles</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Les informations collectées via les formulaires (contact, demandes de prière, témoignages) sont utilisées uniquement dans le cadre du ministère (réponses, suivi spirituel).</p>
                <p>Vos données sont confidentielles et ne seront jamais partagées ou vendues à des tiers.</p>
                <p>Conformément à la loi ivoirienne relative à la protection des données personnelles, vous disposez d'un droit d'accès, de rectification ou de suppression de vos données en nous contactant à :</p>
                <p>Email : contact@eereb-ci.org</p>
                <p>Téléphone : +225 07 00 81 83 98</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">6. Cookies</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Le site peut utiliser des cookies afin d'améliorer l'expérience utilisateur et d'analyser la fréquentation. Vous pouvez les désactiver à tout moment via les paramètres de votre navigateur.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">7. Limitation de responsabilité</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>L'Église E.E.R.E.B s'efforce d'assurer l'exactitude et la mise à jour des informations publiées sur ce site. Cependant, elle ne saurait être tenue responsable des erreurs, omissions ou de toute interruption ou indisponibilité du site.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">8. Contact</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Pour toute question concernant ces mentions légales ou pour exercer vos droits :</p>
                <p><strong>Église Évangélique de la Résurrection et de Bénédictions (E.E.R.E.B)</strong></p>
                <p>Adresse : Abidjan, Côte d'Ivoire</p>
                <p>Téléphone : +225 07 00 81 83 98</p>
                <p>Site : eereb-ci.org</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-primary">9. Droits réservés</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>© 2025 E.E.R.E.B – Maman ZIAHOU. Tous droits réservés.</p>
                <p>Développé avec ❤️ pour la gloire de Dieu.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default MentionsLegales;