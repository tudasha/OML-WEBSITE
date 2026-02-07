import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Music, Users, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import donateHeroImage from "@/assets/donate-hero.jpg";
const STRIPE_DONATION_LINK = "https://donate.stripe.com/4gMdR2esj3js2SD8BO6oo00";
const reasons = [{
  icon: Music,
  title: "Susții Muzica Locală",
  description: "Donația ta ajută la organizarea evenimentelor muzicale gratuite pentru tineri din Oradea."
}, {
  icon: Users,
  title: "Construiești Comunitate",
  description: "Contribui la crearea unui spațiu sigur unde tinerii pot explora și dezvolta talentul muzical."
}, {
  icon: Heart,
  title: "Investești în Viitor",
  description: "Sprijini următoarea generație de artiști locali și le oferi oportunitatea să crească."
}];
const Donate = () => {
  return <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${donateHeroImage})`
      }} />
        <div className="absolute inset-0 bg-hero-overlay/80" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30 mb-6">Susține-ne!</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
            Donează pentru Muzică
          </h1>
          <p className="text-lg text-white/70 mt-4 max-w-xl mx-auto">Fiecare contribuție ne ajută să continuăm să oferim experiențe muzicale de calitate pentru tineri.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 section-cream">
        <div className="container mx-auto px-4">
          {/* Why Donate */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              De ce să donezi?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reasons.map((reason, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.1
            }} viewport={{
              once: true
            }}>
                  <Card className="p-6 h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <reason.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-semibold mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {reason.description}
                    </p>
                  </Card>
                </motion.div>)}
            </div>
          </div>

          {/* Where Money Goes */}
          <div className="max-w-3xl mx-auto mb-16">
            <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-primary/5 to-transparent">
              <h2 className="text-2xl font-display font-bold mb-6 text-center">
                Unde se duc donațiile?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-foreground/80">
                    <strong>Costuri de sonorizare</strong> - microfoane, boxe, mixere pentru evenimente de calitate
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-foreground/80">
                    <strong>Închiriere spații</strong> - locații pentru open mic-uri și concerte
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-foreground/80">
                    <strong>Materiale promoționale</strong> - afișe, flyer-uri, bannere pentru promovarea evenimentelor
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-foreground/80">
                    <strong>Dezvoltare platformă</strong> - menținerea site-ului și instrumentelor digitale
                  </span>
                </li>
              </ul>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all">
              <a href={STRIPE_DONATION_LINK} target="_blank" rel="noopener noreferrer">
                <Heart className="w-5 h-5 mr-2" />
                Donează Acum
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <p className="text-muted-foreground text-sm mt-4">
              Vei fi redirecționat către pagina securizată Stripe pentru procesarea donației.
            </p>
          </div>
        </div>
      </section>
    </Layout>;
};
export default Donate;