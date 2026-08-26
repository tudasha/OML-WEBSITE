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
  (nu genera una nouă aici — generarea rămâne exclusiv Faza 14/Higgsfield) dacă secțiunea
  respectivă nu are deja una.
- Extinde folosirea `ScrollReveal.tsx` (deja în cod) + `framer-motion` (deja dependință,
  folosit azi în `Team.tsx`) pentru: fade+slide la intrarea în viewport a fiecărei imagini, și
  stagger (apariție eșalonată, nu toate deodată) pe listele de carduri din "Cum funcționează"
  și "De ce suntem diferiți".
- Respectă `prefers-reduced-motion` la fel ca în Faza 3/7 — orice animație nouă de aici se
  dezactivează/simplifică pentru utilizatorii cu mișcare redusă.

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

### Faza 14 — Animații decorative cu Higgsfield · *Execută: Claude (sesiune cu Higgsfield), ULTERIOR — ultima fază*

**Nu face parte din scope-ul curent — se lucrează abia după ce Fazele 0-6 sunt terminate și
verificate.** Antigravity nu are acces la Higgsfield (e disponibil doar într-o sesiune Claude
Code cu acest MCP conectat), deci materialele se generează separat, apoi se predau ca fișiere
gata făcute (imagini/video/SVG) pe care Antigravity le integrează în cod.

Scop: „morfism dinamic" al site-ului prin decor abstract — NU fotografii/video ale unor
evenimente/persoane false. Poze și video-uri reale de la evenimente rămân un subiect separat,
adăugate ulterior de echipă, nu generate.

Idei de decor discutate (de rafinat împreună înainte de generare):
- Animații de note muzicale plutitoare, subtile, în secțiunea Hero sau lângă titluri.
- Forme/paneluri cu morphing (blob-uri animate, tranziții organice între secțiuni) în loc de
  linii drepte între secțiunile cream/dark.
- Elemente mici de decor (accente lângă butoane CTA, separatoare animate între secțiuni).

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
