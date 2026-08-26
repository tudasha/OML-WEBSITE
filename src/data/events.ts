// Date despre evenimentele Oradea Music Lab — sursă unică de adevăr pentru "următorul
// eveniment" ȘI pentru istoricul edițiilor încheiate, consumată de Index.tsx și Event.tsx.
// Vezi Faza 1 din HOMEPAGE_REDESIGN_PLAN.md — scopul e să elimine duplicarea: până acum fiecare
// pagină avea propriul text hardcodat, care putea să ajungă să difere.
//
// Editarea unui eveniment (viitor sau trecut) se face DOAR aici — vezi Faza 11/14.3 din plan.

import oml1Concert from "@/assets/oml1-concert.jpg";
import oml1Discussion from "@/assets/oml1-discussion.jpg";
import oml1Group from "@/assets/oml1-group.jpg";
import oml2Concert from "@/assets/oml2-concert.jpg";
import oml2Discussion from "@/assets/oml2-discussion.jpg";
import oml2Group from "@/assets/oml2-group.jpg";
import oml3Concert from "@/assets/oml3-concert.jpg";
import oml3Discussion from "@/assets/oml3-discussion.jpg";
import oml3Group from "@/assets/oml3-group.jpg";

export interface EventInfo {
  /** Identificator scurt, folosit intern (ex. chei React) */
  id: string;
  /** Cifra romană a ediției, ex. "IV" */
  edition: string;
  /** Titlul complet, oficial, folosit pe pagina de evenimente */
  title: string;
  /** Tema ediției, dacă există (ex. "Freedom 250") — opțional, poate fi neconfirmată încă */
  theme?: string;
  /** Numele artistului/trupei invitate — opțional, poate fi neconfirmat încă */
  guestArtist?: string;
  /** Override pt termenii îngroșați automat în descriere, când [theme, guestArtist] nu
   * acoperă cazul (ex. doi artiști invitați separați, cu casing specific) — vezi OML III. */
  highlightTerms?: string[];
  /** Data completă, afișabilă (ex. "Sâmbătă, 9 Mai") — folosită pe pagina de evenimente.
   * Opțional — unele ediții din istoric nu au data înregistrată (ex. OML II). */
  dateDisplay?: string;
  /** Data în format ISO (YYYY-MM-DD), pentru calcule (countdown) — opțional, nu toate
   * edițiile din istoric au nevoie/au o dată ISO cunoscută. */
  isoDate?: string;
  /** Ziua numerică, pentru cardul-badge compact de pe homepage (ex. "9") — opțional */
  day?: string;
  /** Luna prescurtată, pentru cardul-badge compact de pe homepage (ex. "Mai") — opțional */
  month?: string;
  /** Locația (ex. "Lokal, Oradea") */
  location: string;
  /** Info extra afișată pe pagina de evenimente (ex. tombolă/pizza) — opțional */
  extras?: string;
  /** Poza posterului evenimentului (cale publică din /public) — opțional, poate lipsi până
   * când echipa îl produce; componentele care îl afișează trebuie să aibă un fallback vizual. */
  poster?: string;
  posterAlt?: string;
  /** Descrierea completă, paragraf cu paragraf — text original, neschimbat. Dacă tema/lineup-ul
   * nu sunt încă confirmate, conține un singur paragraf-notiță onestă ("detalii în curând"),
   * NU conținut inventat despre eveniment. */
  description: string[];
  /** Galerie foto (max 3, Faza 11) — opțional; lipsă = nu există încă poze reale, nu se
   * afișează imagini inventate. */
  gallery?: { src: string; alt: string }[];
  /** Link CTA principal (ex. înregistrare) */
  registerLink: string;
}

/**
 * Formatează o dată ISO (YYYY-MM-DD) în stilul folosit pe site ("Sâmbătă, 9 Mai") — calculat,
 * nu scris de mână, ca să nu poată ajunge vreodată să difere de ziua reală a săptămânii.
 */
