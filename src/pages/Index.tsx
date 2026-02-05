import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MessageCircle, Star, Users, Trophy, Heart, Music, Lightbulb, Calendar, MapPin, Volume2, VolumeX } from "lucide-react";
import Layout from "@/components/Layout";
import InstagramFeed from "@/components/InstagramFeed";
import ScrollReveal from "@/components/ScrollReveal";
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
const Index = () => {
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
    const initPlayer = () => {
      if (containerRef.current && window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId: 'BWAjcbLuk3A',
          playerVars: {
            autoplay: 1,
            mute: 1,
            loop: 1,
            playlist: 'BWAjcbLuk3A',
            controls: 0,
            showinfo: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1
          },
          events: {
            onReady: (event: any) => {
              event.target.playVideo();
            }
          }
        });
      }
    };
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy?.();
      }
    };
  }, []);
  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute?.();
      } else {
        playerRef.current.mute?.();
      }
      setIsMuted(!isMuted);
    }
  };
  return <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full bg-hero-bg">
          <div ref={containerRef} className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2" />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
        
        {/* Mute/Unmute Toggle */}
        <button onClick={toggleMute} className="absolute bottom-24 right-6 z-20 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors" aria-label={isMuted ? "Unmute video" : "Mute video"}>
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30">
              Comunitatea muzicală din Oradea
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
              Un spațiu sigur unde tinerii își pot exprima{" "}
              <span className="text-primary">​talentul</span>
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
              <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider">
                Descoperă
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Ce este Oradea Music Lab?
              </h2>
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

      {/* Cum funcționează Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-3">
                Structura evenimentului
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Cum funcționează?
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            title: "Socializare",
            description: "Moment de conectare și networking între participanți.",
            number: "04"
          }].map((item, index) => <ScrollReveal key={index} delay={index * 100}>
                <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <CardContent className="p-6 pt-8">
                    <div className="absolute top-4 right-4 text-4xl font-display font-bold text-primary/10">
                      {item.number}
                    </div>
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>)}
          </div>
        </div>
      </section>

      {/* De ce suntem diferiți Section */}
      <section className="py-20 md:py-28 section-cream-dark">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-3">
                Filozofia noastră
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                De ce suntem diferiți?
              </h2>
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
                <div className="flex items-start gap-4 p-5 bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
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
                        <span className="text-2xl font-display font-bold text-primary">7</span>
                        <span className="text-xs text-white/60">Februarie</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                        Următorul eveniment
                      </span>
                      <h3 className="text-2xl md:text-3xl font-display font-bold">
                        Călin Pop &amp; Marius Pop
                      </h3>
                      <p className="text-white/70">
                        Membrii trupei Celelalte Cuvinte vor fi invitații speciali ai 
                        următoarei ediții Oradea Music Lab.
                      </p>
                      <div className="flex items-center gap-4 text-sm text-white/60 pt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> Oradea
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