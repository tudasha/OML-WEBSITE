import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MessageCircle, Star, Users, Trophy, Heart, Music, Lightbulb, Calendar, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import InstagramFeed from "@/components/InstagramFeed";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import ProcessStepCard, { IconBlob } from "@/components/ProcessStepCard";
import EventCountdown from "@/components/EventCountdown";
import { nextEvent, getEventSummary } from "@/data/events";
import { BLOB_PATH } from "@/lib/blob-shape";
import heroPoster from "@/assets/hero-concert.png";

// Hero video — upload to your own CDN and update this URL after deployment
const HERO_VIDEO_URL = "/hero_1_compressed.mp4";

const Index = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // prefers-reduced-motion: nu pornim autoplay pe videoclipul de fundal pentru utilizatorii
  // care au cerut mișcare redusă — rămân doar cu poster-ul static (hero-concert.png).
  // Inițializat direct din matchMedia (nu în useEffect), altfel video-ul apucă să pornească
  // autoplay pentru o clipă înainte să se corecteze — attribute-ul autoPlay din JSX nu oprește
  // un <video> deja pornit.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  // Sticky CTA pe mobil: apare doar după ce utilizatorul a scrolat trecut de Hero.
  const [showStickyCta, setShowStickyCta] = useState(false);

  // Mișcare legată REAL de scroll (nu doar fade-once ca ScrollReveal) pe secțiunea
  // "Cum funcționează"/"De ce suntem diferiți" — răspuns la feedback că panelurile statice nu
  // simt suficient de "dinamic scrolabil" (Faza 14.2, iterație 2).
  const dynamicSectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress: sectionProgress } = useScroll({
    target: dynamicSectionRef,
    offset: ["start end", "end start"],
  });
  // Paralaxă pe blob-urile de fundal: se mișcă la viteze/direcții diferite de restul
  // conținutului pe măsură ce scrolezi — pe lângă puls-ul CSS ambiental (blob-drift), nu în loc
  // de el. Dezactivată (offset 0) pentru prefers-reduced-motion.
  const blob1Y = useTransform(sectionProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-50, 50]);
  const blob2Y = useTransform(sectionProgress, [0, 1], shouldReduceMotion ? [0, 0] : [40, -40]);
  const blob3Y = useTransform(sectionProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-30, 30]);

  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsRef,
    offset: ["start 85%", "end 55%"],
  });
  // Linia conectoare dintre cei 4 pași se "desenează" pe măsură ce scrolezi prin secțiune, nu
  // apare gata desenată. Pentru reduced motion, arătăm linia completă direct (informația tot
  // trebuie să fie disponibilă, doar fără animație).
  const lineProgress = useTransform(stepsProgress, [0, 1], [0, 1]);
  // Opacitate per-pas, decalată — fiecare pas "prinde viață" pe rând, pe măsură ce ajunge în
  // dreptul liniei care se desenează, nu toate deodată. 4 apeluri fixe (nu într-un .map), ca să
  // respecte regulile hook-urilor React — numărul de pași e cunoscut/constant.
  const step1Opacity = useTransform(stepsProgress, [0, 0.25], shouldReduceMotion ? [1, 1] : [0.25, 1]);
  const step2Opacity = useTransform(stepsProgress, [0.2, 0.45], shouldReduceMotion ? [1, 1] : [0.25, 1]);
  const step3Opacity = useTransform(stepsProgress, [0.4, 0.65], shouldReduceMotion ? [1, 1] : [0.25, 1]);
  const step4Opacity = useTransform(stepsProgress, [0.6, 0.85], shouldReduceMotion ? [1, 1] : [0.25, 1]);
  const stepOpacities = [step1Opacity, step2Opacity, step3Opacity, step4Opacity];

  // Restul homepage-ului (Hero, "Ce este OML", cardul "Următorul eveniment") a primit doar
  // reparații de glassmorphism/contrast la prima trecere (14.2), înainte să clarificăm că
  // Faza 14 = layout complet pt scroll imersiv — completat acum (2026-08-27), ca homepage-ul
  // să fie coerent, nu pe bucăți.
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroVideoScale = useTransform(heroProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 1.15]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.7], shouldReduceMotion ? [1, 1] : [1, 0]);
  const heroContentY = useTransform(heroProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -80]);

  const omlRef = useRef<HTMLElement>(null);
  const { scrollYProgress: omlProgress } = useScroll({ target: omlRef, offset: ["start 90%", "start 35%"] });
  const omlOpacity = useTransform(omlProgress, [0, 1], shouldReduceMotion ? [1, 1] : [0, 1]);
  const omlY = useTransform(omlProgress, [0, 1], shouldReduceMotion ? [0, 0] : [40, 0]);
  const omlBlobY = useTransform(omlProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-20, 20]);

  const previewRef = useRef<HTMLElement>(null);
  const { scrollYProgress: previewProgress } = useScroll({ target: previewRef, offset: ["start 90%", "start 45%"] });
  const previewOpacity = useTransform(previewProgress, [0, 1], shouldReduceMotion ? [1, 1] : [0, 1]);
  const previewScale = useTransform(previewProgress, [0, 1], shouldReduceMotion ? [1, 1] : [0.92, 1]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      // Dacă utilizatorul schimbă setarea din mers, oprim/pornim explicit video-ul deja
      // montat — schimbarea prop-ului autoPlay singură nu are efect asupra unui video pornit.
      if (videoRef.current) {
        if (e.matches) videoRef.current.pause();
        else videoRef.current.play().catch(() => {});
      }
    };
    motionQuery.addEventListener("change", onMotionChange);

    const onScroll = () => setShowStickyCta(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <Layout>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Video — zoom lent legat de scroll (paralaxă), nu doar autoplay static */}
        <motion.div style={{ scale: heroVideoScale }} className="absolute inset-0 w-full h-full bg-hero-bg">
          <video
            ref={videoRef}
            className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
            src={HERO_VIDEO_URL}
            poster={heroPoster}
            autoPlay={!prefersReducedMotion}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </motion.div>
        {/* Overlay */}
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
        
        {/* Content — se estompează + urcă ușor (paralaxă) pe măsură ce scrolezi în afara Hero-ului,
            nu doar stă acolo până dispare brusc sub secțiunea următoare. */}
        <motion.div
          style={{ opacity: heroContentOpacity, y: heroContentY }}
          className="relative z-10 container mx-auto px-4 text-center"
        >
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
              {/* text-foreground (nu text-white) pe bg-primary: alb pică WCAG AA (~2.24:1),
                  text-foreground dă ~9.4:1, aceeași paletă (Faza 14). */}
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-foreground text-base px-8 font-semibold shadow-lg">
                <Link to="/eveniment">Vezi următorul eveniment</Link>
              </Button>
              {/* Fără bg-white/10 (era o urmă de translucență/glass) — buton ghost simplu,
                  transparent, doar contur + text. */}
              <Button asChild variant="outline" size="lg" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-foreground text-base px-8 font-semibold">
                <Link to="/contact">Contactează-ne</Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full" />
          </div>
        </div>
      </section>

      {/* Ce este OML Section */}
      <section ref={omlRef} className="relative py-20 md:py-28 section-cream overflow-hidden">
        {/* Decor flat, discret, cu paralaxă legată de scroll (nu doar puls CSS static) —
            secțiunea era doar text plat, fără niciun element vizual (Faza 14.2). Nu ating
            cuvintele, doar adaug un accent organic în spate. */}
        <motion.svg
          viewBox="0 0 200 200"
          style={{ y: omlBlobY }}
          className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 translate-x-1/3 -translate-y-1/3 pointer-events-none motion-safe:animate-blob-drift"
          aria-hidden="true"
        >
          <path className="fill-primary/5" d={BLOB_PATH} />
        </motion.svg>

        <div className="container mx-auto px-4 relative">
          <motion.div style={{ opacity: omlOpacity, y: omlY }}>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <SectionHeading kicker="Descoperă" title="Ce este Oradea Music Lab?" />
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed text-left md:text-center">
                <p>Oradea Music Lab este o asociație care organizează evenimente ce aduc împreună tineri aspiranți muzicieni și artiști consacrați din Oradea, într-o seară educativă și distractivă.</p>
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
          </motion.div>
        </div>
      </section>

      {/* Cum funcționează + De ce suntem diferiți — secțiune unică, fluidă (Faza 4B/14.2) */}
      <section ref={dynamicSectionRef} className="relative py-20 md:py-28 bg-background overflow-hidden">
        {/* Fundal organic: forme "blob" flat, vectoriale — fără blur/transparență de sticlă
            (client a respins explicit glassmorphism), stil între morfism și ilustrație plată
            (Kurzgesagt). Puls CSS ambiental (blob-drift) + paralaxă legată de scroll (motion.div
            style={{ y }}) — două straturi de mișcare pe elemente diferite, nu se calcă unul pe
            altul. Paralaxa se dezactivează pentru prefers-reduced-motion (blob*Y = 0 mai sus). */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <motion.div style={{ y: blob1Y }} className="absolute -top-20 -left-24 w-[26rem] h-[26rem] md:w-[34rem] md:h-[34rem]">
            <svg viewBox="0 0 200 200" className="w-full h-full motion-safe:animate-blob-drift">
              <path className="fill-primary/25" d={BLOB_PATH} transform="translate(100 100)" />
            </svg>
          </motion.div>
          <motion.div style={{ y: blob2Y }} className="absolute top-1/4 -right-28 w-80 h-80 md:w-[28rem] md:h-[28rem]">
            <svg viewBox="0 0 200 200" className="w-full h-full motion-safe:animate-blob-drift [animation-delay:-7s]">
              <path className="fill-primary/15" d={BLOB_PATH} transform="translate(100 100) rotate(120)" />
            </svg>
          </motion.div>
          <motion.div style={{ y: blob3Y }} className="absolute -bottom-16 left-1/3 w-72 h-72 md:w-96 md:h-96">
            <svg viewBox="0 0 200 200" className="w-full h-full motion-safe:animate-blob-drift [animation-delay:-14s]">
              <path className="fill-primary/20" d={BLOB_PATH} transform="translate(100 100) rotate(240) scale(-1,1)" />
            </svg>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <SectionHeading kicker="Structura evenimentului" title="Cum funcționează?" kickerClassName="mb-3" />
            </div>
          </ScrollReveal>

          {/* Layout "parcurs vertical" (Faza 14.2, iterație 3) — cei 4 pași sunt o secvență
              reală, tratați ca o poveste de scroll, nu ca un grid de carduri. O linie VERTICALĂ
              (nu orizontală — mai natural într-o pagină care scrolează pe verticală) se umple
              pe măsură ce cobori, iar fiecare pas capătă opacitate deplină pe rând, în dreptul
              liniei care avansează. Pe mobil rămâne aceeași structură (nu mai are nevoie de o
              variantă separată — coloana unică e deja tiparul mobil natural). */}
          <div ref={stepsRef} className="relative max-w-2xl mx-auto mb-16 md:mb-24">
            <div className="absolute left-7 md:left-8 top-2 bottom-2 w-0.5">
              <div className="absolute inset-0 bg-primary/10 rounded-full" />
              <motion.div
                className="absolute inset-x-0 top-0 bg-primary rounded-full origin-top h-full"
                style={{ scaleY: shouldReduceMotion ? 1 : lineProgress }}
              />
            </div>

            <div className="space-y-12 md:space-y-16">
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
            }].map((item, index) => (
                <motion.div key={index} style={{ opacity: stepOpacities[index] }} className="relative flex items-start gap-5 md:gap-6">
                  <div className="relative z-10 shrink-0 bg-background">
                    <IconBlob icon={item.icon} rotate={index * 47} size="lg" />
                  </div>
                  <div className="pt-2">
                    <span className="text-xs font-display font-bold text-primary/50 tracking-widest">
                      PASUL {item.number}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-md">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <SectionHeading kicker="Filozofia noastră" title="De ce suntem diferiți?" kickerClassName="mb-3" />
            </div>
          </ScrollReveal>

          {/* Layout "bento": cele 2 mesaje-cheie (identitatea brandului) sunt mai vizibile,
              restul de 4 sunt suport, compacte — nu 6 cutii identice la aceeași greutate. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[{
            icon: Trophy,
            title: "Nu este un concurs",
            description: "Accent pe curaj și evoluție, nu pe perfecțiune.",
            featured: true
          }, {
            icon: Star,
            title: "Ești vedeta serii",
            description: "Fiecare participant primește atenție și respect maxim.",
            featured: true
          }, {
            icon: Music,
            title: "Scenă profesională",
            description: "Sunet de calitate și experiență reală de concert.",
            featured: false
          }, {
            icon: Lightbulb,
            title: "Feedback constructiv",
            description: "Sfaturi practice de la artiști cu experiență.",
            featured: false
          }, {
            icon: Heart,
            title: "Public susținător",
            description: "Atmosferă prietenoasă și lipsită de presiune.",
            featured: false
          }, {
            icon: Users,
            title: "Comunitate",
            description: "Conexiuni reale între generații de muzicieni.",
            featured: false
          }].map((item, index) => <ScrollReveal key={index} delay={index * 80} className={item.featured ? "sm:col-span-2" : undefined}>
                <ProcessStepCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  variant={item.featured ? "numbered" : "compact"}
                  tone="flat"
                  blobRotate={index * 47}
                />
              </ScrollReveal>)}
          </div>
        </div>
      </section>

      {/* Preview Următorul Eveniment */}
      <section ref={previewRef} className="py-20 md:py-28 bg-hero-bg text-white">
        <div className="container mx-auto px-4">
          <motion.div style={{ opacity: previewOpacity, scale: previewScale }}>
            <div className="max-w-4xl mx-auto">
              {/* Fundal opac, fără backdrop-blur — panou flat, nu glassmorphism. Ușor mai
                  deschis decât bg-hero-bg al secțiunii, ca să se separe vizual ca un card. */}
              <Card className="bg-[hsl(240_10%_14%)] border border-white/10 overflow-hidden">
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
                        OML {nextEvent.edition}
                        {nextEvent.guestArtist ? ` — cu ${nextEvent.guestArtist}` : ""}
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
                      <EventCountdown event={nextEvent} className="pt-3" />
                    </div>
                    <div className="shrink-0">
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-foreground w-full md:w-auto">
                        <Link to="/eveniment">Vezi detalii</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Sticky CTA — doar mobil, apare după ce utilizatorul a trecut de Hero (Faza 3) */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-white border-t border-border shadow-lg transition-transform duration-300 ${
          showStickyCta ? "translate-y-0" : "translate-y-full pointer-events-none"
        }`}
      >
        <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-foreground font-semibold">
          <Link to="/eveniment">Vezi următorul eveniment</Link>
        </Button>
      </div>
    </Layout>;
};
export default Index;