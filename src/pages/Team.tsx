import Layout from "@/components/Layout";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// Import team photos
import madiPhoto from "@/assets/team/madi-mihai.jpg";
import alessioPhoto from "@/assets/team/alessio-zoica.jpeg";
import alexiaPhoto from "@/assets/team/alexia-mateas.jpeg";
import claudiuPhoto from "@/assets/team/claudiu-rostas.jpeg";
import octavianPhoto from "@/assets/team/octavian-boji.png";
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
  photo: string;
  description?: string;
}

// Membrii cu bio (poveste completă) — fiecare devine o secțiune proprie, scrolabilă, cu poza
// sticky (Faza 14.5, iterație 2: înlocuiește vechiul model bazat pe hover/click, care ascundea
// bio-ul până interacționai — acum e vizibil direct, doar scrolezi).
const teamStory: TeamMember[] = [
  {
    name: "Madi Mihai",
    role: "Fondator",
    photo: madiPhoto,
    description: "Hello! Sunt Mihai Madi, și am fondat Oradea Music Lab pentru a oferi tinerilor artiști un loc sigur și inspirațional unde să își exprime talentele, să socializeze, și să învețe de la profesioniștii din industrie.\n\nStudiez chitara încă de la 7 ani, iubesc muzica și antreprenoriatul, deci pot spune că proiectul acesta este cea mai nouă și mai frumoasă pasiune a mea. Fiind și elev, este greu să mă focusez în ambele direcții, însă dau tot ce am eu mai bun pentru a-mi lăsa amprenta în comunitatea orădeană.\n\nDacă vrei să ne cunoaștem, nu ezita să-mi dai un mesaj pe insta! ;) @mihai.madi",
  },
  {
    name: "Alessio Zoica",
    role: "Marketing",
    photo: alessioPhoto,
    description: "Ciaoo, sunt Alessio! 🤝\n\nMisiunea mea ca motion & graphic designer la Oradea Music Lab este sa traduc sunetul in limbaj vizual. Okay, design-ul este pasiunea mea, dar muzica este motorul: playlist-urile mele haotice alterneaza intre rock, jazz si muzica house. Ne vedem la Lab🍷",
  },
  {
    name: "Mateaș Alexia",
    role: "Marketing",
    photo: alexiaPhoto,
    description: "Hellooo, sunt Alexia! 👋\n\nMă ocup de tot ce înseamnă Digital Marketing la Oradea Music Lab. Scopul meu e să ducem talentul din Oradea pe ecranele tuturor și să creștem această comunitate minunată. Dar dincolo de cifre, strategii și postări, iubesc muzica la fel de mult ca și voi. Uneori, las telefonul deoparte și urc pe scenă la Open Mic. Ne vedem pe fyp sau la microfon✨️",
  },
  {
    name: "Rostaș Claudiu",
    role: "Marketing",
    photo: claudiuPhoto,
    description: "Hellooo, sunt Claudiu!\n\nSunt bassist şi director de campanii la Oradea Music Lab. Am intrat în OML din dorința de a ajuta muzicienii din Oradea să se unească, să colaboreze și să aibă o voce comună.\n\nMă ocup de campanii, concepte şi direcția proiectelor, dar totul pornește din muzică. Când nu construiesc idei şi planuri, sunt cu bass-ul în mână sau prin sălile de repetiții.\n\nCred în comunitate, în colaborare şi în faptul că scena locală devine mai puternică atunci când creștem împreună.\n\nNe vedem online, la evenimente sau pe scenă",
  },
];

// Fără bio — nu are sens o secțiune imersivă de scroll fără text de parcurs; rămâne un card
// compact, la final.
const restOfTeam: TeamMember[] = [{ name: "Boji Octavian", role: "Software Developer", photo: octavianPhoto }];

const Team = () => {
  const shouldReduceMotion = useReducedMotion();
  // Fără target = urmărește tot documentul, nu o singură secțiune — elementele decorative
  // plutesc pe parcursul întregii pagini (mai multe secțiuni de membri), nu doar una.
  const { scrollYProgress: pageProgress } = useScroll();
  const notesY = useTransform(pageProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -160]);
  const ribbonY = useTransform(pageProgress, [0, 1], shouldReduceMotion ? [0, 0] : [80, -80]);
  const grainsY = useTransform(pageProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-60, 60]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${teamBackground})`, backgroundPosition: "center 30%" }}
        />
        <div className="absolute inset-0 bg-black/60" />

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

      {/* Fiecare membru = o secțiune proprie. Poza rămâne sticky (fixă) cât bio-ul scrolează pe
          lângă ea — alternând stânga/dreapta — același tipar "sticky figure" folosit deja la
          posterul din Event.tsx. Fundal alternant (cream/alb) separă vizual persoanele, fără
          să mai fie nevoie de hover/click pentru a vedea bio-ul.

          Decor Higgsfield (note/panglică/granule) — plutește pe TOATĂ pagina (scroll-ul
          documentului, nu al unei secțiuni), în spatele conținutului (z-index implicit,
          pointer-events-none), cu puls CSS ambiental + paralaxă legată de scroll, ca peste tot
          pe site. Poziții fixe (procent din înălțimea totală a wrapper-ului), nu urmăresc un
          anumit membru. */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <motion.img
            alt=""
            src={decorNotes}
            style={{ y: notesY }}
            className="absolute top-[8%] left-4 md:left-10 w-16 md:w-20 opacity-40 motion-safe:animate-blob-drift"
          />
          <motion.img
            alt=""
            src={decorRibbon}
            style={{ y: ribbonY }}
            className="absolute top-[42%] right-0 w-40 md:w-56 opacity-30 motion-safe:animate-blob-drift [animation-delay:-7s]"
          />
          <motion.img
            alt=""
            src={decorGrains}
            style={{ y: grainsY }}
            className="absolute top-[78%] left-2 md:left-12 w-24 md:w-32 opacity-30 motion-safe:animate-blob-drift [animation-delay:-14s]"
          />
        </div>

        {teamStory.map((member, index) => {
        const reversed = index % 2 === 1;
        return (
          <section key={member.name} className={cn("py-16 md:py-24", index % 2 === 0 ? "bg-background" : "section-cream")}>
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start max-w-5xl mx-auto">
                <div className={cn("md:sticky md:top-24", reversed && "md:order-2")}>
                  <motion.div
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl"
                  >
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={cn("space-y-4", reversed && "md:order-1")}
                >
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {member.role}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                    {member.name}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                    {member.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Restul echipei — fără bio, card compact, nu o secțiune de scroll */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-sm mx-auto">
            {restOfTeam.map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm"
              >
                <img src={member.photo} alt={member.name} className="w-16 h-16 rounded-full object-cover shrink-0" />
                <div>
                  <h3 className="font-display font-semibold text-foreground">{member.name}</h3>
                  <span className="text-sm text-primary">{member.role}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team message */}
          <div className="max-w-2xl mx-auto mt-16 text-center">
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
