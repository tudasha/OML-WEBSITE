import { Card, CardContent } from "@/components/ui/card";
import { Heart, BookOpen, Users, HandHeart, Music } from "lucide-react";
import Layout from "@/components/Layout";
import heroConcert from "@/assets/hero-concert.png";

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroConcert})` }}
        />
        <div className="absolute inset-0 bg-hero-bg/90" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30 mb-6">
            Povestea noastra
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
            Despre Noi
          </h1>
        </div>
      </section>

      {/* Povestea noastra */}
      <section className="py-16 md:py-24 section-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-10">
              Povestea Oradea Music Lab
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-lg leading-relaxed">
                Suntem o echipa de tineri pasionati de muzica ce ne dorim sa cream o 
                comunitate vibranta unde fiecare copil isi poate exprima talentul 
                muzical intr-un mediu sigur si sustinator, invatand din greseli si 
                din sfaturile celor cu experienta.
              </p>

              <p className="text-lg leading-relaxed">
                Eveniment fondat de <strong className="text-foreground">Madi Mihai</strong> cu 
                sprijinul <strong className="text-foreground">American Councils for International Education</strong>, 
                Oradea Music Lab are ca scop exact acest lucru: de a aduce impreuna tineri 
                aspiranti muzicieni din Oradea si artisti consacrati pentru a crea o seara 
                atat educativa, cat si distractiva.
              </p>

              <p className="text-lg leading-relaxed">
                Ideea proiectului a aparut la finalul anului 2024, fiind inspirata de 
                proiectul american <strong className="text-foreground">Grace Weber&apos;s Music Lab</strong>, 
                la care Mihai a participat in cadrul anului sau cultural in Statele Unite 
                ale Americii, prin programul <strong className="text-foreground">FLEX (Future Leaders Exchange)</strong>. 
                Acest eveniment avea loc lunar si urmarea un obiectiv similar. Observand 
                impactul real pe care acest proiect il avea asupra tinerilor din Milwaukee, 
                Mihai a decis sa adapteze acest concept si sa il aduca in comunitatea 
                locala din Oradea.
              </p>

              <p className="text-lg leading-relaxed">
                Ce presupune Oradea Music Lab? La fiecare editie sunt invitati artisti 
                oradeni cu experienta, care sustin un moment muzical live si participa 
                ulterior la o discutie deschisa cu publicul. Acestia vorbesc despre 
                parcursul lor artistic, despre provocarile din industria muzicala si 
                despre modul in care pot fi depasite dificultatile legate de scena, 
                creatie si cariera. Tinerii au ocazia sa adreseze intrebari si sa 
                primeasca raspunsuri directe, bazate pe experienta reala a invitatilor.
              </p>

              <p className="text-lg leading-relaxed">
                Structura evenimentului este impartita in mai multe etape. Prima parte 
                consta intr-un concert sustinut de invitatii speciali. Urmeaza o discutie 
                live pe scena, completata de o sesiune de intrebari si raspunsuri cu 
                publicul, care reprezinta componenta educationala a proiectului. Ultima 
                parte este open mic-ul &quot;Scena Tinerilor&quot;, un spatiu dedicat elevilor si 
                tinerilor de pana la 21 de ani, unde acestia pot urca pe scena pentru 
                a interpreta in fata publicului si pentru a primi feedback constructiv 
                din partea artistilor invitati.
              </p>

              <p className="text-lg leading-relaxed">
                Un element central al Oradea Music Lab este faptul ca <strong className="text-foreground">nu este un concurs</strong>. 
                Accentul nu cade pe performanta perfecta, ci pe curaj, invatare si evolutie. 
                Greselile sunt acceptate ca parte fireasca a procesului artistic. Atmosfera 
                este una prietenoasa si lipsita de presiune, astfel incat fiecare tanar 
                sa se simta in siguranta atunci cand urca pe scena.
              </p>

              <p className="text-lg leading-relaxed">
                Ceea ce diferentiaza Oradea Music Lab de alte evenimente este modul in 
                care sunt tratati participantii. Fiecare tanar care urca pe scena este 
                considerat o vedeta a serii. Scena, sunetul si atentia publicului sunt 
                gandite astfel incat participantii sa aiba parte de o experienta reala 
                de concert, care sa le creasca increderea in sine si dorinta de a 
                continua drumul in muzica.
              </p>

              <p className="text-lg leading-relaxed">
                Pentru a incuraja participarea si pentru a recompensa curajul, organizam 
                si o tombola cu premii surpriza destinata tinerilor care participa la 
                open mic. De asemenea, fiecare editie este insotita de un moment de 
                socializare, care contribuie la consolidarea comunitatii create in 
                jurul proiectului.
              </p>

              <p className="text-lg leading-relaxed">
                Prin acest format, Oradea Music Lab isi propune sa creeze legaturi 
                intre generatii de muzicieni, sa ofere modele autentice tinerilor si 
                sa contribuie la dezvoltarea unei comunitati muzicale active in Oradea. 
                Proiectul este, in esenta, un spatiu de intalnire intre educatie, 
                experienta si pasiune, in care muzica devine un instrument de dialog 
                si formare personala.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valorile noastre */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
            Valorile noastre
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Heart,
                title: "Curaj",
                description: "Incurajam sa incerci, chiar daca nu esti perfect.",
                emoji: "💪",
              },
              {
                icon: BookOpen,
                title: "Invatare",
                description: "Fiecare experienta este o oportunitate de crestere.",
                emoji: "📚",
              },
              {
                icon: Users,
                title: "Comunitate",
                description: "Impreuna suntem mai puternici.",
                emoji: "🤝",
              },
              {
                icon: HandHeart,
                title: "Respect",
                description: "Tratam pe fiecare cu demnitate si sustinere.",
                emoji: "🙏",
              },
              {
                icon: Music,
                title: "Muzica autentica",
                description: "Expresie personala, nu imitatie.",
                emoji: "🎵",
              },
            ].map((item, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
