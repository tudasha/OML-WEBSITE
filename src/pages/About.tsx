import { useRef } from "react";
import { Heart, BookOpen, Users, HandHeart, Music } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Layout from "@/components/Layout";
import { BLOB_PATH } from "@/lib/blob-shape";
import heroConcert from "@/assets/hero-concert.png";

// Aceleași 9 paragrafe originale, regrupate pe "capitole" narative (Faza 14.4, iterație 2, la
// feedback client: "prea mult text îngrămădit"). NU e nimic rescris/tăiat — fiecare capitol e
// text original, mutat, nu reformulat. Doar structura/ritmul de prezentare se schimbă: fiecare
// capitol apare pe rând la scroll, nu tot dintr-o dată ca un singur bloc.
const storyChapters = [
  {
    kicker: "Cine suntem",
    paragraphs: [
      "Suntem o echipă de tineri pasionați de muzică ce ne dorim să creăm o comunitate vibrantă unde fiecare copil își poate exprima talentul muzical într-un mediu sigur și susținător, învățând din greșeli și din sfaturile celor cu experiență.",
      "Asociația Oradea Music Lab, fondată de Madi Mihai, are ca scop: organizează evenimente care aduc împreună tineri aspiranți muzicieni din Oradea și artiști consacrați, pentru o seară atât educativă, cât și distractivă.",
    ],
  },
  {
    kicker: "De unde a pornit ideea",
    paragraphs: [
      "Ideea proiectului a apărut la finalul anului 2024, fiind inspirată de proiectul american Grace Weber's Music Lab, la care Mihai a participat în cadrul anului său cultural în Statele Unite ale Americii, prin programul FLEX (Future Leaders Exchange). Acest eveniment avea loc lunar și urmărea un obiectiv similar. Observând impactul real pe care acest proiect îl avea asupra tinerilor din Milwaukee, Mihai a decis să adapteze acest concept și să îl aducă în comunitatea locală din Oradea.",
    ],
  },
  {
    kicker: "Cum arată o ediție",
    paragraphs: [
      "Ce presupune Oradea Music Lab? La fiecare ediție sunt invitați artiști orădeni cu experiență, care susțin un moment muzical live și participă ulterior la o discuție deschisă cu publicul. Aceștia vorbesc despre parcursul lor artistic, despre provocările din industria muzicală și despre modul în care pot fi depășite dificultățile legate de scenă, creație și carieră. Tinerii au ocazia să adreseze întrebări și să primească răspunsuri directe, bazate pe experiența reală a invitaților.",
      "Structura evenimentului este împărțită în mai multe etape. Prima parte constă într-un concert susținut de invitații speciali. Urmează o discuție live pe scenă, completată de o sesiune de întrebări și răspunsuri cu publicul, care reprezintă componenta educațională a proiectului. Ultima parte este open mic-ul \"Scena Tinerilor\", un spațiu dedicat elevilor și tinerilor de până la 21 de ani, unde aceștia pot urca pe scenă pentru a interpreta în fața publicului și pentru a primi feedback constructiv din partea artiștilor invitați.",
    ],
  },
  {
    kicker: "Nu este un concurs",
    paragraphs: [
      "Un element central al Oradea Music Lab este faptul că nu este un concurs. Accentul nu cade pe performanța perfectă, ci pe curaj, învățare și evoluție. Greșelile sunt acceptate ca parte firească a procesului artistic. Atmosfera este una prietenoasă și lipsită de presiune, astfel încât fiecare tânăr să se simtă în siguranță atunci când urcă pe scenă.",
    ],
  },
  {
    kicker: "Fiecare tânăr, o vedetă",
    paragraphs: [
      "Ceea ce diferențiază Oradea Music Lab de alte evenimente este modul în care sunt tratați participanții. Fiecare tânăr care urcă pe scenă este considerat o vedetă a serii. Scena, sunetul și atenția publicului sunt gândite astfel încât participanții să aibă parte de o experiență reală de concert, care să le crească încrederea în sine și dorința de a continua drumul în muzică.",
    ],
  },
  {
    kicker: "O comunitate, nu doar un eveniment",
    paragraphs: [
      "Pentru a încuraja participarea și pentru a recompensa curajul, organizăm și o tombolă cu premii surpriză destinată tinerilor care participă la open mic. De asemenea, fiecare ediție este însoțită de un moment de socializare, care contribuie la consolidarea comunității create în jurul proiectului.",
      "Prin acest format, Oradea Music Lab își propune să creeze legături între generații de muzicieni, să ofere modele autentice tinerilor și să contribuie la dezvoltarea unei comunități muzicale active în Oradea. Proiectul este, în esență, un spațiu de întâlnire între educație, experiență și pasiune, în care muzica devine un instrument de dialog și formare personală.",
    ],
  },
];

