import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

// Import team photos
import madiPhoto from "@/assets/team/madi-mihai.jpg";
import alessioPhoto from "@/assets/team/alessio-zoica.jpeg";
import alexiaPhoto from "@/assets/team/alexia-mateas.jpeg";
import claudiuPhoto from "@/assets/team/claudiu-rostas.jpeg";
import octavianPhoto from "@/assets/team/octavian-boji.png";

const teamMembers = [
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
  },
  {
    name: "Mateas Alexia",
    role: "Marketing",
    photo: alexiaPhoto,
  },
  {
    name: "Rostas Claudiu",
    role: "Marketing",
    photo: claudiuPhoto,
  },
  {
    name: "Boji Octavian",
    role: "Echipa",
    photo: octavianPhoto,
  },
];

const Team = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-hero-bg">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30 mb-6">
            Cine suntem
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
            Echipa Noastra
          </h1>
          <p className="text-lg text-white/70 mt-4 max-w-xl mx-auto">
            Un proiect construit de liceeni, pentru tineri pasionati de muzica.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 md:py-24 section-cream">
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
                className="overflow-hidden border-0 shadow-lg group hover:shadow-xl transition-shadow"
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
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Team message */}
          <div className="max-w-2xl mx-auto mt-16 text-center">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Oradea Music Lab este construit de liceeni pasionati de muzica si 
              comunitate. Credem ca varsta nu este o bariera pentru a face lucruri 
              marete si ca tinerii pot inspira alti tineri sa-si urmeze visurile muzicale.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
