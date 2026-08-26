# Plan: Pagina principală (Index.tsx) — mai dinamică, mai curată, păstrând conținutul și designul actual

> Context pentru orice agent (Antigravity/Claude/etc.) care lucrează pe acest plan:
> Proiect: Oradea Music Lab (OML), site public la `/home/tudasher/OML/APP/oradea-music-lab`.
> Stack: Vite + React 18 + TypeScript + Tailwind + shadcn-ui + react-router-dom.
> Regulă principală: **nu inventa conținut nou** (statistici, testimoniale, texte, poze/video false
> ale unor evenimente). Orice cifră/afirmație nouă trebuie confirmată de organizatori înainte de a fi
> afișată public. Design-ul (culori, fonturi, tonul secțiunilor) rămâne cel actual — scopul e curățenie
> de cod + UX mai bun, NU un rebrand. Excepție: decor pur abstract (animații de note muzicale, forme
> geometrice/morphing) generat cu Higgsfield e OK — vezi Faza 7 — pentru că nu pretinde a fi conținut
> real/factual despre OML.

## Text nou aprobat — titlul din Hero (excepție de la "nu schimba textele")

Clientul a aprobat explicit înlocuirea titlului principal din secțiunea Hero. Acesta e
singurul text pe care planul îl schimbă intenționat (toate celelalte texte rămân neatinse,
conform regulii de mai jos).

- **Text vechi** (`src/pages/Index.tsx`, secțiunea Hero):
  `Un spațiu sigur unde tinerii își pot exprima talentul` (cu „talentul” evidențiat în
  culoarea primary).
- **Text nou**: `Un spațiu sigur în care fiecare tânăr este o vedetă`
- Păstrează același markup/stil (H1, `font-display font-bold text-white`), doar evidențiază
  cuvântul cheie nou în `text-primary` — recomandat „vedetă” (analog cu cum era evidențiat
  „talentul” înainte), ex:
  ```
  Un spațiu sigur în care fiecare tânăr este{" "}
  <span className="text-primary">o vedetă</span>
  ```
- Verifică că noul text nu se rupe urât pe mobil (e puțin mai lung ca cel vechi) — testează
  la lățimile din Faza 6.

## Starea actuală (verificată în cod, nu presupusă)

- Pagina principală: `src/pages/Index.tsx`, randată prin `src/components/Layout.tsx`
  (`Header.tsx` + `Footer.tsx`).
- Secțiuni existente pe homepage, în ordine:
  1. Hero cu video de fundal (`/hero_1_compressed.mp4`) + CTA-uri
  2. "Ce este Oradea Music Lab?" — text descriptiv
  3. "Cum funcționează?" — 4 carduri (Concert Live, Discuție, Open Mic, Socializare)
  4. "De ce suntem diferiți?" — 6 carduri mici cu iconițe
  5. Preview "Următorul eveniment" — card hardcodat, DUPLICAT parțial cu `Event.tsx`
  6. `InstagramFeed.tsx` — 3 postări Instagram embed, hardcodate manual într-un array
- Design tokens: `tailwind.config.ts` + `src/index.css` (culori HSL prin CSS vars, font
  Poppins pentru text, Space Grotesk pentru titluri, culoare brand `--primary` portocaliu).
- Animații existente: `ScrollReveal.tsx` (IntersectionObserver, fade+translate la scroll),
  `animate-fade-in`, `animate-bounce` din Tailwind config — de reutilizat, nu de reinventat.
- Nu există momentan integrare reală cu Supabase pentru conținut (evenimente, statistici) —
  doar pentru formularul de contact. Orice date "live" propuse mai jos trebuie tratate ca
  date STATICE editabile dintr-un singur fișier, nu ca fetch dintr-o bază de date, decât dacă
  se decide explicit să se adauge un tabel Supabase nou.

## Obiective

1. **Elimină duplicarea**: o singură sursă de adevăr pentru "următorul eveniment", folosită
   și de homepage și de `Event.tsx`.
2. **UI mai curat**: extrage componente reutilizabile pentru tipare repetate (heading de
   secțiune, card de proces, card de feature) — mai puțin cod copy-paste, aspect identic.
3. **Mai dinamic, cu date reale**: countdown live către eveniment, tranziții/hover mai
   fluide, fără conținut inventat.
4. **Accesibilitate + performanță**: alt text, `prefers-reduced-motion`, dimensiuni explicite
   pentru imagini (evită layout shift), poster pentru video.
5. **Zero regresii**: toate rutele, linkurile și textele existente rămân funcționale și
   identice ca informație.

> **Plan deschis**: se vor mai adăuga faze/modificări pe măsură ce discutăm — nu e o listă
> finală. Fiecare fază de mai jos are marcat cine o execută (Antigravity local, sau Claude —
> pentru fazele care au nevoie de Higgsfield, disponibil doar într-o sesiune Claude Code).

## Faze de lucru (execută în ordine, commit separat per fază)

### Faza 0 — Siguranță · *Execută: Antigravity*
- Creează un branch nou (ex: `feature/homepage-refresh`), nu lucra direct pe branch-ul
  principal.
- Rulează `npm run dev` (sau `./start.sh`) și fă capturi de ecran "before" pe desktop + mobil
  (DevTools responsive) pentru comparație vizuală la final.

