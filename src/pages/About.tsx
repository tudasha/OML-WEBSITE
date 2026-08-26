import { useRef } from "react";
import { Heart, BookOpen, Users, HandHeart, Music } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Layout from "@/components/Layout";
import ProcessStepCard from "@/components/ProcessStepCard";
import { BLOB_PATH } from "@/lib/blob-shape";
import heroConcert from "@/assets/hero-concert.png";

const About = () => {
  const shouldReduceMotion = useReducedMotion();
  const storyRef = useRef<HTMLElement>(null);
  const { scrollYProgress: storyProgress } = useScroll({ target: storyRef, offset: ["start 90%", "start 40%"] });
  const storyOpacity = useTransform(storyProgress, [0, 1], shouldReduceMotion ? [1, 1] : [0, 1]);
  const storyY = useTransform(storyProgress, [0, 1], shouldReduceMotion ? [0, 0] : [40, 0]);
  // Indicator de progres al lecturii — sticky, se umple pe măsură ce parcurgi tot articolul
  // (offset diferit de storyProgress de mai sus, care e doar pt intrarea în viewport; asta
  // urmărește întreaga secțiune, de la primul până la ultimul rând). Tipar clasic de
  // scrollytelling (sticky figure/progress), confirmat prin research — nu era folosit încă
  // nicăieri pe site, doar linii de progres pe secțiuni scurte (Cum funcționează, Edițiile
  // noastre), nu pe un articol lung ca acesta.
  const { scrollYProgress: readProgress } = useScroll({ target: storyRef, offset: ["start start", "end end"] });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url(${heroConcert})` }}
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30 mb-6">
            Povestea noastră
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
            Despre Noi
          </h1>
        </div>
      </section>

      {/* Povestea noastră — pagina era un singur bloc de text foarte lung, fără niciun element
          vizual (Faza 14.4). Nu ating niciun cuvânt (regula "nu inventa/rescrie conținut"),
          doar adaug decor organic + intrare legată de scroll, ca restul site-ului. */}
      <section ref={storyRef} className="relative py-16 md:py-24 section-cream overflow-hidden">
        <svg viewBox="0 0 200 200" className="absolute top-0 left-0 w-72 h-72 md:w-[26rem] md:h-[26rem] -translate-x-1/3 -translate-y-1/4 pointer-events-none motion-safe:animate-blob-drift" aria-hidden="true">
          <path className="fill-primary/5" d={BLOB_PATH} />
        </svg>

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 xl:grid-cols-[2rem_1fr]">
            {/* Indicator sticky, doar pe ecrane foarte largi (unde nu se suprapune cu textul) */}
            <div className="hidden xl:block">
              <div className="sticky top-28 h-40 w-1 mx-auto rounded-full">
                <div className="absolute inset-0 bg-primary/10 rounded-full" />
                <motion.div
                  className="absolute inset-x-0 top-0 bg-primary rounded-full origin-top h-full"
                  style={{ scaleY: shouldReduceMotion ? 1 : readProgress }}
                />
              </div>
            </div>

            <motion.div style={{ opacity: storyOpacity, y: storyY }} className="max-w-4xl mx-auto xl:mx-0">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-10">
              Povestea Oradea Music Lab
            </h2>

            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-lg leading-relaxed">
                Suntem o echipă de tineri pasionați de muzică ce ne dorim să creăm o
                comunitate vibrantă unde fiecare copil își poate exprima talentul
                muzical într-un mediu sigur și susținător, învățând din greșeli și
                din sfaturile celor cu experiență.
              </p>

              <p className="text-lg leading-relaxed">
                Asociația Oradea Music Lab, fondată de <strong className="text-foreground">Madi Mihai</strong>,
                are ca scop: organizează evenimente care aduc împreună tineri
                aspiranți muzicieni din Oradea și artiști consacrați, pentru o seară
                atât educativă, cât și distractivă.
              </p>

              <p className="text-lg leading-relaxed">
                Ideea proiectului a apărut la finalul anului 2024, fiind inspirată de
                proiectul american <strong className="text-foreground">Grace Weber&apos;s Music Lab</strong>,
                la care Mihai a participat în cadrul anului său cultural în Statele Unite
                ale Americii, prin programul <strong className="text-foreground">FLEX (Future Leaders Exchange)</strong>.
                Acest eveniment avea loc lunar și urmărea un obiectiv similar. Observând
                impactul real pe care acest proiect îl avea asupra tinerilor din Milwaukee,
                Mihai a decis să adapteze acest concept și să îl aducă în comunitatea
                locală din Oradea.
              </p>

              <p className="text-lg leading-relaxed">
                Ce presupune Oradea Music Lab? La fiecare ediție sunt invitați artiști
                orădeni cu experiență, care susțin un moment muzical live și participă
                ulterior la o discuție deschisă cu publicul. Aceștia vorbesc despre
                parcursul lor artistic, despre provocările din industria muzicală și
                despre modul în care pot fi depășite dificultățile legate de scenă,
                creație și carieră. Tinerii au ocazia să adreseze întrebări și să
                primească răspunsuri directe, bazate pe experiența reală a invitaților.
              </p>

              <p className="text-lg leading-relaxed">
                Structura evenimentului este împărțită în mai multe etape. Prima parte
                constă într-un concert susținut de invitații speciali. Urmează o discuție
                live pe scenă, completată de o sesiune de întrebări și răspunsuri cu
                publicul, care reprezintă componenta educațională a proiectului. Ultima
                parte este open mic-ul &quot;Scena Tinerilor&quot;, un spațiu dedicat elevilor și
                tinerilor de până la 21 de ani, unde aceștia pot urca pe scenă pentru
                a interpreta în fața publicului și pentru a primi feedback constructiv
                din partea artiștilor invitați.
              </p>

              <p className="text-lg leading-relaxed">
                Un element central al Oradea Music Lab este faptul că <strong className="text-foreground">nu este un concurs</strong>.
                Accentul nu cade pe performanța perfectă, ci pe curaj, învățare și evoluție.
                Greșelile sunt acceptate ca parte firească a procesului artistic. Atmosfera
                este una prietenoasă și lipsită de presiune, astfel încât fiecare tânăr
                să se simtă în siguranță atunci când urcă pe scenă.
              </p>

              <p className="text-lg leading-relaxed">
                Ceea ce diferențiază Oradea Music Lab de alte evenimente este modul în
                care sunt tratați participanții. Fiecare tânăr care urcă pe scenă este
                considerat o vedetă a serii. Scena, sunetul și atenția publicului sunt
                gândite astfel încât participanții să aibă parte de o experiență reală
                de concert, care să le crească încrederea în sine și dorința de a
                continua drumul în muzică.
              </p>

              <p className="text-lg leading-relaxed">
                Pentru a încuraja participarea și pentru a recompensa curajul, organizăm
                și o tombolă cu premii surpriză destinată tinerilor care participă la
                open mic. De asemenea, fiecare ediție este însoțită de un moment de
                socializare, care contribuie la consolidarea comunității create în
                jurul proiectului.
              </p>

              <p className="text-lg leading-relaxed">
                Prin acest format, Oradea Music Lab își propune să creeze legături
                între generații de muzicieni, să ofere modele autentice tinerilor și
                să contribuie la dezvoltarea unei comunități muzicale active în Oradea.
                Proiectul este, în esență, un spațiu de întâlnire între educație,
                experiență și pasiune, în care muzica devine un instrument de dialog
                și formare personală.
              </p>
            </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valorile noastre — foloseau emoji (💪📚🤝🙏🎵) ca iconițe decorative, deși fiecare
          valoare avea deja un icon Lucide importat, dar nefolosit (Faza 14.4, curățenie emoji
          din Faza 14). Acum consecvent cu restul site-ului: ProcessStepCard + IconBlob. */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
            Valorile noastre
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Heart, title: "Curaj", description: "Încurajăm să încerci, chiar dacă nu ești perfect." },
              { icon: BookOpen, title: "Învățare", description: "Fiecare experiență este o oportunitate de creștere." },
              { icon: Users, title: "Comunitate", description: "Împreună suntem mai puternici." },
              { icon: HandHeart, title: "Respect", description: "Tratăm pe fiecare cu demnitate și susținere." },
              { icon: Music, title: "Muzică autentică", description: "Expresie personală, nu imitație." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : index * 0.08 }}
              >
                <ProcessStepCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  tone="flat"
                  blobRotate={index * 47}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
