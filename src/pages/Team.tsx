import { useState } from "react";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Import team photos
import madiPhoto from "@/assets/team/madi-mihai.jpg";
import alessioPhoto from "@/assets/team/alessio-zoica.jpeg";
import alexiaPhoto from "@/assets/team/alexia-mateas.jpeg";
import claudiuPhoto from "@/assets/team/claudiu-rostas.jpeg";
import octavianPhoto from "@/assets/team/octavian-boji.png";
import voluntariiPhoto from "@/assets/team/voluntarii.jpeg";
interface TeamMember {
  name: string;
  role: string;
  photo: string;
  featured?: boolean;
  description?: string;
}
const teamMembers: TeamMember[] = [{
  name: "Madi Mihai",
  role: "Fondator",
  photo: madiPhoto,
  featured: true
}, {
  name: "Alessio Zoica",
  role: "Marketing",
  photo: alessioPhoto,
  description: "Ciaoo, sunt Alessio! 🤝\n\nMisiunea mea ca motion & graphic designer la Oradea Music Lab este sa traduc sunetul in limbaj vizual. Okay, design-ul este pasiunea mea, dar muzica este motorul: playlist-urile mele haotice alterneaza intre rock, jazz si muzica house. Ne vedem la Lab🍷"
}, {
  name: "Mateas Alexia",
  role: "Marketing",
  photo: alexiaPhoto,
  description: "Hellooo, sunt Alexia! 👋\n\nMă ocup de tot ce înseamnă Digital Marketing la Oradea Music Lab. Scopul meu e să ducem talentul din Oradea pe ecranele tuturor și să creștem această comunitate minunată. Dar dincolo de cifre, strategii și postări, iubesc muzica la fel de mult ca și voi. Uneori, las telefonul deoparte și urc pe scenă la Open Mic. Ne vedem pe fyp sau la microfon✨️"
}, {
  name: "Rostas Claudiu",
  role: "Marketing",
  photo: claudiuPhoto,
  description: "Hellooo, sunt Claudiu!\n\nSunt bassist şi director de campanii la Oradea Music Lab. Am intrat în OML din dorința de a ajuta muzicienii din Oradea să se unească, să colaboreze și să aibă o voce comună.\n\nMă ocup de campanii, concepte şi direcția proiectelor, dar totul pornește din muzică. Când nu construiesc idei şi planuri, sunt cu bass-ul în mână sau prin sălile de repetiții.\n\nCred în comunitate, în colaborare şi în faptul că scena locală devine mai puternică atunci când creștem împreună.\n\nNe vedem online, la evenimente sau pe scenă"
}, {
  name: "Boji Octavian",
  role: "Software Developer",
  photo: octavianPhoto
}];
interface HoveredState {
  member: TeamMember;
  index: number;
}
const Team = () => {
  const [hoveredState, setHoveredState] = useState<HoveredState | null>(null);
  const [lockedState, setLockedState] = useState<HoveredState | null>(null);
  const activeState = lockedState || hoveredState;
  const activeMember = activeState?.member;
  const activeIndex = activeState?.index ?? -1;
  const isLocked = !!lockedState;

  // Determine if panel should be on left or right based on card position
  // In a 4-column grid: index 0,1 are left side, index 2,3 are right side
  const isCardOnRight = activeIndex >= 2;
  const panelOnLeft = isCardOnRight; // Panel on opposite side

  const handleCardClick = (member: TeamMember, index: number) => {
    if (member.description) {
      setLockedState({
        member,
        index
      });
    }
  };
  const handleClose = () => {
    setLockedState(null);
  };
  const handleMouseEnter = (member: TeamMember, index: number) => {
    if (!isLocked) {
      setHoveredState({
        member,
        index
      });
    }
  };
  const handleMouseLeave = () => {
    if (!isLocked) {
      setHoveredState(null);
    }
  };

  // Get panel position classes
  const getPanelPositionClasses = () => {
    if (isLocked) {
      // Centered on screen when locked
      return "inset-0 flex items-center justify-center";
    }
    // Dynamic positioning based on card position
    if (panelOnLeft) {
      return "left-6 xl:left-12 top-1/2 -translate-y-1/2";
    }
    return "right-6 xl:right-12 top-1/2 -translate-y-1/2";
  };

  // Get animation direction
  const getAnimationX = () => {
    if (isLocked) return 0;
    return panelOnLeft ? -30 : 30;
  };
  return <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-hero-bg">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30 mb-6">Cine suntem?</span>
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
        {/* Backdrop when locked */}
        <AnimatePresence>
          {isLocked && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 bg-black/40 z-40" onClick={handleClose} />}
        </AnimatePresence>

        {/* Panel - Dynamic positioning */}
        <AnimatePresence mode="wait">
          {activeMember && activeMember.description && <motion.div key={isLocked ? "locked" : `hover-${activeIndex}`} initial={{
          opacity: 0,
          x: getAnimationX(),
          scale: isLocked ? 0.95 : 1
        }} animate={{
          opacity: 1,
          x: 0,
          scale: 1
        }} exit={{
          opacity: 0,
          x: getAnimationX(),
          scale: isLocked ? 0.95 : 1
        }} transition={{
          duration: 0.25,
          ease: "easeOut"
        }} className={`hidden lg:flex fixed z-50 ${getPanelPositionClasses()}`}>
              <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden border border-border/50 max-h-[80vh] ${isLocked ? "w-[480px]" : "w-[380px]"}`}>
                {/* Close button when locked */}
                {isLocked && <button onClick={handleClose} className="absolute top-3 right-3 z-10 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>}
                <div className={`relative overflow-hidden ${isLocked ? "h-64" : "h-52"}`}>
                  <img src={activeMember.photo} alt={activeMember.name} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-5 text-white">
                    <span className="inline-block px-3 py-1 bg-primary rounded-full text-xs font-medium mb-2">
                      {activeMember.role}
                    </span>
                    <h3 className={`font-display font-bold ${isLocked ? "text-2xl" : "text-xl"}`}>
                      {activeMember.name}
                    </h3>
                  </div>
                </div>
                <div className={`max-h-[calc(80vh-16rem)] overflow-y-auto ${isLocked ? "p-6" : "p-5"}`}>
                  <p className={`text-muted-foreground leading-relaxed whitespace-pre-line ${isLocked ? "text-base" : "text-[15px]"}`}>
                    {activeMember.description}
                  </p>
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>

        <div className="container mx-auto px-4">
          {/* Founder & Volunteers - Featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {/* Volunteers Card */}
            <Card className="overflow-hidden border-0 shadow-xl group">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={voluntariiPhoto} alt="Voluntarii Oradea Music Lab" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="inline-block px-3 py-1 bg-primary rounded-full text-xs font-medium mb-2">
                    Voluntari
                  </span>
                  <h3 className="text-2xl font-display font-bold">
                    Echipa de Voluntari
                  </h3>
                </div>
              </div>
            </Card>

            {/* Founder Card */}
            <Card className="overflow-hidden border-0 shadow-xl group">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={teamMembers[0].photo} alt={teamMembers[0].name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
            {teamMembers.slice(1).map((member, index) => <Card key={index} className={`overflow-hidden border-0 shadow-lg group hover:shadow-xl transition-all duration-300 ${member.description ? "cursor-pointer" : ""} ${activeMember?.name === member.name ? "ring-2 ring-primary ring-offset-2" : ""}`} onMouseEnter={() => handleMouseEnter(member, index)} onMouseLeave={handleMouseLeave} onClick={() => handleCardClick(member, index)}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <span className="inline-block px-2 py-0.5 bg-primary/80 rounded-full text-xs font-medium mb-1">
                      {member.role}
                    </span>
                    <h3 className="text-lg font-display font-semibold">
                      {member.name}
                    </h3>
                    {member.description && <span className="text-xs text-white/60 mt-1 block">
                        Click pentru detalii
                      </span>}
                  </div>
                </div>
              </Card>)}
          </div>

          {/* Mobile description panel */}
          <AnimatePresence>
            {lockedState && lockedState.member.description && <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: 20
          }} transition={{
            duration: 0.3
          }} className="lg:hidden fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
                <div className="relative bg-white rounded-xl shadow-lg p-5 max-w-md w-full max-h-[80vh] overflow-y-auto">
                  <button onClick={handleClose} className="absolute top-3 right-3 p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <div className="flex items-center gap-3 mb-4">
                    <img src={lockedState.member.photo} alt={lockedState.member.name} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <h4 className="font-display font-semibold text-lg">{lockedState.member.name}</h4>
                      <span className="text-sm text-primary">{lockedState.member.role}</span>
                    </div>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                    {lockedState.member.description}
                  </p>
                </div>
              </motion.div>}
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
    </Layout>;
};
export default Team;