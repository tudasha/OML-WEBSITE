import Layout from "@/components/Layout";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import { BLOB_PATH } from "@/lib/blob-shape";

// Import team photos
import madiPhoto from "@/assets/team/madi-mihai.jpg";
import alexiaPhoto from "@/assets/team/alexia-mateas.jpeg";
import claudiuPhoto from "@/assets/team/claudiu-rostas.jpeg";
import dariaPhoto from "@/assets/team/sburlea-daria.jpg";
import medeeaPhoto from "@/assets/team/craciun-medeea.jpg";
import teamBackground from "@/assets/team/team-background.jpg";

// Decor Higgsfield (Faza 15) — note muzicale, panglică, granule; SVG generate cu recraft_v4_1,
// curățate manual (fundal alb → transparent, culori în afara paletei → portocaliul de brand),
// vezi HOMEPAGE_REDESIGN_PLAN.md. Mecanica de scroll rămâne cod (framer-motion), ca peste tot.
import decorNotes from "@/assets/decor/notes.svg";
import decorRibbon from "@/assets/decor/ribbon.svg";
import decorGrains from "@/assets/decor/grains.svg";

interface TeamMember {
  name: string;
  role: string;
  /** Lipsă = poză încă netrimisă de client → apare un placeholder, nu o imagine ruptă. */
  photo?: string;
}

// Roster actualizat de client (2026-09-10): doar nume + rol + poză, FĂRĂ bio — înlocuiește
// vechiul model cu secțiuni de scroll imersive per persoană (teamStory/restOfTeam cu
// description). Alessio Zoica și Octavian Boji au fost eliminați din echipa afișată, la
// cererea explicită a clientului (nu mai fac parte din listă). Bogdan Tudor nu are încă poză —
// `photo` rămâne undefined, cardul lui arată un placeholder până vine poza.
const team: TeamMember[] = [
  { name: "Madi Mihai", role: "Fondator & Președinte", photo: madiPhoto },
  { name: "Mateaș Alexia", role: "Manager PR & Marketing", photo: alexiaPhoto },
  { name: "Rostaș Claudiu", role: "Manager Operațiuni", photo: claudiuPhoto },
  { name: "Sburlea Daria", role: "Manager HR", photo: dariaPhoto },
  { name: "Crăciun Medeea", role: "Manager HR", photo: medeeaPhoto },
  { name: "Bogdan Tudor", role: "Manager IT" },
];

// Fondatorul primește un card propriu, mai mare, deasupra grilei — asimetria "1 card
// evidențiat + restul într-o grilă uniformă" e același tipar bento folosit deja pe homepage la
// "De ce suntem diferiți" (nu 6 casete identice), nu o excepție inventată aici.
const [founder, ...restOfTeam] = team;

// Cadru foto comun (poză reală SAU placeholder), aceeași formă (aspect-[4/5], colțuri
// rotunjite, umbră) în ambele cazuri — ca un card fără poză să nu strice grila vizual.
const MemberPhotoFrame = ({ member, className }: { member: TeamMember; className?: string }) => (
  <div className={cn("relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg", className)}>
    {member.photo ? (
      <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full bg-primary/10 border-2 border-primary/10 flex flex-col items-center justify-center gap-3">
        <div className="relative w-16 h-16 shrink-0">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
            <path className="fill-primary/25" d={BLOB_PATH} transform="translate(100 100)" />
          </svg>
          <User className="absolute inset-0 m-auto w-7 h-7 text-primary" />
        </div>
        <span className="text-xs font-medium text-primary/70">Poză în curând</span>
      </div>
    )}
  </div>
);

const MemberCard = ({ member, index, shouldReduceMotion }: { member: TeamMember; index: number; shouldReduceMotion: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: shouldReduceMotion ? 0 : index * 0.06 }}
    className="text-center"
  >
    <MemberPhotoFrame member={member} />
    <h3 className="mt-4 font-display font-semibold text-lg text-foreground">{member.name}</h3>
    <p className="text-primary text-sm font-medium">{member.role}</p>
  </motion.div>
);

