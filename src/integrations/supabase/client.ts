import { createClient } from "@supabase/supabase-js";

// Faza 9 (HOMEPAGE_REDESIGN_PLAN.md): primul loc din site unde chiar folosim Supabase din
// client — `@supabase/supabase-js` era deja dependență, dar neconectată nicăieri până acum.
// Cheia "anon" e sigură de expus în frontend (e proiectată pentru asta) — accesul real e
// controlat prin RLS pe fiecare tabelă (vezi migrația `instagram_posts`), nu prin secretul
// cheii. Cheia SERVICE ROLE nu apare niciodată aici — doar în funcția Edge sync-instagram.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Nu aruncăm — componentele care folosesc acest client (ex. InstagramFeed) trebuie să eșueze
  // grațios (fallback vizual), nu să pice tot site-ul dacă lipsesc variabilele de mediu.
  console.warn(
    "VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY lipsesc — funcționalitățile care depind de Supabase (ex. feed-ul Instagram live) nu vor funcționa."
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