### Faza 1 — Titlu Hero nou + elimină duplicarea datelor de eveniment · *Execută: Antigravity*
- Actualizează titlul H1 din secțiunea Hero cu textul nou aprobat de client (vezi secțiunea
  „Text nou aprobat — titlul din Hero" de mai sus).
- Creează `src/data/events.ts` cu un tip `EventInfo` și un obiect `nextEvent` care conține
  TOATE datele folosite azi în `Event.tsx` pentru evenimentul curent (titlu, temă, dată,
  locație, imagine poster, descriere completă, artiști invitați).
- `Index.tsx` importă din `src/data/events.ts` pentru cardul de preview — nu mai hardcodează
  un rezumat separat. Rezumatul de pe homepage poate fi primele 1-2 propoziții din descrierea
  completă (derivat, nu re-scris manual).
- `Event.tsx` importă același obiect pentru secțiunea "Următorul eveniment".
- Editările viitoare (schimbarea evenimentului) se fac într-un singur loc.

### Faza 2 — Componente reutilizabile (fără schimbare vizuală) · *Execută: Antigravity*
- `src/components/SectionHeading.tsx`: kicker (text mic uppercase) + titlu H2, cu props
  pentru variantă centrată/stânga — înlocuiește markup-ul repetat din cele 4 secțiuni.
- `src/components/ProcessStepCard.tsx` și refolosește pattern-ul de card cu icon pentru
  "Cum funcționează" și "De ce suntem diferiți" (pot fi aceeași componentă cu variantă
  `numbered` / `compact`).
- Verifică vizual că nu s-a schimbat NIMIC — doar cod mutat, nu markup/clase modificate.

### Faza 3 — Elemente dinamice noi (doar cu date reale/confirmate) · *Execută: Antigravity*
- **Countdown la următorul eveniment**: componentă `EventCountdown.tsx` care calculează
  zile/ore rămase din data din `src/data/events.ts`. Ascunde-o automat dacă data a trecut
  (fallback: mesaj "Urmează în curând" în loc de countdown negativ).
- **Sticky mobile CTA** (opțional): pe scroll în jos, o bară fixă jos pe mobil cu butonul
  "Vezi următorul eveniment" — util pentru conversie, ușor de implementat cu state simplu.
- **NU adăuga** contoare de statistici ("X tineri", "Y evenimente") decât dacă echipa OML
  confirmă cifrele exacte — altfel las-o deoparte, notează în TODO.
- Îmbunătățește video hero: adaugă `poster="/hero-poster.jpg"` (folosește un frame din
  `hero-concert.png` existent dacă nu există alt poster), și respectă
  `prefers-reduced-motion` (oprește autoplay / arată poster static pentru utilizatorii cu
  animații reduse).

### Faza 4 — Curățenie vizuală fină (păstrând designul) · *Execută: Antigravity*
- Uniformizează spațierea verticală între secțiuni dacă există inconsistențe mici (azi:
  `py-20 md:py-28` vs `py-16 md:py-24` — alege un singur ritm, aplică-l consecvent).
- `InstagramFeed`: pe mobil, transformă grid-ul 1-coloană în carousel orizontal cu scroll
  snap (mai puțin scroll vertical, aspect mai "curat" pe telefon). Desktop rămâne grid.
- Adaugă `width`/`height` explicite (sau `aspect-ratio` prin clasă Tailwind, deja folosit în
  galerii) la toate `<img>` fără el, ca să elimini layout shift.

### Faza 5 — Accesibilitate & performanță · *Execută: Antigravity*
- Verifică toate `alt=""` pe imagini din Index.tsx — completează unde lipsesc detalii.
- Verifică contrast text alb pe `bg-primary` (buton) — dacă WCAG AA nu trece, discută cu
  echipa înainte de a schimba culoarea brandului.
- Lighthouse pass (Chrome DevTools) — țintă: Performance ≥ 90, Accessibility ≥ 95 pe mobil.

### Faza 6 — QA finală · *Execută: Antigravity*
- `npm run build` trebuie să treacă fără erori.
- `npm run test` (vitest) — rulează testele existente, nu le rupe.
- Verifică manual toate rutele din `App.tsx` (`/`, `/eveniment`, `/despre`, `/echipa`,
  `/contact`, `/doneaza`, `/inregistrare`) — niciun link din homepage nu trebuie stricat.
- Comparație "before/after" pe desktop + mobil față de capturile din Faza 0: informația
  trebuie să fie identică, doar prezentarea mai curată/fluidă.

### Faza 8 — Homepage: mai puțin text, mai multă imagine/animație · *Execută: Antigravity*

Rafinare a Fazelor 3-4, ca reacție la feedback: pagina să comunice mai mult prin imagine și
mișcare, mai puțin prin bloc de text.

- Identifică paragrafele lungi (>3 propoziții) din secțiunile "Ce este Oradea Music Lab?" și
  "De ce suntem diferiți?" (`Index.tsx`, azi liniile ~66-105) și propune variante scurtate,
  în stil listă/frază-cheie — dar NU le aplica fără aprobare explicită a textului nou (rămâne
  sub regula "nu inventa/rescrie conținut" din capul planului, pentru că scurtarea poate
  schimba sensul).
- Pentru fiecare bloc de text rămas lung, alătură o imagine deja existentă în `src/assets`
  (nu genera una nouă aici — generarea rămâne exclusiv Faza 15/Higgsfield) dacă secțiunea
  respectivă nu are deja una.
- Extinde folosirea `ScrollReveal.tsx` (deja în cod) + `framer-motion` (deja dependință,
  folosit azi în `Team.tsx`) pentru: fade+slide la intrarea în viewport a fiecărei imagini, și
  stagger (apariție eșalonată, nu toate deodată) pe listele de carduri din "Cum funcționează"
  și "De ce suntem diferiți".
- Respectă `prefers-reduced-motion` la fel ca în Faza 3/7 — orice animație nouă de aici se
  dezactivează/simplifică pentru utilizatorii cu mișcare redusă.
- **Animație pe logo** (idee nouă, 2026-08-26): logo-ul din `Header.tsx` (`logo-oml.png`, azi
  un PNG static, folosit pe toate paginile prin `Layout.tsx`) primește o animație subtilă —
  ex. puls ușor la idle, sau o mică reacție la hover (scale/rotate ușor). Se face cu CSS
  (`transform`/`filter`, tranziții), fără nicio dependință nouă — logo-ul rămâne PNG-ul actual,
  doar containerul lui capătă animația. Respectă `prefers-reduced-motion` ca restul fazei.
  **Notă**: o variantă mai elaborată (morphing real de formă, nu doar puls/scale) ar necesita
  vectorizarea logo-ului în SVG și/sau generare Higgsfield — asta trece în Faza 15, nu aici;
  varianta CSS de mai sus e suficientă pentru un prim pas "viu, dar discret".

### Faza 4B — Redesign fluid/organic: „Cum funcționează?" + „De ce suntem diferiți?" · *Execută: Claude (CSS/SVG, fără Higgsfield) — FĂCUT 2026-08-26*

Reacție la feedback: cele două secțiuni (4 carduri + 6 rânduri, una după alta) erau prea
aglomerate. Direcție aleasă de client, dintre mai multe variante cercetate (glassmorphism,
bento grid, forme organice — trenduri 2026 confirmate: [Envato](https://elements.envato.com/learn/web-design-trends),
[Design Deluxe](https://designdeluxe.in/web-design-trends-2026-with-organic-shapes/)):
**secțiune unică, fluidă**, cu fundal organic.

**⚠️ Direcție de stil confirmată explicit de client (2026-08-26), valabilă peste tot pe site,
inclusiv la Faza 14 (redesign complet) și Faza 15/Higgsfield — de reținut pentru orice design
viitor**: **NU glassmorphism**
(fără `backdrop-blur`/transparență de sticlă, nici acum, nici mai târziu). Stilul dorit e ceva
**între morfism (forme organice) și Kurzgesagt (ilustrație vectorială flat)** — culori solide,
opace, margini vectoriale curate, fără blur/ceață. Prima încercare a folosit glassmorphism din
greșeală (interpretare greșită a cererii inițiale de "fluid design") și a fost corectată.

**Ce s-a implementat tehnic (versiunea finală, flat):**
- Cele două `<section>` separate (`Cum funcționează?` + `De ce suntem diferiți?`) au devenit
  UNA singură în `Index.tsx`, pe fundal `bg-background` (alb) — păstrează alternanța macro
  Hero(dark)→cream→alb→hero(dark)→cream, doar cele două secțiuni foste separate s-au unit.
- Fundal organic: 3 forme "blob" SVG flat (`BLOB_PATH`, un singur path reosit de 3 ori cu
  `rotate`/`scale` diferite), umplute cu `fill-primary/5`–`/10` — **opace, fără blur/filter**,
  margini vectoriale curate, nu ceață. Mișcare lentă de 20s (`blob-drift` keyframe în
  `tailwind.config.ts`), aplicată prin `motion-safe:animate-blob-drift` — se dezactivează
  AUTOMAT la `prefers-reduced-motion` (varianta Tailwind `motion-safe:`, fără cod suplimentar).
- `ProcessStepCard.tsx` are un prop nou, **`tone`** (`"solid"` implicit / `"flat"`), independent
  de `variant` (care rămâne despre layout numbered/compact): `tone="flat"` = card complet opac
  (`bg-white`, `border-2 border-primary/10`), cu o bandă de accent portocalie sus (1.5px) —
  fără transparență, fără blur.
- Ambele grupuri de carduri (Cum funcționează + De ce suntem diferiți) folosesc `tone="flat"`.

**Notă importantă**: asta modifică parțial regula "tonul general (dark hero + secțiuni cream
alternante) nu se schimbă" din capul planului — dar e o decizie explicită a clientului din
discuție (2026-08-26), nu o abatere neanunțată. Se aplică DOAR la aceste două secțiuni; restul
paginii (Ce este OML, Preview eveniment, Instagram) rămâne cu alternanța cream/dark neschimbată.

**Paleta**: forma/culorile blob-urilor rămân strict pe portocaliul de brand existent (`primary`,
nuanțe de opacitate) — nu s-au adăugat culori noi. Dacă la Faza 14/15 se dorește un look
Kurzgesagt mai bogat (de obicei 2-3 culori flat complementare), e nevoie de o decizie explicită
separată înainte să se extindă paleta.

**Relația cu Faza 15 (Higgsfield)**: fundalul organic flat de acum e varianta CSS/gratuită a
direcției de stil discutate pentru Faza 15 — la momentul potrivit, Higgsfield poate îmbunătăți/
înlocui blob-urile SVG cu ceva generat, în ACELAȘI loc din cod și în ACELAȘI stil (flat,
opac, fără glassmorphism) — nu se reconstruiește nimic, dar generarea trebuie ghidată explicit
să nu producă glass/blur.

**De verificat la Faza 5 (accesibilitate/performanță), specific pentru asta**: impactul de
performanță al celor 3 forme SVG animate pe mobil de gamă joasă (Lighthouse ≥ 90 e ținta
existentă, trebuie re-verificată după acest add-on, nu presupusă) — contrastul textului nu mai
e un risc ca la glassmorphism, cardurile sunt acum complet opace.

**Iterație 2 (2026-08-26) — refacere layout, nu doar stil**: la cerere client ("poate sunt
variante mai estetice de a expune, refă cum consideri"), pe lângă stilul flat, s-a schimbat și
AȘEZAREA conținutului, ca să nu mai fie doar un grid generic:
- **"Cum funcționează?"** (4 pași, sunt o secvență reală) → layout tip "parcurs": o linie
  punctată orizontală leagă vizual cele 4 carduri (doar desktop, `lg:`; pe mobil rămân stivuite
  simplu, fără linie). Cardurile rămân aceleași (`ProcessStepCard variant="numbered"`), doar
  containerul primește linia conectoare în spate (DOM order, fără z-index — linia se vede doar
  în spațiile dintre carduri, acoperită de ele unde se suprapun).
- **"De ce suntem diferiți?"** (6 puncte, NU sunt o secvență, sunt valori independente) →
  layout tip "bento": primele 2 ("Nu este un concurs", "Ești vedeta serii" — cele mai aproape
  de identitatea de brand) devin `variant="numbered"` + `sm:col-span-2` (mai mari, fără numărul
  mare din fundal, pentru că nu sunt pași), restul de 4 rămân `variant="compact"`, o coloană
  fiecare pe `lg:grid-cols-4`. Ierarhie vizuală reală, nu 6 cutii la aceeași greutate.

### Faza 9 — Instagram feed live-sincronizat, nu mai hardcodat · *Execută: Claude (backend), Antigravity (UI)* · **Decizie luată: Opțiunea B (Graph API + Supabase)**

**Stare azi (verificat în cod)**: `src/components/InstagramFeed.tsx` are un array hardcodat
`instagramPosts` cu 3 URL-uri de postări (linia 6) — orice postare nouă trebuie adăugată manual
în cod și redeploy-uită. Nu există alt mecanism.

**Implementare (Opțiunea B, aleasă de client 2026-08-26 — control total, acceptă mentenanța
tokenului):**

1. **Precondiții cont (de făcut de voi, nu de cod, înainte să înceapă partea de cod)**:
   - Contul `@oradeamusiclab` trebuie să fie Business sau Creator, conectat la o Pagină de
     Facebook — altfel Graph API nu funcționează deloc.
   - Trebuie o **Meta App** înregistrată în [Meta for Developers](https://developers.facebook.com)
     (App ID + App Secret), cu produsul "Instagram Graph API" adăugat — Graph API nu se poate
     folosi fără o aplicație înregistrată acolo. Cel care creează aplicația trebuie să fie
     admin pe Pagina de Facebook conectată.
2. **Tabelă nouă în Supabase**: migrare nouă `instagram_posts` (`id`, `media_url`,
   `permalink`, `caption`, `posted_at`, `media_type`, timestamps) + RLS: citire publică (SELECT)
   permisă, scriere doar din Edge Function (service role), nu din client.
3. **Supabase Edge Function pe cron** (ex. `supabase/functions/sync-instagram/index.ts`,
   programată zilnic sau la fiecare câteva ore): interoghează Instagram Graph API
   (`/me/media` cu token-ul curent), ia ultimele N postări, face upsert în `instagram_posts`.
4. **`InstagramFeed.tsx`** face fetch din Supabase (`supabase.from("instagram_posts").select()
   .order("posted_at", { ascending: false }).limit(3)`) în loc de array-ul hardcodat de azi —
   restul componentei (layout grid, buton "Vezi toate postările", fallback `hasNoPosts`) rămâne
   la fel, doar sursa datelor se schimbă.
5. **Mentenanța token-ului** (recurentă, la infinit — vezi explicația detaliată din
   conversație): token-ul de acces expiră la **60 de zile**. Cineva din echipă trebuie să
   genereze un token nou din contul Instagram Business/Facebook conectat, și să-l actualizeze
   ca secret în Supabase, la fiecare ~50-55 de zile — altfel sincronizarea se oprește silențios
   (feed-ul rămâne „înghețat" la ultimele postări aduse, fără eroare vizibilă pe site).
   **Recomandare**: puneți un reminder recurent în calendarul echipei (ex. la fiecare 45 de
   zile) din prima zi de funcționare, ca să nu se piardă din vedere.

**De confirmat înainte să încep implementarea de cod**:
- Contul Instagram e deja Business/Creator conectat la o Pagină de Facebook? Dacă nu, trebuie
  configurat întâi (pas manual al vostru, în afara codului).
- Cine din echipă își asumă reînnoirea token-ului la fiecare ~50 de zile?

Indiferent de restul detaliilor: păstrează fallback-ul `hasNoPosts` deja existent, pentru cazul
în care tabela Supabase e goală sau fetch-ul eșuează.

### Faza 10 — Repoziționare: asociație, nu eveniment · *Execută: Claude propune textul, Antigravity aplică DUPĂ aprobare*

**Problemă găsită în cod**: `About.tsx` descrie explicit OML ca eveniment, nu ca organizație —
linia cu `Eveniment fondat de <strong>Madi Mihai</strong>` — iar `Index.tsx` (secțiunea "Ce
este OML") spune "Oradea Music Lab este un eveniment bilunar...". Tonul actual pe tot site-ul e
"noi SUNTEM evenimentul", nu "noi SUNTEM asociația care organizează evenimente".

Aceasta e o schimbare de conținut (nu de cod), deci e a doua excepție explicită de la regula
"nu schimba textele" (prima a fost titlul Hero) — se aplică DOAR după ce confirmați formulările
exacte, eu propun variante, nu le aplic direct.

Zone de verificat/rescris (propunere de abordare, nu text final):
- `About.tsx`: "Eveniment fondat de Madi Mihai" → variantă care numește explicit "Asociația
  Oradea Music Lab" ca subiect, iar evenimentele bilunare ca activitatea ei.
- `Index.tsx`, secțiunea "Ce este OML": aceeași corecție — OML organizează evenimente
  bilunare, nu este evenimentul.
- Verifică `Header.tsx`, `Footer.tsx` și `index.html` (title/meta description) pentru aceeași
  confuzie eveniment-vs-asociație.
- Verifică dacă undeva pe site apare deja termenul corect legal ("asociație" cu statut juridic,
  ONG, etc.) — dacă da, refolosește formularea oficială deja aprobată de voi, nu inventa una nouă.

### Faza 11 — Pagina Evenimente: adaugă OML V, elimină eticheta de ediție, max 3 poze/eveniment · *Execută: Antigravity*

Fișier țintă: `src/pages/Event.tsx` (dacă Faza 1 e deja făcută, lucrează prin
`src/data/events.ts` în loc de hardcodare directă în JSX).

- **Adaugă OML V ca "Următorul eveniment"**: titlu "Oradea Music Lab V", dată **12 Septembrie**
  [anul — de confirmat], locație "Lokal, Oradea" — înlocuiește blocul actual "Următorul
  eveniment: OML IV — Freedom 250" (azi liniile 44-103 din `Event.tsx`). Lipsesc încă și
  trebuie confirmate de voi: tema ediției, descrierea completă (3 paragrafe, ca la OML IV),
  artiștii invitați, poster nou (fișier tip `/oml_poster-2.png`) — până atunci las
  placeholder + `TODO` în cod, nu inventez conținut.
- OML IV trece din "Următorul eveniment" în "Edițiile noastre" (istoric), ca secțiune nouă
  după modelul OML III, cu galerie proprie (max 3 poze, regula de mai jos — pozele exacte de
  ales de voi după eveniment).
- **Elimină eticheta de ediție**: span-ul portocaliu uppercase de deasupra titlului fiecărui
  eveniment istoric (ex. azi linia 127: `<span className="text-sm text-primary font-medium
  uppercase tracking-wider">Ediția III</span>`) — se șterge din toate blocurile existente
  (OML I, II, III) și din orice bloc nou (OML IV, viitor OML V). Titlul H3 rămâne singur,
  fără eticheta deasupra.
- **Galerii — maxim 3 poze reale per eveniment, niciodată poza posterului**:
  - OML I are azi 5 poze (`oml1Concert, oml1Discussion, oml1Closeup, oml1Audience,
    oml1Group`) → reduce la 3. Voi alegeți care 3 rămân, eu implementez.
  - OML II are azi 5 poze (`oml2Concert, oml2Team, oml2Group, oml2Discussion,
    oml2Audience`) → la fel, reduce la 3, de ales de voi.
  - OML III are deja exact 3 (`oml3Concert, oml3Discussion, oml3Group`) — rămâne neschimbat.
  - Poza posterului (azi `/oml_poster-1.png`, folosită DOAR în blocul "Următorul eveniment")
    nu intră niciodată în galeriile de istoric — exact ca azi, doar confirmă că regula rămâne
    valabilă și pentru OML IV/V când trec în istoric.
  - Nu șterg fișierele imagine din `src/assets` (rămân disponibile pentru refolosire), doar
    scot referințele din array-urile de galerie afișate.
  - **Adăugat 2026-08-26**: la cererea clientului, scoase și pozele/afișele promoționale de la
    evenimentele trecute (diferite de galeriile foto) — găsit un singur caz, imaginea
    `event-calin-marius.jpg` din blocul OML III (layout cu 2 coloane imagine+text). Restructurat
    OML III să folosească același tipar centrat text-apoi-carduri ca OML I/II (nu mai are
    coloană de imagine separată). Import-ul acum neutilizat a fost eliminat.

### Faza 12 — Elimină poza echipei de voluntari · *Execută: Antigravity*

Fișier: `src/pages/Team.tsx`.

- Elimină cardul "Echipa de Voluntari" din `teamMembers`/grid (azi liniile ~190-200: imaginea
  `voluntariiPhoto` + textele "Voluntari" / "Echipa de Voluntari").
- Elimină și `import voluntariiPhoto from "@/assets/team/voluntarii.jpeg"` (linia 13) — doar
  dacă nu mai e folosit nicăieri altundeva în fișier, altfel rămâne un import neutilizat
  (warning ESLint/TS).
- Nu șterge fișierul imagine din `src/assets/team/` — doar referința din cod.
- Verifică logica de layout bazată pe index din `Team.tsx` (ex. `isCardOnRight = activeIndex
  >= 2`, folosit pentru poziția panoului de hover/click) — nu trebuie să se rupă după ce
  numărul de carduri scade cu unul. Testează manual hover + click pe toate cardurile rămase.

### Faza 13 — Contact: garantează livrarea mesajelor + notificare pe email · *Execută: Claude (backend/Edge Function), Antigravity (`Contact.tsx`)*

**Descoperire critică în cod, de reținut**: `Contact.tsx` (azi liniile 55-61) NU salvează
mesajul nicăieri pe server — face doar `window.open("mailto:oradeamusiclab@gmail.com?...")`,
adică deschide clientul de email AL VIZITATORULUI și așteaptă ca el să apese manual "trimite"
din propriul client. Dacă vizitatorul nu are un client de mail configurat (foarte comun pe
mobil/desktop modern), sau închide fereastra fără să trimită, mesajul NU ajunge niciodată la
voi — fără nicio eroare vizibilă, nici pentru el, nici pentru voi. Practic azi nu aveți nicio
garanție că primiți mesajele din formular.

Complicație suplimentară găsită: tabela Supabase `contact_submissions` EXISTĂ deja (creată prin
migrațiile din `supabase/migrations/`, cu RLS configurat corect pentru insert public), dar
**nu există niciun client Supabase inițializat în frontend** (`@supabase/supabase-js` e listat
în `package.json`, dar nu există niciun fișier gen `src/integrations/supabase/client.ts`, și
`.env`/`.env.example` nu au `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY`). Deci fix-ul nu e doar
"adaugă un insert", e "conectează Supabase în frontend de la zero".

**Fix necesar, în 3 părți:**

1. **Client Supabase în frontend**: creează `src/integrations/supabase/client.ts` cu
   `createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)`;
   adaugă cele două variabile în `.env.example` (placeholder) și în `.env` local + în variabilele
   de mediu de pe Render (altfel build-ul de producție nu are de unde le lua).
2. **Salvare garantată**: `Contact.tsx` face `supabase.from("contact_submissions").insert({
   name, email, message })` ca acțiune PRINCIPALĂ la submit, cu tratare de eroare (toast dacă
   insert-ul eșuează). Mailto poate rămâne ca opțiune secundară ("sau scrie-ne direct pe
   email"), nu ca mecanism principal de livrare.
3. **Notificare pe email**: Supabase Edge Function nouă (ex.
   `supabase/functions/notify-contact/index.ts`) care trimite un email către
   `oradeamusiclab@gmail.com` la fiecare rând nou din `contact_submissions`. Două moduri de
   declanșare, de ales:
   - **Database Webhook pe `INSERT`** (recomandat) — configurat în dashboard-ul Supabase,
     apelează automat funcția; nu depinde de ce face browser-ul vizitatorului după insert.
   - Sau apel direct din `Contact.tsx` după insert-ul reușit — mai simplu de configurat, dar
     dacă vizitatorul închide tab-ul chiar după insert, notificarea poate întârzia (mesajul tot
     rămâne salvat în bază, deci nu se pierde, doar notificarea ar putea lipsi până verificați
     manual dashboard-ul).
   - Funcția are nevoie de un serviciu de trimis email — Resend e cel mai simplu de integrat cu
     Supabase (necesită cont Resend + `RESEND_API_KEY` ca secret Supabase, plus o adresă
     expeditor verificată). **De confirmat cu voi**: aveți deja cont Resend (sau SendGrid/
     Postmark), sau trebuie creat unul nou? Fără asta nu pot finaliza partea de email.

**Test de acceptare la final**: trimite un mesaj de test din formularul public → verifică
rândul nou apărut în `contact_submissions` (Supabase dashboard) → verifică primirea email-ului
la `oradeamusiclab@gmail.com`.

### Faza 14 — Refacere de LAYOUT pe ÎNTREGUL site, compatibil cu tip de site imersiv-scrolabil + curățenie emoji · *Execută: Claude (cod), ULTERIOR*

**Adăugată 2026-08-26, extinsă/clarificată 2026-08-27, la cererea clientului.**

**Graniță explicită între Faza 14 și Faza 15 (stabilită 2026-08-27, de respectat strict)**:
- **Faza 14 = STRUCTURĂ/LAYOUT.** Cum e organizat conținutul pe pagină, ca să funcționeze
  pentru un site imersiv-scrolabil (secvențe verticale pt conținut secvențial, ierarhie
  vizuală reală, fără glassmorphism, contrast corect, mecanica de scroll — paralaxă, linii care
  se desenează — via `framer-motion`, deja dependință). E COD, nu are nevoie de Higgsfield.
- **Faza 15 = ANIMAȚII/DESIGN generate.** Asset-urile vizuale propriu-zise (decor organic,
  intro cu logo, orice altceva generat) via Higgsfield, aplicate DUPĂ ce layout-ul de la Faza 14
  e stabil pe tot site-ul — ca să nu existe risc de neconcordanță sau regenerare irosită.

Scope Faza 14: toate paginile (`Index`, `Event`, `About`, `Team`, `Contact`, `Donate`,
`Register`), nu doar `Index.tsx`. Direcția de stil rămâne cea confirmată la Faza 4B: morfism +
Kurzgesagt flat, fără glassmorphism, contrast ajustabil în aceeași paletă. Layout-ul concret,
per pagină, se decide la execuția fiecărei sub-faze (14.1-14.8) — pt conținut SECVENȚIAL
(pași, cronologie), tiparul e un parcurs vertical cu progres legat de scroll (vezi 14.2,
iterația 3, "Cum funcționează?"); pt conținut PARALEL/independent, ierarhie vizuală (bento) +
reveal simplu, fără să forțăm un tipar secvențial unde nu se potrivește conceptual.

**Curățenie emoji — inventar concret găsit în cod (2026-08-26, de reverificat că e complet la
momentul execuției, poate mai apar altele între timp):**
- `About.tsx` (liniile 133, 139, 145, 151, 157): 💪 📚 🤝 🙏 🎵 — emoji folosite ca "iconițe" în
  loc de icon-uri Lucide (design inconsistent — restul site-ului folosește Lucide peste tot).
- `Team.tsx` (liniile 31, 36): 🤝 și 🍷 în descrierea lui Alessio; ✨️ în descrierea Alexiei —
  parte din textul biografic scris de membri, NU se șterge fără acordul lor (e vocea lor
  personală, diferit de emoji-urile decorative din About.tsx).
- `Register.tsx` (liniile 202, 267): 🎉 (confirmare înregistrare) și ⚠️ (avertisment sub 18 ani)
  — de evaluat individual dacă rămân (⚠️ are rol funcțional de atenționare, nu doar decorativ).

**Regulă de aplicat**: elimină/înlocuiește emoji-urile FOLOSITE CA ICONIȚE DECORATIVE (ex.
`About.tsx`) cu icon-uri Lucide sau cu iconițe flat/blob în stilul Kurzgesagt stabilit — astea
sunt clar înlocuibile fără să atingă vreun conținut. Emoji-urile din TEXTUL SCRIS DE OAMENI
(descrierile din `Team.tsx`) nu se ating fără aprobare explicită a persoanei respective, pentru
că fac parte din vocea ei, nu din design. Emoji-urile cu rol funcțional (`Register.tsx`) se
evaluează caz cu caz, nu se șterg automat doar pentru că "nu se potrivesc".

**Notă**: fiind un scope mult mai mare decât Faza 15 originală, s-a împărțit în sub-faze per
pagină la execuție (2026-08-27), în ordinea de mai jos — Header/Footer întâi, pentru că sunt
comune tuturor paginilor:

- [x] **14.1 — Header + Footer** (FĂCUT): eliminat `backdrop-blur-md` (era oricum inert pe fundal
  opac alb, dar contravenea regulii "fără glassmorphism"); corectat contrastul pe butoanele
  "Donează"/"Contactează-ne" (`text-white` → `text-foreground` pe fundal `bg-primary`, conform
  permisiunii de mai jos — rezolvă găsirea WCAG din Faza 5, ~2.24:1 → ~9.4:1, aceeași paletă);
  header devine "scroll-aware" (umbră + înălțime ușor reduse după scroll, semnal de site viu);
  meniul mobil are acum tranziție slide+fade (nu doar opacity toggle); footer primește un blob
  organic flat decorativ (reosit `BLOB_PATH`) + wordmark-ul "OML" cu accent de culoare pe "M"
  (logo-ul PNG are fundal alb copt în imagine, nu merge pe fundal închis fără o variantă nouă —
  de generat la Faza 15 dacă se dorește logo real în footer, nu text).
  **Completare (2026-08-27), la cererea explicită a clientului — "și meniul să fie
  restructurat"**: navigarea desktop primește un indicator animat (`layoutId` din
  framer-motion) care alunecă fluid între linkuri la schimbarea rutei, nu doar apare/dispare
  instant; cele 2 butoane CTA capătă `hover:scale-105`; meniul mobil a fost rescris de la un
  toggle CSS simplu (opacity/visibility) la `AnimatePresence` + `motion.nav` cu
  `staggerChildren` — linkurile apar eșalonat, nu toate deodată. **Header complet transparent
  peste Hero (tipar comun pe site-uri imersive) rămâne blocat**: logo-ul PNG are fundal alb
  copt în imagine, ar arăta ca un pătrat alb plutind pe fundal închis — necesită o variantă de
  logo nouă (transparentă/pentru fundal închis), notată pentru Faza 15.
- [x] **14.2 — Homepage (`Index.tsx` + `InstagramFeed.tsx`)** (FĂCUT 2026-08-27): găsit și
  reparat glassmorphism real (nu doar contrast) în cardul "Următorul eveniment" —
  `bg-white/5 backdrop-blur` → panou opac flat (`bg-[hsl(240_10%_14%)]`, fără blur); butonul
  ghost "Contactează-ne" din Hero pierde umplerea translucidă `bg-white/10`, rămâne outline
  simplu; corectat contrastul (`text-white` → `text-foreground` pe `bg-primary`) pe toate cele
  5 butoane afectate din `Index.tsx` + `InstagramFeed.tsx`; adăugat un accent organic discret
  (blob flat, opacitate 5%) în secțiunea "Ce este OML", care era doar text plat — fără nicio
  schimbare de cuvinte.
  **Iterație 2 (2026-08-27) — mișcare reală legată de scroll**, ca reacție la feedback că
  panelurile statice nu simt suficient de "dinamic scrolabil": adăugat `framer-motion`
  (`useScroll`/`useTransform`, deja dependință) peste `ScrollReveal.tsx` (care doar apare o
  dată, fade-once, nu e cu adevărat scroll-linked). Concret: cele 3 blob-uri de fundal capătă
  paralaxă (se mișcă la viteze/direcții diferite pe măsură ce scrolezi, pe lângă puls-ul CSS
  ambiental existent, nu în loc de el); linia conectoare din "Cum funcționează" nu mai apare
  gata desenată — se "desenează" (scaleX 0→1) pe măsură ce utilizatorul scrolează prin cei 4
  pași. Ambele efecte se dezactivează la `prefers-reduced-motion` (via hook-ul
  `useReducedMotion` din framer-motion — linia arată completă static, blob-urile nu se mișcă).
  Decizie explicită (2026-08-27): mecanica de scroll e cod (framer-motion), nu are nevoie de
  Higgsfield — Higgsfield rămâne rezervat pt asset-uri vizuale generate, la Faza 15, aplicat
  coerent pe tot site-ul odată ce structura/codul tuturor paginilor e stabil (nu bucată cu
  bucată, ca să nu existe risc de neconcordanță stilistică sau regenerare irosită).
  **Iterație 3 (2026-08-27) — refacere de LAYOUT, nu doar mișcare adăugată peste structura
  veche**: client a cerut explicit ca layout-ul să fie compatibil cu tipul de site imersiv cu
  scroll (nu doar animații puse peste un grid neschimbat). "Cum funcționează?" a trecut din grid
  4 coloane (cu linie orizontală) în **parcurs vertical** (coloană unică, `max-w-2xl mx-auto`) —
  o linie VERTICALĂ (mai natural pt o pagină ce scrolează pe verticală, spre deosebire de linia
  orizontală de dinainte, care era un pic artificială) se umple pe măsură ce cobori
  (`scaleY` legat de scroll), fiecare pas (icon-blob + "PASUL 0N" + titlu + descriere, rând
  orizontal, nu card vertical) capătă opacitate deplină pe rând, decalat, în dreptul liniei care
  avansează (4 `useTransform` fixe, unul per pas — numărul de pași e constant, respectă regulile
  hook-urilor React). `IconBlob` a fost exportat din `ProcessStepCard.tsx` ca să fie refolosit
  direct aici. "De ce suntem diferiți" a rămas neschimbat structural (bento + `ScrollReveal`
  fade-once) — motivul: NU e conținut secvențial (sunt valori independente, paralele), deci
  tiparul "poveste de scroll" nu i se potrivește conceptual, spre deosebire de "Cum funcționează"
  care chiar e o secvență de pași reali.
  **Iterație 4 (2026-08-27) — audit + completare**: clientul a întrebat explicit dacă fazele
  precedente respectau deja principiul de layout imersiv-scrolabil — răspuns onest: NU complet.
  Hero, "Ce este OML" și cardul "Următorul eveniment" primiseră doar reparații de glassmorphism/
  contrast la prima trecere, înainte de clarificarea graniței 14/15, fără mișcare reală legată
  de scroll. Completat acum: Hero capătă paralaxă (video face zoom lent, conținutul se
  estompează + urcă pe măsură ce scrolezi în afara secțiunii, nu dispare brusc); "Ce este OML"
  (text + blob decorativ) trece de la `ScrollReveal` (fade-once) la `motion.div` cu opacitate/
  translate legate de scroll real; cardul "Următorul eveniment" la fel, cu scale+opacity. Header
  NU a primit mișcare suplimentară dincolo de comportamentul scroll-aware din 14.1 — decizie
  deliberată: e chrome persistent (vizibil tot timpul), nu conținut de scroll-through, iar prea
  multă animație acolo ar distrage, nu ar ajuta.
- [x] **14.3 — Pagina Evenimente (`Event.tsx` + `events.ts`)** (FĂCUT 2026-08-27): "Edițiile
  noastre" (IV→III→II→I) erau 4 secțiuni JSX copiate aproape identic, cu alternanță cream/alb
  fără sens real — restructurat complet:
  - OML I/II/III mutate din JSX hardcodat în `pastEvents[]` (ca OML IV deja), cu tip `EventInfo`
    extins: `dateDisplay`/`isoDate`/`day`/`month` acum OPȚIONALE (OML II nu are dată înregistrată
    pe site-ul original — descoperire, nu inventez o dată), `gallery?` (galeria foto, mutată din
    JSX), `highlightTerms?` (override pt cazuri cu nume/casing multiple care nu se potrivesc pe
    tiparul [theme, guestArtist] — ex. OML III are doi artiști invitați, în MAJUSCULE).
  - `EVENT_STRUCTURE` (cele 3 carduri "Concert Live/Discuție/Open Mic") extras o singură dată —
    era literalmente copiat de 4 ori, cuvânt cu cuvânt.
  - Cele 4 ediții randate acum dintr-un singur `.map()`, ca un **parcurs vertical cronologic**:
    linie verticală (doar desktop) care se umple pe măsură ce scrolezi prin istoric, cu un nod
    (cifra ediției, cerc) în dreptul fiecăreia — același tipar ca la "Cum funcționează" de pe
    homepage (14.2), aplicat aici pt că istoricul e la fel de secvențial/cronologic.
  - `EventCountdown.tsx` actualizat să gestioneze `isoDate` opțional (fallback "Urmează în
    curând" în loc de "Invalid Date").
  - Contrast corectat (`text-white` → `text-foreground` pe `bg-primary`) pe linkul de
    înregistrare și pe nodurile cu cifra ediției.
- [x] **14.4 — Despre Noi (`About.tsx`)** (FĂCUT 2026-08-27): pagina era un bloc de text foarte
  lung, fără niciun element vizual — adăugat decor organic + intrare legată de scroll, fără să
  ating niciun cuvânt. "Valorile noastre" foloseau emoji (💪📚🤝🙏🎵) ca iconițe, deși fiecare
  valoare avea deja un icon Lucide importat dar nefolosit — curățenie emoji (parte din scope-ul
  Faza 14) + trecut pe `ProcessStepCard`/`IconBlob`, consecvent cu restul site-ului.
- [x] **14.5 — Echipă (`Team.tsx`)** (FĂCUT 2026-08-27): contrast corectat pe 3 pill-uri de rol
  (moșteneau `text-white` de la părinte). Stagger la intrare pe grid (`whileInView`).
  **Iterație 2 (2026-08-27), la cererea clientului — bio-urile "care în mod normal ar apărea cu
  hover" să devină imersive/scrolabile**: rescris complet modelul de interacțiune. Bio-urile
  erau ascunse până interactionai (hover pe desktop → panou lateral cu poziționare dinamică
  stânga/dreapta; click pe mobil → modal) — logică custom complexă (`hoveredState`,
  `lockedState`, `getPanelPositionClasses`, `getAnimationX`, `AnimatePresence`). Înlocuit cu:
  fiecare membru cu bio (Madi, Alessio, Alexia, Claudiu) devine propria secțiune, cu poza
  **sticky** (același tipar "sticky figure" ca la posterul din `Event.tsx`) cât bio-ul
  scrolează pe lângă ea, alternând stânga/dreapta pe rând, fundal alternant cream/alb. Bio-ul e
  acum vizibil direct, nu ascuns — mai accesibil, nu doar mai "imersiv". Octavian (fără bio) nu
  intră în secvența de scroll — nu are sens fără text de parcurs — rămâne un card compact la
  final. Poze folosite: cele deja existente în `src/assets/team/` — generarea Higgsfield
  propriu-zisă (eventual decor în spatele fiecărei secțiuni) rămâne la Faza 15, conform
  secvențierii deja stabilite, layout-ul e pregătit s-o primească. Cod net mai simplu (bundle
  JS a scăzut, nu a crescut — toată logica de poziționare a panourilor a dispărut).
- [x] **14.6 — Contact (`Contact.tsx`)** (FĂCUT 2026-08-27): contrast corectat pe butonul de
  submit. Formularul și panoul de info intră din direcții opuse (stânga/dreapta).
- [x] **14.7 — Donează (`Donate.tsx`)** (FĂCUT 2026-08-27): contrast corectat pe CTA. Icon-urile
  „De ce să donezi?" (cutii pătrate) → `IconBlob`, consecvent cu restul site-ului. Reveal-ul
  existent (era deja acolo) a primit garda `prefers-reduced-motion` care lipsea.
- [x] **14.8 — Înregistrare (`Register.tsx`)** (FĂCUT 2026-08-27): contrast corectat pe 3
  butoane. Reparate și 2 erori de lint pre-existente găsite pe drum (`catch (err: any)`,
  `let` nereasignat).

**Toate sub-fazele 14.1-14.8 sunt complete (2026-08-27).** Faza 14 (layout imersiv-scrolabil,
pe tot site-ul) e închisă. Rămâne Faza 15 (Higgsfield — asset-uri vizuale generate).

**Completare pe bază de research (2026-08-27)**: la cererea clientului, am căutat structura
reală a site-urilor imersive (nu doar improvizat), surse: [Lovable — Scrolling Design
Patterns](https://lovable.dev/guides/scrolling-designs-patterns-when-to-use),
[UXPin — 4 Types of Scrolling Patterns](https://www.uxpin.com/studio/blog/4-types-creative-website-scrolling-patterns/),
[Scrollytelling.ai — Design Patterns](https://scrollytelling.ai/scrollytelling-design-patterns/).
Tiparele deja aplicate (parcurs vertical cu linie, paralaxă, stagger la intrare) se confirmă ca
fiind corecte/standard. Găsite 2 tipare consacrate care încă lipseau, aplicate acum:
- **Sticky figure** (o imagine rămâne fixă cât timp textul de lângă ea scrolează) — aplicat la
  posterul din "Următorul eveniment" (`Event.tsx`): `md:sticky md:top-24` pe coloana cu
  poster/fallback, `items-center` → `items-start` pe grid (necesar pt ca sticky să aibă spațiu
  de derulat).
- **Indicator de progres al lecturii, sticky** — `About.tsx`, "Povestea OML" (articol lung, 9
  paragrafe): linie verticală sticky (nu doar o linie statică de secțiune, ca la Faza 14.2/14.3)
  care se umple pe măsură ce parcurgi TOT articolul (`useScroll` cu offset `["start start", "end
  end"]`, distinct de progresul de intrare deja existent). Vizibil doar pe ecrane foarte largi
  (`xl:` — nu era loc pe ecrane mai mici fără să se suprapună peste text).
- Nu s-au aplicat: scroll snapping, secțiuni "pinned" full-screen (scroll-jacking) — riscante pe
  mobil/performanță conform aceleiași cercetări, și nu erau cerute explicit.

**Notițe de stil suplimentare de la client (2026-08-26), de urmat la execuție:**
- **Animații la scrolare** cu ajutorul Higgsfield (asset-uri generate reacționează la scroll,
  nu doar decor static) — extensie a `ScrollReveal.tsx` deja existent.
- **Refacere totală a layout-ului**, nu doar a stilului vizual — inclusiv scoaterea a ceea ce
  NU e necesar (conținut/elemente de eliminat, nu doar re-stilizat). De identificat concret la
  momentul execuției, secțiune cu secțiune.
- **Poze noi** — clientul va mai adăuga poze de folosit (nu se generează/inventează, se
  așteaptă predarea lor).
- **Experiență imersivă în stilul Lusion** (lusion.co — animații 3D/WebGL, scroll fluid,
  micro-interacțiuni, tranziții cinematice între secțiuni) — referință de calitate/ambiție
  pentru nivelul de polish, combinată cu direcția deja stabilită (morfism + Kurzgesagt flat, NU
  glassmorphism). De reconciliat la execuție: Lusion e high-end WebGL/3D, Kurzgesagt e flat
  vectorial — ambiția e o experiență la fel de imersivă, dar cu limbajul vizual flat/organic,
  nu neapărat 3D realist.
- **Toate paginile**, INCLUSIV meniul (`Header.tsx`/`Footer.tsx`) — confirmat explicit că
  redesign-ul acoperă și navigarea, nu doar conținutul paginilor.
- **Contrast**: clientul permite explicit ajustarea RELAȚIILOR de contrast (ex. ce culoare de
  text stă pe ce fundal), CU CONDIȚIA să rămână aceeași paletă de culori (portocaliu brand +
  crem + dark, fără culori noi). **Asta rezolvă găsirea din Faza 5**: textul alb pe fundal
  portocaliu (~2.24:1, sub WCAG AA) poate fi corectat la execuție — alternativa deja verificată
  (text cu `--foreground` pe fundal `--primary` → ~9.4:1) rămâne în aceeași paletă, deci e o
  opțiune validă conform acestei permisiuni.

### Faza 15 — Animații/design generate cu Higgsfield, pe tot site-ul · *Execută: Claude (sesiune cu Higgsfield), ULTERIOR — ultima fază*

**Graniță cu Faza 14, vezi mai sus**: Faza 14 = layout/structură (cod, fără Higgsfield); Faza 15
= asset-urile vizuale generate propriu-zise, aplicate DUPĂ ce layout-ul e stabil pe toate
paginile — nu doar homepage, scope-ul s-a extins odată cu Faza 14. Include și specificația
"intro/loading animation cu logo" notată mai jos.

Nu face parte din scope-ul curent — se lucrează abia după ce toate sub-fazele 14.x sunt
terminate și verificate. Antigravity nu are acces la Higgsfield (e disponibil doar într-o
sesiune Claude Code cu acest MCP conectat), deci materialele se generează separat, apoi se
predau ca fișiere gata făcute (imagini/video/SVG) pe care Antigravity le integrează în cod.

Scop: „morfism dinamic" al site-ului prin decor abstract — NU fotografii/video ale unor
evenimente/persoane false. Poze și video-uri reale de la evenimente rămân un subiect separat,
adăugate ulterior de echipă, nu generate.

Idei de decor discutate (de rafinat împreună înainte de generare):
- Animații de note muzicale plutitoare, subtile, în secțiunea Hero sau lângă titluri.
- Forme/paneluri cu morphing (blob-uri animate, tranziții organice între secțiuni) în loc de
  linii drepte între secțiunile cream/dark.
- Elemente mici de decor (accente lângă butoane CTA, separatoare animate între secțiuni).
- **Intro/loading animation cu logo-ul, la prima intrare pe site** (idee client, 2026-08-26):
  overlay fullscreen cu animația logo-ului (ex. vinilul se rotește, notele muzicale zboară și se
  asamblează în wordmark), apoi se dă la o parte și apare site-ul. Cerințe stricte, ca să nu
  strice ce s-a câștigat la Faza 5 (Lighthouse ≥90):
  - **Scurt** (sub ~1-1.5s) și **skippabil** (click/tap oriunde = sare direct).
  - Apare **doar la prima intrare** pe site într-o sesiune de navigare, NU la fiecare schimbare
    de rută (tehnic simplu — SPA, Header/Footer/Layout nu se remontează la navigare internă;
    componenta de intro trăiește o singură dată la nivel de `App.tsx`/root, cu un flag în
    `sessionStorage` ca să nu reapară dacă utilizatorul navighează/reîncarcă în aceeași sesiune).
  - Respectă `prefers-reduced-motion` — sare complet peste intro pentru cei cu mișcare redusă,
    nu doar o simplifică.
  - Fișierul generat (video/animație) optimizat ca greutate, lazy — nu blochează primul paint
    al conținutului real din spate.

Cerințe tehnice de reținut la generare/integrare (ca să nu strice performanța/accesibilitatea
câștigată în Fazele 3 și 5):
- Preferă SVG/CSS animat acolo unde e posibil (fișier mic, control ușor de culoare/opacitate)
  în locul unui video greu, pentru elemente pur decorative.
- Dacă rezultatul e video/imagine animată de la Higgsfield, optimizează greutatea fișierului
  (compresie, format modern) înainte de a-l adăuga în `public/` sau `src/assets/`.
- Respectă `prefers-reduced-motion` — dezactivează sau simplifică animațiile decorative pentru
  utilizatorii care au cerut mișcare redusă.
- Decorul nu trebuie să acopere sau să distragă de la text/CTA-uri (z-index, opacitate scăzută
  unde e cazul).

## Ce NU trebuie schimbat
- Textele existente (misiune, descrierea evenimentelor, structura evenimentului) — pot fi
  REFORMATATE (mutate în componente/date), dar nu reformulate sau prescurtate fără aprobare.
  Singura excepție aprobată e titlul Hero, descris mai sus.
- Paleta de culori, fonturile, tonul general (dark hero + secțiuni cream alternante).
- Structura de navigare (Header/Footer) — nu face parte din acest plan (poate fi un plan
  separat dacă se dorește).

## Fișiere principale implicate
- `src/pages/Index.tsx` (ținta principală, Fazele 0-8, 10)
- `src/pages/Event.tsx` (Faza 1 — sursă unică de date; Faza 11 — OML V, elimină etichete
  ediție, galerii max 3 poze)
- `src/pages/Team.tsx` (Faza 12 — elimină poza echipei de voluntari)
- `src/pages/About.tsx` (Faza 10 — repoziționare asociație vs. eveniment)
- `src/pages/Contact.tsx` (Faza 13 — salvare + notificare mesaje)
- `src/data/events.ts` (nou, Faza 1)
- `src/components/SectionHeading.tsx` (nou, Faza 2)
- `src/components/ProcessStepCard.tsx` (nou, Faza 2)
- `src/components/EventCountdown.tsx` (nou, Faza 3)
- `src/components/InstagramFeed.tsx` (Faza 4 — carousel mobil; Faza 9 — sincronizare live)
- `src/integrations/supabase/client.ts` (nou, Faza 13 — nu există azi deloc)
- `supabase/functions/notify-contact/index.ts` (nou, Faza 13)
- `.env.example` / `.env` / variabile Render (Faza 13 — `VITE_SUPABASE_URL`,
  `VITE_SUPABASE_ANON_KEY`)
- `src/index.css` / `tailwind.config.ts` — doar de citit, nu de modificat decât dacă apare o
  nevoie clară de token nou (documentează motivul dacă se întâmplă)