const Team = () => {
  const shouldReduceMotion = useReducedMotion();
  // Fără target = urmărește tot documentul — elementele decorative plutesc pe parcursul
  // întregii pagini, nu doar al unei secțiuni.
  const { scrollYProgress: pageProgress } = useScroll();
  const notesY = useTransform(pageProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -320]);
  const notesRotate = useTransform(pageProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-8, 12]);
  const ribbonY = useTransform(pageProgress, [0, 1], shouldReduceMotion ? [0, 0] : [140, -140]);
  const ribbonRotate = useTransform(pageProgress, [0, 1], shouldReduceMotion ? [0, 0] : [6, -10]);
  const grainsY = useTransform(pageProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-120, 200]);

  return (
    <Layout>
      {/* Hero Section — pornește deja de la marginea reală de sus (main-ul din Layout.tsx nu
          are padding-top, header-ul e plutitor/nu ocupă spațiu în flux), în spatele header-ului
          transparent. FĂRĂ -mt (o margine negativă suplimentară ar împinge secțiunea DEASUPRA
          ecranului — bug găsit: titlul ajungea să se suprapună cu header-ul). `pt-32 md:pt-40`
          dă clearance real sub header. Se estompează spre transparent la bază — aceeași mască
          CSS ca la video-ul Hero de pe homepage (Index.tsx). */}
      <section className="relative pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]"
          style={{ backgroundImage: `url(${teamBackground})`, backgroundPosition: "center 30%" }}
        />
        <div className="absolute inset-0 bg-black/60 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30 mb-6">Cine suntem?</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
            Echipa OML
          </h1>
          <p className="text-lg text-white/70 mt-4 max-w-xl mx-auto">
            Un proiect construit de liceeni, pentru tineri pasionați de muzică.
          </p>
        </div>
      </section>

      {/* Decor Higgsfield (note/panglică/granule) — plutește pe TOATĂ pagina (scroll-ul
          documentului, nu al unei secțiuni), în spatele conținutului (z-index implicit,
          pointer-events-none), cu puls CSS ambiental + paralaxă legată de scroll, ca peste tot
          pe site. Poziții fixe (procent din înălțimea totală a wrapper-ului). */}
      {/* Video-ul ambiental e GLOBAL (Layout.tsx, legat de scroll pe toată pagina) — nu mai are
          nevoie de propria instanță locală aici. */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <motion.img
            alt=""
            src={decorNotes}
            style={{ y: notesY, rotate: notesRotate }}
            className="absolute top-[6%] left-2 md:left-8 w-28 md:w-40 opacity-70 motion-safe:animate-blob-drift"
          />
          <motion.img
            alt=""
            src={decorRibbon}
            style={{ y: ribbonY, rotate: ribbonRotate }}
            className="absolute top-[45%] -right-8 md:right-0 w-64 md:w-80 opacity-60 motion-safe:animate-blob-drift [animation-delay:-7s]"
          />
          <motion.img
            alt=""
            src={decorGrains}
            style={{ y: grainsY }}
            className="absolute top-[80%] left-0 md:left-6 w-40 md:w-52 opacity-50 motion-safe:animate-blob-drift [animation-delay:-14s]"
          />
        </div>

        {/* Fondator — card propriu, mai lat, deasupra grilei (vezi comentariul de la `founder`
            mai sus). Card de lizibilitate (bg-white/95) peste video-ul ambiental de fundal, ca
            la restul paginilor. */}
        <section className="relative pt-4 pb-12 md:pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6 sm:gap-8 items-center bg-white/95 rounded-2xl p-6 md:p-8 shadow-lg"
            >
              <MemberPhotoFrame member={founder} className="w-40 sm:w-full mx-auto" />
              <div className="text-center sm:text-left">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">{founder.name}</h2>
                <p className="text-primary font-medium mt-1">{founder.role}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Restul echipei — grilă uniformă, doar nume + rol + poză (fără bio). */}
        <section className="relative pb-20 md:pb-28">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-10 max-w-3xl mx-auto">
              {restOfTeam.map((member, index) => (
                <MemberCard key={member.name} member={member} index={index} shouldReduceMotion={!!shouldReduceMotion} />
              ))}
            </div>

            {/* Team message — propriul card de lizibilitate, ca la restul secțiunilor de mai sus */}
            <div className="max-w-2xl mx-auto mt-16 text-center bg-white/95 rounded-2xl p-6 md:p-8 shadow-lg">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Oradea Music Lab este construit de liceeni pasionați de muzică și
                comunitate. Credem că vârsta nu este o barieră pentru a face lucruri
                mărețe și că tinerii pot inspira alți tineri să-și urmeze visurile muzicale.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Team;
