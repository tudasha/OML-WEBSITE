import { useState } from "react";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";

// Import team photos
import madiPhoto from "@/assets/team/madi-mihai.jpg";
import alessioPhoto from "@/assets/team/alessio-zoica.jpeg";
import alexiaPhoto from "@/assets/team/alexia-mateas.jpeg";
import claudiuPhoto from "@/assets/team/claudiu-rostas.jpeg";
import octavianPhoto from "@/assets/team/octavian-boji.png";

interface TeamMember {
  name: string;
  role: string;
  photo: string;
  featured?: boolean;
  description?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Madi Mihai",
    role: "Fondator",
    photo: madiPhoto,
    featured: true,
  },
  {
    name: "Alessio Zoica",
    role: "Marketing",
    photo: alessioPhoto,
    description: "Ciaoo, sunt Alessio! 🤝\n\nMisiunea mea ca motion & graphic designer la Oradea Music Lab este sa traduc sunetul in limbaj vizual. Okay, design-ul este pasiunea mea, dar muzica este motorul: playlist-urile mele haotice alterneaza intre rock, jazz si muzica house. Ne vedem la Lab🍷",
  },
  {
    name: "Mateas Alexia",
    role: "Marketing",
    photo: alexiaPhoto,
    description: "Hellooo, sunt Alexia! 👋\n\nMă ocup de tot ce înseamnă Digital Marketing la Oradea Music Lab. Scopul meu e să ducem talentul din Oradea pe ecranele tuturor și să creștem această comunitate minunată. Dar dincolo de cifre, strategii și postări, iubesc muzica la fel de mult ca și voi. Uneori, las telefonul deoparte și urc pe scenă la Open Mic. Ne vedem pe fyp sau la microfon✨️",
  },
  {
    name: "Rostas Claudiu",
    role: "Marketing",
    photo: claudiuPhoto,
    description: "Hellooo, sunt Claudiu!\n\nSunt bassist şi director de campanii la Oradea Music Lab. Am intrat în OML din dorința de a ajuta muzicienii din Oradea să se unească, să colaboreze și să aibă o voce comună.\n\nMă ocup de campanii, concepte şi direcția proiectelor, dar totul pornește din muzică. Când nu construiesc idei şi planuri, sunt cu bass-ul în mână sau prin sălile de repetiții.\n\nCred în comunitate, în colaborare şi în faptul că scena locală devine mai puternică atunci când creștem împreună.\n\nNe vedem online, la evenimente sau pe scenă",
  },
  {
    name: "Boji Octavian",
    role: "Echipă",
    photo: octavianPhoto,
  },
];

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState<TeamMember | null>(null);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-hero-bg">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30 mb-6">
            Cine suntem
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
            Echipa Noastră
          </h1>
          <p className="text-lg text-white/70 mt-4 max-w-xl mx-auto">
            Un proiect construit de liceeni, pentru tineri pasionați de muzică.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 md:py-24 section-cream relative">
        {/* Hover Panel - Left side, vertically centered */}
        <AnimatePresence>
          {hoveredMember && hoveredMember.description && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="hidden lg:block fixed left-8 xl:left-16 top-1/2 -translate-y-1/2 z-50"
            >
              <div className="bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-border/50 w-[380px] max-h-[75vh]">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={hoveredMember.photo}
                    alt={hoveredMember.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-5 text-white">
                    <span className="inline-block px-3 py-1 bg-primary rounded-full text-xs font-medium mb-2">
                      {hoveredMember.role}
                    </span>
                    <h3 className="text-xl font-display font-bold">
                      {hoveredMember.name}
                    </h3>
                  </div>
                </div>
                <div className="p-5 max-h-[calc(75vh-13rem)] overflow-y-auto">
                  <p className="text-[15px] text-muted-foreground leading-relaxed whitespace-pre-line">
                    {hoveredMember.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4">
          {/* Founder - Featured */}
          <div className="max-w-md mx-auto mb-12">
            <Card className="overflow-hidden border-0 shadow-xl group">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={teamMembers[0].photo}
                  alt={teamMembers[0].name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="inline-block px-3 py-1 bg-primary rounded-full text-xs font-medium mb-2">
                    {teamMembers[0].role}
                  </span>
                  <h3 className="text-2xl font-display font-bold">
                    {teamMembers[0].name}
                  </h3>
                </div>
              </div>
            </Card>
          </div>

          {/* Rest of the team */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {teamMembers.slice(1).map((member, index) => (
              <Card 
                key={index} 
                className={`overflow-hidden border-0 shadow-lg group hover:shadow-xl transition-all duration-300 ${
                  member.description ? "cursor-pointer" : ""
                } ${hoveredMember?.name === member.name ? "ring-2 ring-primary ring-offset-2" : ""}`}
                onMouseEnter={() => setHoveredMember(member)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <span className="inline-block px-2 py-0.5 bg-primary/80 rounded-full text-xs font-medium mb-1">
                      {member.role}
                    </span>
                    <h3 className="text-lg font-display font-semibold">
                      {member.name}
                    </h3>
                    {member.description && (
                      <span className="text-xs text-white/60 mt-1 block lg:hidden">
                        Apasă pentru detalii
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Mobile description panel */}
          <AnimatePresence>
            {hoveredMember && hoveredMember.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden mt-8 max-w-md mx-auto"
              >
                <div className="bg-white rounded-xl shadow-lg p-5 border border-border/50">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={hoveredMember.photo}
                      alt={hoveredMember.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-display font-semibold">{hoveredMember.name}</h4>
                      <span className="text-xs text-primary">{hoveredMember.role}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {hoveredMember.description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
    </Layout>
  );
};

export default Team;