export function formatEventDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const weekday = capitalize(new Intl.DateTimeFormat("ro-RO", { weekday: "long" }).format(date));
  const month = capitalize(new Intl.DateTimeFormat("ro-RO", { month: "long" }).format(date));
  return `${weekday}, ${date.getDate()} ${month}`;
}

// Următorul eveniment confirmat: OML V, 12 Septembrie 2026, Lokal — dată și locație date de
// client (2026-08-26). Tema, artistul invitat, descrierea completă și posterul NU sunt încă
// confirmate — rămân opționale/placeholder onest, nu se inventează. Vezi Faza 11.
export const nextEvent: EventInfo = {
  id: "oml-v",
  edition: "V",
  title: "Oradea Music Lab V",
  dateDisplay: formatEventDate("2026-09-12"),
  isoDate: "2026-09-12",
  day: "12",
  month: "Septembrie",
  location: "Lokal, Oradea",
  description: [
    "Detaliile complete despre această ediție (tema serii, artiștii invitați, programul) urmează să fie confirmate de echipă — reveniți în curând pentru actualizări!",
  ],
  registerLink: "/inregistrare",
};

// Ediții încheiate, cele mai recente primele — afișate în "Edițiile noastre" pe pagina de
// evenimente ca parcurs cronologic unic (Faza 14.3), nu ca 4 blocuri JSX copiate separat.
export const pastEvents: EventInfo[] = [
  {
    id: "oml-iv",
    edition: "IV",
    title: "Oradea Music Lab IV: Freedom 250",
    theme: "Freedom 250",
    guestArtist: "Naty Loves Monday",
    dateDisplay: "Sâmbătă, 9 Mai",
    isoDate: "2026-05-09",
    location: "Lokal, Oradea",
    extras: "Tombolă cu premii & Pizza din partea casei",
    description: [
      "Oradea Music Lab revine cu a patra ediție, consolidându-și rolul de platformă dedicată tinerilor unde educația muzicală întâlnește scena într-un mediu sigur și profesionist. Obiectivul nostru rămâne acela de a oferi un context inspirațional în care tinerii artiști să își poată exprima talentul și să își dezvolte abilitățile interpretative fără presiunea unei competiții.",
      "Această ediție este dedicată temei Freedom 250, marcând aniversarea a 250 de ani de independență a Statelor Unite. Provocarea lansată participanților vizează explorarea repertoriului american, singura condiție fiind ca piesele interpretate să aparțină unor artiști sau trupe din SUA. Indiferent de genul muzical abordat, evenimentul va celebra spiritul libertății și diversitatea culturală prin muzică.",
      "Invitații speciali ai serii, trupa Naty Loves Monday, vor susține un concert live urmat de o sesiune de discuții axată pe experiența lor în industria muzicală. Această componentă educativă pregătește terenul pentru Open Mic-ul Scena Tinerilor, unde tineri muzicieni vor urca sub reflectoare. La Oradea Music Lab, accentul cade pe susținerea comunității și pe depășirea tracului, fiecare participant fiind tratat cu respectul cuvenit unui artist, într-un spațiu care încurajează progresul în locul perfecțiunii imediate.",
      "Evenimentul se va încheia într-o notă relaxată, cu o sesiune de networking și pizza pentru toți cei prezenți, spectatori și artiști deopotrivă. Vă invităm să descoperiți noua generație de muzicieni din Oradea și să susțineți talentele locale la această ediție aniversară!",
    ],
    // Fără gallery — nu există încă poze reale de la această ediție (Faza 11).
    registerLink: "/inregistrare",
  },
  {
    id: "oml-iii",
    edition: "III",
    title: "OML III — Călin Pop & Marius Pop",
    highlightTerms: ["CĂLIN POP", "MARIUS POP"],
    dateDisplay: "7 Februarie 2026",
    location: "Lokal, Oradea",
    description: [
      "Ne bucurăm să îi avem ca invitați speciali pe CĂLIN POP și MARIUS POP! Duo-ul tată-fiu din formația Celelalte Cuvinte ne-a încântat cu un concert live, urmat de o discuție și sesiune de Q&A despre industria muzicală.",
    ],
    gallery: [
      { src: oml3Concert, alt: "OML III - Concert live" },
      { src: oml3Discussion, alt: "OML III - Discuție pe scenă" },
      { src: oml3Group, alt: "OML III - Foto de grup" },
    ],
    registerLink: "/inregistrare",
  },
  {
    id: "oml-ii",
    edition: "II",
    title: "OML II",
    guestArtist: "Narcisa Badea",
    highlightTerms: ["Narcisa Badea", "Petruț Remus (Trupa X)", "STEFXN"],
    // Data acestei ediții nu a fost înregistrată pe site-ul original — dateDisplay rămâne
    // absent (nu inventăm o dată), doar locația e cunoscută.
    location: "Oradea",
    description: [
      "Cea de-a doua ediție Oradea Music Lab a reconfirmat succesul acestui spațiu dedicat curajului și învățării, oferind tinerilor artiști o experiență autentică de scenă, fără presiunea unei competiții. Invitații speciali, Narcisa Badea, Petruț Remus (Trupa X) și STEFXN, au creat o atmosferă vibrantă printr-un concert live, urmat de o discuție deschisă în care și-au împărtășit experiențele acumulate la emisiuni precum Vocea României.",
      "Momentul central al serii, Open Mic-ul „Scena Tinerilor\", a adus în lumina reflectoarelor 10 tineri talentați care au beneficiat de susținerea întregii comunități. Evenimentul a pus accent pe evoluție și depășirea tracului, premiind curajul participanților printr-o tombolă specială. Seara s-a încheiat într-un spirit de celebrare și socializare, unde toți cei prezenți s-au bucurat de pizza oferită de partenerii de la Enigma, consolidând astfel legăturile în cadrul noii familii muzicale orădene.",
    ],
    gallery: [
      { src: oml2Concert, alt: "OML II - Concert live" },
      { src: oml2Discussion, alt: "OML II - Discuție pe scenă" },
      { src: oml2Group, alt: "OML II - Foto de grup" },
    ],
    registerLink: "/inregistrare",
  },
  {
    id: "oml-i",
    edition: "I",
    title: "OML I — Frații Jdieri",
    guestArtist: "Frații Jdieri",
    dateDisplay: "17 Octombrie 2025",
    isoDate: "2025-10-17",
    location: "Lokal, Oradea",
    description: [
      "Pe 17 octombrie 2025, la Lokal Oradea, a avut loc prima ediție Oradea Music Lab, un eveniment vibrant care a marcat nașterea unei noi comunități pentru tinerii artiști locali. Invitații speciali, Frații Jdieri, au oferit un concert memorabil de Transylvanian Jdier Rock și au împărtășit lecții prețioase din parcursul lor artistic într-o sesiune deschisă de Q&A.",
      "Punctul culminant a fost secțiunea Open Mic „Scena Tinerilor\", unde liceeni și studenți de până la 21 de ani au urcat pe scenă pentru a-și demonstra talentul și pentru a primi feedback direct de la artiștii invitați. Seara s-a încheiat într-o atmosferă plină de entuziasm, cu o tombolă cu premii și surprize pentru toți cei care au ales să susțină debutul acestui proiect dedicat muzicii.",
    ],
    gallery: [
      { src: oml1Concert, alt: "OML I - Concert live" },
      { src: oml1Discussion, alt: "OML I - Discuție pe scenă" },
      { src: oml1Group, alt: "OML I - Foto de grup" },
    ],
    registerLink: "/inregistrare",
  },
];

/**
 * Derivă un rezumat scurt din descrierea completă, luând primele `sentenceCount` propoziții
 * din primul paragraf — text original, doar trunchiat, NU rescris manual (regula din Faza 1).
 * Folosit pe homepage (Index.tsx), ca să nu mai existe un rezumat separat scris de mână.
 */
export function getEventSummary(event: EventInfo, sentenceCount = 2): string {
  const firstParagraph = event.description[0] ?? "";
  const sentences = firstParagraph.match(/[^.!?]+[.!?]+/g) ?? [firstParagraph];
  return sentences.slice(0, sentenceCount).join(" ").trim();
}
