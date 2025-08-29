import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQSection = () => {
  const faqs = [
    {
      question: "Quels sont les horaires des cultes à l'E.E.R.E.B ?",
      answer: "Nos cultes ont lieu le dimanche à 8h et 17h, le mercredi à 18h et le vendredi à 19h. Tous nos services incluent des moments de louange et adoration avec Maman ZIAHOU."
    },
    {
      question: "Comment puis-je rejoindre l'Église évangélique E.E.R.E.B en Côte d'Ivoire ?",
      answer: "Vous pouvez nous rejoindre en assistant à nos cultes à Abidjan ou en nous contactant au 07 00 81 83 98. Nous accueillons toutes les personnes désireuses de découvrir le ministère chrétien."
    },
    {
      question: "Y a-t-il des formations bibliques disponibles ?",
      answer: "Oui, nous proposons des formations bibliques régulières dirigées par Maman ZIAHOU et son équipe. Ces sessions de formation biblique Côte d'Ivoire sont ouvertes à tous les niveaux."
    },
    {
      question: "Puis-je suivre les cultes en ligne ?",
      answer: "Oui, nous diffusions nos cultes en direct sur nos plateformes. Vous pouvez suivre notre Église en ligne Afrique et participer à nos moments de louange et adoration à distance."
    },
    {
      question: "Comment demander une prière à Maman ZIAHOU ?",
      answer: "Vous pouvez demander une prière en nous contactant directement, en remplissant notre formulaire de contact ou en participant à nos services de prière. Maman ZIAHOU et l'équipe prient régulièrement pour les demandes reçues."
    },
    {
      question: "Quelles sont les œuvres sociales de l'E.E.R.E.B ?",
      answer: "Notre ministère chrétien Abidjan s'engage dans l'aide aux familles nécessiteuses, l'assistance aux orphelins et diverses actions communautaires. Plus de 200 familles ont été aidées à ce jour."
    },
    {
      question: "Comment puis-je participer à l'évangélisation en Côte d'Ivoire ?",
      answer: "Nous organisons régulièrement des campagnes d'évangélisation Côte d'Ivoire. Vous pouvez vous former comme leader dans notre église et participer activement à l'expansion du Royaume de Dieu."
    },
    {
      question: "Y a-t-il des événements spéciaux organisés par l'église ?",
      answer: "Oui, nous organisons des conférences, croisades et programmes spéciaux chaque mois. Ces événements incluent des moments de louange et adoration exceptionnels avec des invités spéciaux."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-script text-4xl md:text-6xl font-bold text-foreground mb-4">
              Questions{' '}
              <span className="text-primary font-bold text-shadow-lg bg-white/90 px-2 py-1 rounded">
                Fréquentes
              </span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Trouvez les réponses aux questions les plus courantes sur notre église évangélique et le ministère de Maman ZIAHOU
            </p>
          </div>

          {/* FAQ Accordion */}
          <Card className="bg-background/80 backdrop-blur-sm border-primary/20 shadow-card">
            <CardHeader>
              <CardTitle className="font-script text-2xl text-primary text-center">
                Tout ce que vous devez savoir sur l'E.E.R.E.B
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-sans font-semibold text-foreground hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
              <h3 className="font-script text-2xl text-primary mb-4">
                Vous avez d'autres questions ?
              </h3>
              <p className="font-sans text-foreground mb-6">
                N'hésitez pas à nous contacter pour plus d'informations sur notre église évangélique en Côte d'Ivoire
              </p>
              <a 
                href="#contact" 
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-glow transition-colors font-sans"
              >
                Nous Contacter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;