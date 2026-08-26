// Date despre evenimentele Oradea Music Lab — sursă unică de adevăr pentru "următorul
// eveniment", consumată atât de pagina principală (Index.tsx) cât și de pagina de evenimente
// (Event.tsx). Vezi Faza 1 din HOMEPAGE_REDESIGN_PLAN.md — scopul e să elimine duplicarea:
// până acum fiecare pagină avea propriul text hardcodat, care putea să ajungă să difere.
//
// Editarea unui eveniment nou (ex. OML V) se face DOAR aici — vezi Faza 11 din plan.

export interface EventInfo {
  /** Identificator scurt, folosit intern (ex. chei React) */
  id: string;
  /** Cifra romană a ediției, ex. "IV" */
  edition: string;
  /** Titlul complet, oficial, folosit pe pagina de evenimente */
  title: string;
  /** Tema ediției, dacă există (ex. "Freedom 250") */
  theme?: string;
  /** Numele artistului/trupei invitate */
  guestArtist: string;
  /** Data completă, afișabilă (ex. "Sâmbătă, 9 Mai") — folosită pe pagina de evenimente */
  dateDisplay: string;
  /** Data în format ISO (YYYY-MM-DD), pentru calcule (countdown) — dateDisplay e doar text */
  isoDate: string;
  /** Ziua numerică, pentru cardul-badge compact de pe homepage (ex. "9") */
  day: string;
  /** Luna prescurtată, pentru cardul-badge compact de pe homepage (ex. "Mai") */
  month: string;
  /** Locația (ex. "Lokal, Oradea") */
  location: string;
  /** Info extra afișată pe pagina de evenimente (ex. tombolă/pizza) — opțional */
  extras?: string;
  /** Poza posterului evenimentului (cale publică din /public) */
  poster: string;
  posterAlt: string;
  /** Descrierea completă, paragraf cu paragraf — text original, neschimbat față de azi */
  description: string[];
  /** Link CTA principal (ex. înregistrare) */
  registerLink: string;
}

export const nextEvent: EventInfo = {
  id: "oml-iv",
  edition: "IV",
  title: "Oradea Music Lab IV: Freedom 250",
  theme: "Freedom 250",
  guestArtist: "Naty Loves Monday",
  dateDisplay: "Sâmbătă, 9 Mai",
  isoDate: "2026-05-09",
  day: "9",
  month: "Mai",
  location: "Lokal, Oradea",
  extras: "Tombolă cu premii & Pizza din partea casei",
  poster: "/oml_poster-1.png",
  posterAlt: "OML IV - 9 Mai - Lokal Oradea",
  description: [
    "Oradea Music Lab revine cu a patra ediție, consolidându-și rolul de platformă dedicată tinerilor unde educația muzicală întâlnește scena într-un mediu sigur și profesionist. Obiectivul nostru rămâne acela de a oferi un context inspirațional în care tinerii artiști să își poată exprima talentul și să își dezvolte abilitățile interpretative fără presiunea unei competiții.",
    "Această ediție este dedicată temei Freedom 250, marcând aniversarea a 250 de ani de independență a Statelor Unite. Provocarea lansată participanților vizează explorarea repertoriului american, singura condiție fiind ca piesele interpretate să aparțină unor artiști sau trupe din SUA. Indiferent de genul muzical abordat, evenimentul va celebra spiritul libertății și diversitatea culturală prin muzică.",
    "Invitații speciali ai serii, trupa Naty Loves Monday, vor susține un concert live urmat de o sesiune de discuții axată pe experiența lor în industria muzicală. Această componentă educativă pregătește terenul pentru Open Mic-ul Scena Tinerilor, unde tineri muzicieni vor urca sub reflectoare. La Oradea Music Lab, accentul cade pe susținerea comunității și pe depășirea tracului, fiecare participant fiind tratat cu respectul cuvenit unui artist, într-un spațiu care încurajează progresul în locul perfecțiunii imediate.",
    "Evenimentul se va încheia într-o notă relaxată, cu o sesiune de networking și pizza pentru toți cei prezenți, spectatori și artiști deopotrivă. Vă invităm să descoperiți noua generație de muzicieni din Oradea și să susțineți talentele locale la această ediție aniversară!",
  ],
  registerLink: "/inregistrare",
};

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
