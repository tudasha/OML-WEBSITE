import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Mic, Music, MessageCircle, Gift, Pizza, Users, Heart, AlertCircle } from "lucide-react";
import Layout from "@/components/Layout";
import heroConcert from "@/assets/hero-concert.png";

// Configuratie eveniment - usor de editat
const eventConfig = {
  title: "Calin Pop & Marius Pop",
  subtitle: "Celelalte Cuvinte",
  date: "In curand",
  time: "19:00",
  location: "Oradea (locatia va fi anuntata)",
  registrationOpen: false,
};

const Event = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroConcert})` }}
        />
        <div className="absolute inset-0 bg-hero-bg/90" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30 mb-6">
            Urmatorul eveniment
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            {eventConfig.title}
          </h1>
          <p className="text-xl md:text-2xl text-primary font-medium mb-6">
            {eventConfig.subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/70">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              {eventConfig.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              {eventConfig.time}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {eventConfig.location}
            </span>
          </div>
        </div>
      </section>

      {/* Despre eveniment */}
      <section className="py-16 md:py-24 section-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Despre aceasta editie
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed text-left md:text-center">
              <p>
                Ne bucuram sa-i avem ca invitati speciali pe{" "}
                <strong className="text-foreground">Calin Pop</strong> si{" "}
                <strong className="text-foreground">Marius Pop</strong>, membri ai 
                legendarei trupe <strong className="text-foreground">Celelalte Cuvinte</strong>.
              </p>
              <p>
                Acestia vor sustine un concert live, vor impartasi din experienta 
                lor de peste 30 de ani in industria muzicala si vor oferi feedback 
                constructiv tinerilor care vor urca pe scena.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Structura serii */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
            Structura serii
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Music,
                title: "Concert Live",
                description: "Calin Pop & Marius Pop vor deschide seara cu un concert memorabil.",
                time: "Prima parte",
              },
              {
                icon: MessageCircle,
                title: "Discutie & Q&A",
                description: "Sesiune de intrebari si raspunsuri despre cariera si industrie.",
                time: "A doua parte",
              },
              {
                icon: Mic,
                title: "Open Mic",
                description: "Scena Tinerilor - ocazia ta de a canta live si a primi feedback.",
                time: "A treia parte",
              },
            ].map((item, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-xs text-primary font-medium uppercase tracking-wider">
                    {item.time}
                  </span>
                  <h3 className="text-xl font-display font-semibold text-foreground mt-2 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 md:py-24 section-cream-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
            Ce sa astepti
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Heart,
                title: "Curaj, nu perfectiune",
                description: "Greselile fac parte din proces.",
              },
              {
                icon: Users,
                title: "Spatiu sigur",
                description: "Atmosfera prietenoasa si sustinatoare.",
              },
              {
                icon: Gift,
                title: "Tombola cu premii",
                description: "Surprize pentru participantii la Open Mic.",
              },
              {
                icon: Pizza,
                title: "Socializare",
                description: "Pizza by Enigma si networking.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-background rounded-xl p-6 text-center shadow-sm">
                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inregistrare Open Mic */}
      <section className="py-16 md:py-24 bg-hero-bg text-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-white/5 border-white/10 backdrop-blur">
            <CardContent className="p-8 md:p-12 text-center">
              <Mic className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Vrei sa urci pe scena?
              </h2>
              
              {eventConfig.registrationOpen ? (
                <>
                  <p className="text-white/70 mb-6">
                    Inscrie-te la Open Mic pentru aceasta editie. 
                    Locurile sunt limitate!
                  </p>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg">
                    Inscrie-te acum
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2 text-primary mb-4">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Inscrierile pentru aceasta editie s-au incheiat</span>
                  </div>
                  <p className="text-white/70 mb-6">
                    Urmareste-ne pe Instagram pentru a afla cand se deschid 
                    inscrierile pentru urmatoarea editie!
                  </p>
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg">
                    <Link to="/contact">Contacteaza-ne pentru mai multe informatii</Link>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Event;
