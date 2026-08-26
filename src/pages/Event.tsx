import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Mic, Music, MessageCircle, Gift, Pizza, Users, Heart, CalendarX, ImageIcon } from "lucide-react";
import Layout from "@/components/Layout";
import { nextEvent, pastEvents, type EventInfo } from "@/data/events";
import heroConcert from "@/assets/hero-concert.png";
import oml1Concert from "@/assets/oml1-concert.jpg";
import oml1Discussion from "@/assets/oml1-discussion.jpg";
import oml1Group from "@/assets/oml1-group.jpg";
import oml2Concert from "@/assets/oml2-concert.jpg";
import oml2Group from "@/assets/oml2-group.jpg";
import oml2Discussion from "@/assets/oml2-discussion.jpg";
import oml3Concert from "@/assets/oml3-concert.jpg";
import oml3Discussion from "@/assets/oml3-discussion.jpg";
import oml3Group from "@/assets/oml3-group.jpg";

// Îngroașă automat tema și numele artistului invitat oriunde apar în descriere —
// echivalentul <strong> hardcodat de dinainte de Faza 1, dar derivat din date, nu repetat manual.
// Calculat per-eveniment (nu o singură dată global), pentru că acum sunt afișate mai multe
// evenimente pe pagină (nextEvent + pastEvents), fiecare cu propria temă/artist invitat.
function getHighlightTerms(event: EventInfo) {
  return [event.theme, event.guestArtist].filter(Boolean) as string[];
}

function renderWithHighlights(text: string, terms: string[]) {
  if (terms.length === 0) return text;
  const pattern = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).map((part, i) =>
    terms.includes(part) ? (
      <strong key={i} className="text-foreground">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

const Event = () => {
  // Deocamdată doar OML IV a trecut în istoric (Faza 11) — array-ul e gata pentru viitoare
  // ediții încheiate, fără să presupună azi că există mai mult de una.
  const [omlIV] = pastEvents;

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
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                Următorul eveniment
              </h2>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary">
                {nextEvent.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                {nextEvent.poster ? (
                  <img
                    src={nextEvent.poster}
                    alt={nextEvent.posterAlt}
                    className="rounded-2xl shadow-2xl w-full"
                  />
                ) : (
                  <div className="rounded-2xl border-2 border-dashed border-primary/20 bg-primary/5 aspect-[3/4] flex flex-col items-center justify-center gap-3 text-center p-8">
                    <ImageIcon className="w-10 h-10 text-primary/40" />
                    <p className="text-muted-foreground text-sm">Posterul ediției urmează să fie publicat</p>
                  </div>
                )}
              </div>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                {nextEvent.description.map((paragraph, i) => (
                  <p key={i}>{renderWithHighlights(paragraph, getHighlightTerms(nextEvent))}</p>
                ))}

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm pt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary shrink-0" />
                    <span>{nextEvent.dateDisplay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span>{nextEvent.location}</span>
                  </div>
                  {nextEvent.extras && (
                    <div className="flex items-center gap-2 col-span-2">
                      <Gift className="w-4 h-4 text-primary shrink-0" />
                      <span>{nextEvent.extras}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <Link to={nextEvent.registerLink} className="inline-flex w-full justify-center items-center bg-primary text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg">
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

      {/* OML IV */}
      <section className="py-12 md:py-16 section-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-2">
                {omlIV.title}
              </h3>
              <p className="text-muted-foreground mt-2">{omlIV.dateDisplay} · {omlIV.location}</p>
            </div>

            <div className="max-w-3xl mx-auto mb-10 space-y-4 text-muted-foreground text-lg leading-relaxed">
              {omlIV.description.map((paragraph, i) => (
                <p key={i}>{renderWithHighlights(paragraph, getHighlightTerms(omlIV))}</p>
              ))}
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

            {/* Photo Gallery — nu există încă poze reale de la această ediție, nu inventăm */}
            <div className="flex flex-col items-center justify-center gap-2 py-10 border-2 border-dashed border-border rounded-xl text-center">
              <ImageIcon className="w-6 h-6 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">Pozele de la această ediție urmează să fie adăugate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4">
        <div className="border-t border-border" />
      </div>

      {/* OML III */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-2">
                OML III — Călin Pop & Marius Pop
              </h3>
              <p className="text-muted-foreground mt-2">7 Februarie 2026 · Lokal, Oradea</p>
            </div>

            <div className="max-w-3xl mx-auto mb-10 space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Ne bucurăm să îi avem ca invitați speciali pe <strong className="text-foreground">CĂLIN POP</strong> și{" "}
                <strong className="text-foreground">MARIUS POP</strong>! Duo-ul tată-fiu din formația Celelalte Cuvinte
                ne-a încântat cu un concert live, urmat de o discuție și sesiune de Q&A despre industria muzicală.
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

            {/* Photo Gallery — max 3 poze per eveniment (Faza 11) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { src: oml2Concert, alt: "OML II - Concert live" },
                { src: oml2Discussion, alt: "OML II - Discuție pe scenă" },
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

            {/* Photo Gallery — max 3 poze per eveniment (Faza 11) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { src: oml1Concert, alt: "OML I - Concert live" },
                { src: oml1Discussion, alt: "OML I - Discuție pe scenă" },
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
