// Faza 9 (HOMEPAGE_REDESIGN_PLAN.md): sincronizează ultimele postări Instagram în tabela
// `instagram_posts`, ca InstagramFeed.tsx să nu mai depindă de un array hardcodat de URL-uri.
//
// Rulează pe cron (configurat separat, în dashboard-ul Supabase → Edge Functions → Cron, sau
// prin pg_cron — NU e programat automat doar prin faptul că fișierul există aici).
//
// Secrete necesare (Supabase → Project Settings → Edge Functions → Secrets):
//   INSTAGRAM_ACCESS_TOKEN  — token de acces Instagram Graph API (expiră la 60 de zile,
//                             trebuie regenerat manual la ~50-55 de zile — vezi plan).
//   INSTAGRAM_USER_ID       — ID-ul contului Instagram Business (NU @oradeamusiclab, un număr),
//                             obținut din Graph API Explorer după ce contul e conectat la o
//                             Pagină de Facebook: GET /me/accounts → luați page id → GET
//                             /{page-id}?fields=instagram_business_account.
// SUPABASE_URL și SUPABASE_SERVICE_ROLE_KEY sunt injectate automat de runtime-ul Supabase
// pentru orice Edge Function — nu trebuie setate manual.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const GRAPH_API_VERSION = "v21.0";
const POSTS_TO_FETCH = 12; // păstrăm câteva în plus față de cele 3 afișate pe homepage

interface InstagramMedia {
  id: string;
  media_type: string;
  media_url?: string;
  thumbnail_url?: string; // videoclipurile nu au media_url direct utilizabil ca imagine
  permalink: string;
  caption?: string;
  timestamp: string;
}

Deno.serve(async () => {
  try {
    const accessToken = Deno.env.get("INSTAGRAM_ACCESS_TOKEN");
    const igUserId = Deno.env.get("INSTAGRAM_USER_ID");
    if (!accessToken || !igUserId) {
      throw new Error("Lipsesc INSTAGRAM_ACCESS_TOKEN și/sau INSTAGRAM_USER_ID din secretele funcției.");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${igUserId}/media?fields=${fields}&limit=${POSTS_TO_FETCH}&access_token=${accessToken}`;

    const res = await fetch(url);
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Graph API a răspuns ${res.status}: ${body}`);
    }

    const { data } = (await res.json()) as { data: InstagramMedia[] };

    const rows = data.map((post) => ({
      media_id: post.id,
      // Videoclipurile nu au un media_url afișabil direct ca <img> — folosim thumbnail-ul.
      media_url: post.media_type === "VIDEO" ? post.thumbnail_url ?? post.media_url : post.media_url,
      permalink: post.permalink,
      caption: post.caption ?? null,
      media_type: post.media_type,
      posted_at: post.timestamp,
    }));

    const { error } = await supabase
      .from("instagram_posts")
      .upsert(rows, { onConflict: "media_id" });

    if (error) throw error;

    return new Response(JSON.stringify({ synced: rows.length }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("sync-instagram failed:", err);
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