const values = [
  { icon: Heart, title: "Curaj" },
  { icon: BookOpen, title: "Învățare" },
  { icon: Users, title: "Comunitate" },
  { icon: HandHeart, title: "Respect" },
  { icon: Music, title: "Muzică autentică" },
];

const About = () => {
  const shouldReduceMotion = useReducedMotion();
  const storyRef = useRef<HTMLElement>(null);
  // Indicator de progres al lecturii — sticky, se umple pe măsură ce parcurgi tot articolul.
  // Tipar de scrollytelling (sticky figure/progress), confirmat prin research.
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

      {/* Povestea noastră — restructurată (Faza 14.4, iterație 2) în 6 "capitole" narative care
          apar pe rând la scroll, nu un singur bloc de 9 paragrafe. Aceleași cuvinte, ritm nou —
          rezolvă senzația de "text îngrămădit" fără să atingă conținutul. Fără section-cream
          (era opac) — tot articolul stă acum pe propriul card de lizibilitate mai jos, ca
          fundalul global să se vadă clar în jur. */}
      <section ref={storyRef} className="relative py-16 md:py-24 overflow-hidden">
        <svg viewBox="0 0 200 200" className="absolute top-0 left-0 w-72 h-72 md:w-[26rem] md:h-[26rem] -translate-x-1/3 -translate-y-1/4 pointer-events-none motion-safe:animate-blob-drift" aria-hidden="true">
          <path className="fill-primary/5" d={BLOB_PATH} />
        </svg>

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 xl:grid-cols-[2rem_1fr]">
            {/* Indicator sticky, doar pe ecrane foarte largi (unde nu se suprapune peste text) */}
            <div className="hidden xl:block">
              <div className="sticky top-28 h-40 w-1 mx-auto rounded-full">
                <div className="absolute inset-0 bg-primary/10 rounded-full" />
                <motion.div
                  className="absolute inset-x-0 top-0 bg-primary rounded-full origin-top h-full"
                  style={{ scaleY: shouldReduceMotion ? 1 : readProgress }}
                />
              </div>
            </div>

            <div className="max-w-3xl mx-auto xl:mx-0 bg-white/90 rounded-3xl p-6 md:p-10 shadow-lg">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center xl:text-left mb-16">
                Povestea Oradea Music Lab
              </h2>

              <div className="space-y-16 md:space-y-20">
                {storyChapters.map((chapter, i) => (
                  <motion.div
                    key={chapter.kicker}
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                  >
                    <span className="text-xs font-display font-bold text-primary/60 tracking-widest uppercase">
                      {String(i + 1).padStart(2, "0")} — {chapter.kicker}
                    </span>
                    <div className="mt-3 space-y-4 text-muted-foreground text-lg leading-relaxed">
                      {chapter.paragraphs.map((p, pi) => (
                        <p key={pi}>{p}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Valorile — fost o secțiune separată, grea, cu 5 carduri mari (client: "panouri
                  cam inutile"). Compactate acum într-o singură bandă de accente, integrată la
                  finalul poveștii, nu o secțiune nouă. Tot conținutul rămâne — doar prezentarea
                  se schimbă. */}
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                className="mt-16 md:mt-20 pt-10 border-t border-border"
              >
                <span className="text-xs font-display font-bold text-primary/60 tracking-widest uppercase">
                  Valorile noastre
                </span>
                <div className="mt-4 flex flex-wrap gap-3">
                  {values.map((value) => (
                    <span
                      key={value.title}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-primary/10 shadow-sm text-sm font-medium text-foreground"
                    >
                      <value.icon className="w-4 h-4 text-primary" />
                      {value.title}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
