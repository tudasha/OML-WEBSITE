import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  Mic,
  Music,
  MessageCircle,
  Gift,
  Pizza,
  Users,
  Heart,
  AlertCircle,
} from "lucide-react";
import Layout from "@/components/Layout";
import heroConcert from "@/assets/hero-concert.png";

// Configurație eveniment - ușor de editat
const eventConfig = {
  title: "Călin Pop & Marius Pop",
  subtitle: "Celelalte Cuvinte",
  date: "7 Februarie",
  time: "19:00",
  location: "Lokal, Oradea",
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
            Următorul eveniment
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            {eventConfig.title}
          </h1>
          <p className="text-xl md:text-2xl text-primary font-medium mb-6">{eventConfig.subtitle}</p>
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
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Despre această ediție</h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed text-left md:text-center">
              <p>
                Ne bucurăm să-i avem ca invitați speciali pe <strong className="text-foreground">Călin Pop</strong> și{" "}
                <strong className="text-foreground">Marius Pop</strong>, membri ai legendarei trupe{" "}
                <strong className="text-foreground">Celelalte Cuvinte</strong>.
              </p>
              <p>
                Aceștia vor susține un concert live, vor împărtăși din experiența lor de peste 30 de ani în industria
                muzicală și vor oferi feedback constructiv tinerilor care vor urca pe scenă.
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
                description: "Călin Pop & Marius Pop vor deschide seara cu un concert memorabil.",
                time: "Prima parte",
              },
              {
                icon: MessageCircle,
                title: "Discuție & Q&A",
                description: "Sesiune de întrebări și răspunsuri despre carieră și industrie.",
                time: "A doua parte",
              },
              {
                icon: Mic,
                title: "Open Mic",
                description: "Scena Tinerilor - ocazia ta de a cânta live și a primi feedback.",
                time: "A treia parte",
              },
            ].map((item, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-xs text-primary font-medium uppercase tracking-wider">{item.time}</span>
                  <h3 className="text-xl font-display font-semibold text-foreground mt-2 mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
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
            Ce să aștepți
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Heart,
                title: "Curaj, nu perfecțiune",
                description: "Greșelile fac parte din proces.",
              },
              {
                icon: Users,
                title: "Spațiu sigur",
                description: "Atmosferă prietenoasă și susținătoare.",
              },
              {
                icon: Gift,
                title: "Tombolă cu premii",
                description: "Surprize pentru participanții la Open Mic.",
              },
              {
                icon: Pizza,
                title: "Socializare",
                description: "Pizza by Enigma și networking.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-background rounded-xl p-6 text-center shadow-sm">
                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Înregistrare Open Mic */}
      <section className="py-16 md:py-24 bg-hero-bg text-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-white/5 border-white/10 backdrop-blur">
            <CardContent className="p-8 md:p-12 text-center">
              <Mic className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-white">Vrei să urci pe scenă?</h2>

              {eventConfig.registrationOpen ? (
                <>
                  <p className="text-white/70 mb-6">
                    Înscrie-te la Open Mic pentru această ediție. Locurile sunt limitate!
                  </p>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg">
                    Înscrie-te acum
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-white/70 mb-4">
                    Datorită cererii foarte mari, am creat o listă de așteptare pentru OML IV (Aprilie 2026).
                  </p>
                  <p className="text-white/70 mb-6">
                    Selecția va prioritiza participanții noi care nu au urcat încă pe scenă.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg"
                  >
                    <a 
                      href="https://docs.google.com/forms/d/e/1FAIpQLSc2dQK9WWPGhEE5kFGl6MxZulO9hrV_CCW9ryBELST4ZFd5Fg/viewform" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Înscrie-te pe lista de așteptare
                    </a>
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
