import { Link } from "react-router-dom";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MessageCircle, Star, Users, Trophy, Heart, Music, Lightbulb, Calendar, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import InstagramFeed from "@/components/InstagramFeed";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import ProcessStepCard from "@/components/ProcessStepCard";
import { nextEvent, getEventSummary } from "@/data/events";

// Hero video — upload to your own CDN and update this URL after deployment
const HERO_VIDEO_URL = "/hero_1_compressed.mp4";

// Formă organică (blob) flat, fără blur — folosită ca decor de fundal în secțiunea
// "Cum funcționează / De ce suntem diferiți" (Faza 4B). Aceeași formă e refolosită de mai
// multe ori cu transform/culoare diferite, în loc de mai multe path-uri desenate separat.
const BLOB_PATH =
  "M54.2,-58.3C68.7,-49.5,78.2,-32.1,80.7,-14.1C83.2,3.9,78.7,22.6,68.5,37.6C58.3,52.6,42.4,64,24.7,70.4C7,76.8,-12.5,78.3,-29.8,72.4C-47.1,66.6,-62.2,53.4,-70.7,37C-79.2,20.6,-81.1,1,-76.8,-16.8C-72.5,-34.6,-62,-50.6,-47.7,-59.3C-33.4,-68,-16.7,-69.4,0.9,-70.6C18.5,-71.8,39.7,-67.1,54.2,-58.3Z";

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full bg-hero-bg">
          <video
            ref={videoRef}
            className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
            src={HERO_VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30">Comunitatea muzicală din Oradea</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
              Un spațiu sigur în care fiecare tânăr este{" "}
              <span className="text-primary">o vedetă</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Învață din greșeli, primește sfaturi de la artiști cu experiență și 
              descoperă bucuria de a urca pe scenă într-un mediu susținător.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white text-base px-8 font-semibold shadow-lg">
                <Link to="/eveniment">Vezi următorul eveniment</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-white bg-white/10 text-white hover:bg-white hover:text-foreground text-base px-8 font-semibold">
                <Link to="/contact">Contactează-ne</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </section>

      {/* Ce este OML Section */}
      <section className="py-20 md:py-28 section-cream">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <SectionHeading kicker="Descoperă" title="Ce este Oradea Music Lab?" />
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed text-left md:text-center">
                <p>Oradea Music Lab este un eveniment bilunar care aduce împreună tineri aspiranți muzicieni și artiști consacrați din Oradea, creând o seară educativă și distractivă.</p>
                <p>
                  Nu este un concurs. Accentul cade pe <strong className="text-foreground">curaj</strong>, 
                  {" "}<strong className="text-foreground">învățare</strong> și{" "}
                  <strong className="text-foreground">evoluție</strong>. Greșelile sunt 
                  acceptate ca parte firească a procesului artistic.
                </p>
                <p>
                  Fiecare tânăr care urcă pe scenă este tratat ca o vedetă, cu sunet 
                  profesional și atenție maximă, pentru o experiență reală de concert.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Cum funcționează + De ce suntem diferiți — secțiune unică, fluidă (Faza 4B) */}
      <section className="relative py-20 md:py-28 bg-background overflow-hidden">
        {/* Fundal organic: forme "blob" flat, vectoriale — fără blur/transparență de sticlă
            (client a respins explicit glassmorphism), stil între morfism și ilustrație plată
            (Kurzgesagt). Mișcare lentă, dezactivată automat la prefers-reduced-motion prin
            varianta Tailwind motion-safe:. */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="absolute -top-16 -left-20 w-72 h-72 md:w-96 md:h-96 motion-safe:animate-blob-drift">
            <path className="fill-primary/10" d={BLOB_PATH} transform="translate(100 100)" />
          </svg>
          <svg viewBox="0 0 200 200" className="absolute top-1/3 -right-24 w-64 h-64 md:w-80 md:h-80 motion-safe:animate-blob-drift [animation-delay:-7s]">
            <path className="fill-primary/5" d={BLOB_PATH} transform="translate(100 100) rotate(120)" />
          </svg>
          <svg viewBox="0 0 200 200" className="absolute -bottom-10 left-1/4 w-56 h-56 md:w-72 md:h-72 motion-safe:animate-blob-drift [animation-delay:-14s]">
            <path className="fill-primary/5" d={BLOB_PATH} transform="translate(100 100) rotate(240) scale(-1,1)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <SectionHeading kicker="Structura evenimentului" title="Cum funcționează?" kickerClassName="mb-3" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 md:mb-24">
            {[{
            icon: Mic,
            title: "Concert Live",
            description: "Artiști invitați cu experiență susțin un moment muzical live.",
            number: "01"
          }, {
            icon: MessageCircle,
            title: "Discuție & Întrebări",
            description: "Sesiune interactivă despre carieră, provocări și experiențe.",
            number: "02"
          }, {
            icon: Star,
            title: "Open Mic",
            description: "Scena Tinerilor - spațiu dedicat tinerilor să cânte live.",
            number: "03"
          }, {
            icon: Users,
            title: "Socializare & Pizza",
            description: "Moment de conectare și networking între participanți.",
            number: "04"
          }].map((item, index) => <ScrollReveal key={index} delay={index * 100}>
                <ProcessStepCard icon={item.icon} title={item.title} description={item.description} number={item.number} tone="flat" />
              </ScrollReveal>)}
          </div>

          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <SectionHeading kicker="Filozofia noastră" title="De ce suntem diferiți?" kickerClassName="mb-3" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[{
            icon: Trophy,
            title: "Nu este un concurs",
            description: "Accent pe curaj și evoluție, nu pe perfecțiune."
          }, {
            icon: Star,
            title: "Ești vedeta serii",
            description: "Fiecare participant primește atenție și respect maxim."
          }, {
            icon: Music,
            title: "Scenă profesională",
            description: "Sunet de calitate și experiență reală de concert."
          }, {
            icon: Lightbulb,
            title: "Feedback constructiv",
            description: "Sfaturi practice de la artiști cu experiență."
          }, {
            icon: Heart,
            title: "Public susținător",
            description: "Atmosferă prietenoasă și lipsită de presiune."
          }, {
            icon: Users,
            title: "Comunitate",
            description: "Conexiuni reale între generații de muzicieni."
          }].map((item, index) => <ScrollReveal key={index} delay={index * 80}>
                <ProcessStepCard icon={item.icon} title={item.title} description={item.description} variant="compact" tone="flat" />
              </ScrollReveal>)}
          </div>
        </div>
      </section>

      {/* Preview Următorul Eveniment */}
      <section className="py-20 md:py-28 bg-hero-bg text-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/5 border-white/10 backdrop-blur overflow-hidden">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                    <div className="shrink-0">
                      <div className="w-24 h-24 bg-primary/20 rounded-2xl flex flex-col items-center justify-center border border-primary/30">
                        <span className="text-2xl font-display font-bold text-primary">{nextEvent.day}</span>
                        <span className="text-xs text-white/60">{nextEvent.month}</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                        Următorul eveniment
                      </span>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
                        OML {nextEvent.edition} — cu {nextEvent.guestArtist}
                      </h3>
                      <p className="text-white/70">{getEventSummary(nextEvent)}</p>
                      <div className="flex items-center gap-4 text-sm text-white/60 pt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {nextEvent.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" /> {nextEvent.day} {nextEvent.month}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white w-full md:w-auto">
                        <Link to="/eveniment">Vezi detalii</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />
    </Layout>;
};
export default Index;