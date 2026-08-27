import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, Mic, Music, MessageCircle, Gift, ImageIcon } from "lucide-react";
import Layout from "@/components/Layout";
import { nextEvent, pastEvents, type EventInfo } from "@/data/events";
import heroConcert from "@/assets/hero-concert.png";

// Îngroașă automat tema și numele artistului invitat oriunde apar în descriere —
// echivalentul <strong> hardcodat de dinainte de Faza 1, dar derivat din date, nu repetat manual.
// Calculat per-eveniment (nu o singură dată global), pentru că acum sunt afișate mai multe
// evenimente pe pagină (nextEvent + pastEvents), fiecare cu propria temă/artist invitat.
// event.highlightTerms are prioritate dacă e prezent (cazuri cu casing/nume multiple, ex. OML III).
function getHighlightTerms(event: EventInfo) {
  return event.highlightTerms ?? ([event.theme, event.guestArtist].filter(Boolean) as string[]);
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

// Structura evenimentului e identică la fiecare ediție — extras o singură dată (era repetat
// de 4 ori, cuvânt cu cuvânt, în versiunea dinaintea Faza 14.3).
const EVENT_STRUCTURE = [
  { icon: Music, title: "Concert Live", time: "Prima parte" },
  { icon: MessageCircle, title: "Discuție & Q&A", time: "A doua parte" },
  { icon: Mic, title: "Open Mic", time: "A treia parte" },
];

const Event = () => {
  const historyRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress: historyProgress } = useScroll({
    target: historyRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineProgress = useTransform(historyProgress, [0, 1], [0, 1]);

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

      {/* Next Event — fără section-cream (era opac); tot conținutul stă pe propriul card
          de lizibilitate, ca fundalul global (Layout.tsx) să se vadă clar în jur. */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white/90 rounded-3xl p-6 md:p-10 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                Următorul eveniment
              </h2>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-primary">
                {nextEvent.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Posterul rămâne fixat (sticky) cât timp descrierea din dreapta scrolează pe
                  lângă el — tipar "sticky figure", clasic în scrollytelling. */}
              <div className="md:sticky md:top-24">
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
                  <Link to={nextEvent.registerLink} className="inline-flex w-full justify-center items-center bg-primary text-foreground py-3 px-6 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg">
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

      {/* Past Events Header — fără bg-background (era opac). */}
      <section className="pt-16 md:pt-20 pb-8">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-white/90 rounded-2xl px-6 py-4 md:px-8 md:py-5">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20 mb-4">
              Istoric
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Edițiile noastre
            </h2>
          </div>
        </div>
      </section>

      {/* Edițiile noastre — parcurs vertical cronologic (Faza 14.3), nu 4 secțiuni copiate.
          Linia din stânga (doar desktop) se umple pe măsură ce scrolezi prin istoric, cu un
          nod (cifra ediției) în dreptul fiecărei ediții. Fără fundal opac de secțiune (era
          bg-background) — fiecare ediție își primește propriul card de lizibilitate mai jos,
          ca fundalul global să rămână vizibil între ele. */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div ref={historyRef} className="relative max-w-3xl mx-auto">
            <div className="hidden md:block absolute left-6 top-2 bottom-2 w-0.5">
              <div className="absolute inset-0 bg-primary/10 rounded-full" />
              <motion.div
                className="absolute inset-x-0 top-0 bg-primary rounded-full origin-top h-full"
                style={{ scaleY: shouldReduceMotion ? 1 : lineProgress }}
              />
            </div>

            <div className="space-y-16 md:space-y-20">
              {pastEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`relative md:pl-20 ${index > 0 ? "pt-16 md:pt-20 border-t border-border" : ""}`}
                >
                  <div className="hidden md:flex absolute left-0 top-16 w-12 h-12 rounded-full bg-primary text-foreground items-center justify-center font-display font-bold shadow-lg z-10">
                    {event.edition}
                  </div>

                  {/* Card de lizibilitate pt titlu + descriere + structura evenimentului — fundalul
                      global se vede clar în jurul lui (secțiunea de mai sus nu mai e opacă). */}
                  <div className="bg-white/90 rounded-2xl p-6 md:p-8 shadow-lg mb-10">
                    <div className="text-center md:text-left mb-8 md:mb-10">
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                        {event.title}
                      </h3>
                      {(event.dateDisplay || event.location) && (
                        <p className="text-muted-foreground mt-2">
                          {[event.dateDisplay, event.location].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </div>

                    <div className="mb-10 space-y-4 text-muted-foreground text-lg leading-relaxed text-center md:text-left">
                      {event.description.map((paragraph, i) => (
                        <p key={i}>{renderWithHighlights(paragraph, getHighlightTerms(event))}</p>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {EVENT_STRUCTURE.map((item, i) => (
                        <div key={i} className="bg-muted/50 rounded-xl p-4 text-center">
                          <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                          <p className="text-sm font-medium text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {event.gallery && event.gallery.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {event.gallery.map((img, i) => (
                        <img
                          key={i}
                          src={img.src}
                          alt={img.alt}
                          className="aspect-square object-cover rounded-xl w-full"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 py-10 border-2 border-dashed border-border rounded-xl text-center">
                      <ImageIcon className="w-6 h-6 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">Pozele de la această ediție urmează să fie adăugate.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Event;
