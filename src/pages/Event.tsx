import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Mic, Music, MessageCircle, Gift, Pizza, Users, Heart, CalendarX, ImageIcon } from "lucide-react";
import Layout from "@/components/Layout";
import heroConcert from "@/assets/hero-concert.png";
import eventArtists from "@/assets/event-calin-marius.jpg";
import oml1Concert from "@/assets/oml1-concert.jpg";
import oml1Discussion from "@/assets/oml1-discussion.jpg";
import oml1Closeup from "@/assets/oml1-closeup.jpg";
import oml1Audience from "@/assets/oml1-audience.jpg";
import oml1Group from "@/assets/oml1-group.jpg";
import oml2Concert from "@/assets/oml2-concert.jpg";
import oml2Team from "@/assets/oml2-team.jpg";
import oml2Group from "@/assets/oml2-group.jpg";
import oml2Discussion from "@/assets/oml2-discussion.jpg";
import oml2Audience from "@/assets/oml2-audience.jpg";
import sunetPentruJasmine from "@/assets/sunet-pentru-jasmine.png";
import oml3Concert from "@/assets/oml3-concert.jpg";
import oml3Discussion from "@/assets/oml3-discussion.jpg";
import oml3Group from "@/assets/oml3-group.jpg";

const Event = () => {
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Evenimente
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Toate edițiile Oradea Music Lab — concerte, open mic și conexiuni autentice.
          </p>
        </div>
      </section>

      {/* Next Event */}
      <section className="py-16 md:py-20 section-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                Următorul eveniment
              </h2>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary">
                OML IV
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
              <div className="md:col-span-3">
                <img
                  src="/oml_poster-1.png"
                  alt="OML IV - 9 Mai - Lokal Oradea"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
              <div className="md:col-span-2 space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Oradea Music Lab este un proiect dedicat tinerilor pasionați de muzică, ce își propune să îmbine educația muzicală și crearea unui spațiu sigur, susținător și inspirațional, unde aceștia să își poată exprima talentele muzicale.
                </p>
                <p>
                  Ne bucurăm să îi avem de data aceasta ca invitați speciali pe <strong className="text-foreground">Naty Loves Monday!</strong> 🎶 O trupă cu energie și personalitate aparte, gata să ne încânte cu un concert live și să ne împărtășească din experiența lor în industria muzicală. Mai departe, vom continua evenimentul cu o discuție live alături de ei, completată de o sesiune de întrebări și răspunsuri cu publicul. Aceasta este partea educațională a evenimentului, unde tinerii sunt încurajați să pună întrebări și să își dezvolte cunoștințele despre scenă.
                </p>
                <p>
                  Partea mult așteptată a serii este Open Mic-ul „Scena Tinerilor", unde 10 tineri/trupe vor urca pe scenă să își exprime talentele muzicale. 🎤 Ceea ce diferențiază Oradea Music Lab de orice alt eveniment este trecerea cu vederea a greșelilor. Nu este o competiție, ci mai degrabă un loc care să te pregătească pentru a fi un muzician adevărat, un loc plin de oameni prietenoși care te vor susține. Aici, fiecare tânăr ce pășește pe scenă este o vedetă și trebuie tratat ca atare, pentru a crea condiții optime pentru dezvoltare.
                </p>
                <p>
                  Știm că nu este ușor să îți învingi frica de scenă, de aceea organizăm o tombolă cu premii surpriză pentru a răsplăti tinerii pentru curajul de care au dat dovadă. Și, pentru a sărbători încă un Lab reușit, vă așteptăm cu pizza bună, italiană, pentru toți cei prezenți! 🍕
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm pt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary shrink-0" />
                    <span>Sâmbătă, 9 Mai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span>Lokal, Oradea</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <Gift className="w-4 h-4 text-primary shrink-0" />
                    <span>Tombolă cu premii & Pizza din partea casei</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link to="/register" className="inline-flex w-full justify-center items-center bg-primary text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg">
                    Înregistrează-te acum
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4">
        <div className="border-t border-border" />
      </div>

      {/* Past Events Header */}
      <section className="pt-16 md:pt-20 pb-8 bg-background">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 mb-4">
            Istoric
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Edițiile noastre
          </h2>
        </div>
      </section>

      {/* OML III */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">Ediția III</span>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-2">
                OML III — Călin Pop & Marius Pop
              </h3>
              <p className="text-muted-foreground mt-2">7 Februarie 2026 · Lokal, Oradea</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
              {/* Image */}
              <div>
                <img
                  src={eventArtists}
                  alt="Călin Pop și Marius Pop - Celelalte Cuvinte"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>

              {/* Text */}
              <div className="space-y-6">
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Ne bucurăm să îi avem ca invitați speciali pe <strong className="text-foreground">CĂLIN POP</strong> și{" "}
                    <strong className="text-foreground">MARIUS POP</strong>! Duo-ul tată-fiu din formația Celelalte Cuvinte
                    ne-a încântat cu un concert live, urmat de o discuție și sesiune de Q&A despre industria muzicală.
                  </p>
                </div>

                {/* Structure cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { icon: Music, title: "Concert Live", time: "Prima parte" },
                    { icon: MessageCircle, title: "Discuție & Q&A", time: "A doua parte" },
                    { icon: Mic, title: "Open Mic", time: "A treia parte" },
                  ].map((item, i) => (
                    <div key={i} className="bg-muted/50 rounded-xl p-4 text-center">
                      <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* OML III Photo Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { src: oml3Concert, alt: "OML III - Concert live" },
                { src: oml3Discussion, alt: "OML III - Discuție pe scenă" },
                { src: oml3Group, alt: "OML III - Foto de grup" },
              ].map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  className="aspect-square object-cover rounded-xl w-full"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4">
        <div className="border-t border-border" />
      </div>

      {/* OML II */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">Ediția II</span>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-2">
                OML II
              </h3>
              <p className="text-muted-foreground mt-2">Oradea</p>
            </div>

            <div className="max-w-3xl mx-auto mb-10 space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Cea de-a doua ediție Oradea Music Lab a reconfirmat succesul acestui spațiu dedicat curajului și învățării, oferind tinerilor artiști o experiență autentică de scenă, fără presiunea unei competiții. Invitații speciali, <strong className="text-foreground">Narcisa Badea</strong>, <strong className="text-foreground">Petruț Remus (Trupa X)</strong> și <strong className="text-foreground">STEFXN</strong>, au creat o atmosferă vibrantă printr-un concert live, urmat de o discuție deschisă în care și-au împărtășit experiențele acumulate la emisiuni precum Vocea României.
              </p>
              <p>
                Momentul central al serii, Open Mic-ul „Scena Tinerilor", a adus în lumina reflectoarelor 10 tineri talentați care au beneficiat de susținerea întregii comunități. Evenimentul a pus accent pe evoluție și depășirea tracului, premiind curajul participanților printr-o tombolă specială. Seara s-a încheiat într-un spirit de celebrare și socializare, unde toți cei prezenți s-au bucurat de pizza oferită de partenerii de la Enigma, consolidând astfel legăturile în cadrul noii familii muzicale orădene.
              </p>
            </div>

            {/* Structure cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
              {[
                { icon: Music, title: "Concert Live", time: "Prima parte" },
                { icon: MessageCircle, title: "Discuție & Q&A", time: "A doua parte" },
                { icon: Mic, title: "Open Mic", time: "A treia parte" },
              ].map((item, i) => (
                <div key={i} className="bg-muted/50 rounded-xl p-4 text-center">
                  <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              ))}
            </div>

            {/* Photo Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { src: oml2Concert, alt: "OML II - Concert live" },
                { src: oml2Discussion, alt: "OML II - Discuție pe scenă" },
                { src: oml2Audience, alt: "OML II - Publicul" },
                { src: oml2Team, alt: "OML II - Echipa pe scenă" },
                { src: oml2Group, alt: "OML II - Foto de grup" },
              ].map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  className="aspect-square object-cover rounded-xl w-full"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4">
        <div className="border-t border-border" />
      </div>

      {/* OML I */}
      <section className="py-12 md:py-16 section-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">Ediția I</span>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-2">
                OML I — Frații Jdieri
              </h3>
              <p className="text-muted-foreground mt-2">17 Octombrie 2025 · Lokal, Oradea</p>
            </div>

            <div className="max-w-3xl mx-auto mb-10 space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Pe 17 octombrie 2025, la Lokal Oradea, a avut loc prima ediție Oradea Music Lab, un eveniment vibrant care a marcat nașterea unei noi comunități pentru tinerii artiști locali. Invitații speciali, <strong className="text-foreground">Frații Jdieri</strong>, au oferit un concert memorabil de Transylvanian Jdier Rock și au împărtășit lecții prețioase din parcursul lor artistic într-o sesiune deschisă de Q&A.
              </p>
              <p>
                Punctul culminant a fost secțiunea Open Mic „Scena Tinerilor", unde liceeni și studenți de până la 21 de ani au urcat pe scenă pentru a-și demonstra talentul și pentru a primi feedback direct de la artiștii invitați. Seara s-a încheiat într-o atmosferă plină de entuziasm, cu o tombolă cu premii și surprize pentru toți cei care au ales să susțină debutul acestui proiect dedicat muzicii.
              </p>
            </div>

            {/* Structure cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
              {[
                { icon: Music, title: "Concert Live", time: "Prima parte" },
                { icon: MessageCircle, title: "Discuție & Q&A", time: "A doua parte" },
                { icon: Mic, title: "Open Mic", time: "A treia parte" },
              ].map((item, i) => (
                <div key={i} className="bg-muted/50 rounded-xl p-4 text-center">
                  <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              ))}
            </div>

            {/* Photo Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { src: oml1Concert, alt: "OML I - Concert live" },
                { src: oml1Discussion, alt: "OML I - Discuție pe scenă" },
                { src: oml1Closeup, alt: "OML I - Momente de pe scenă" },
                { src: oml1Audience, alt: "OML I - Publicul" },
                { src: oml1Group, alt: "OML I - Foto de grup" },
              ].map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  className="aspect-square object-cover rounded-xl w-full"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Event;
