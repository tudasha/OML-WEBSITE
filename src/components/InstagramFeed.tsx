import { useEffect, useState } from "react";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

// Faza 9 (HOMEPAGE_REDESIGN_PLAN.md): postările nu mai sunt un array hardcodat de URL-uri —
// vin din tabela `instagram_posts` din Supabase, populată periodic de funcția Edge
// sync-instagram din Instagram Graph API (vezi supabase/functions/sync-instagram). Renunțat și
// la widget-ul oficial `embed.js` al Instagram (iframe cu stilul lui propriu, imprevizibil) —
// acum avem direct `media_url` din Graph API, deci randăm <img> normale, cu același stil de
// card ca restul site-ului (rotunjit, hover), nu mai depindem de un script extern încărcat
// runtime.
interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string | null;
}

const POSTS_TO_SHOW = 3;

const InstagramFeed = () => {
  // null = încă se încarcă, [] = încărcat, dar gol (tabelă goală / fetch eșuat) — fallback-ul
  // cu link către profil rămâne pentru cazul ăsta, ca înainte.
  const [posts, setPosts] = useState<InstagramPost[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("instagram_posts")
      .select("id, media_url, permalink, caption")
      .order("posted_at", { ascending: false })
      .limit(POSTS_TO_SHOW)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("Nu am putut încărca postările Instagram:", error.message);
          setPosts([]);
          return;
        }
        setPosts(data ?? []);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const isLoading = posts === null;
  const hasNoPosts = !isLoading && posts.length === 0;

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Fără fundal opac de secțiune — fundalul ambiental global se vede clar prin ea, DAR
            tot conținutul stă într-un singur card (bg-white/90 rounded-3xl), ca să se simtă
            separată de panelurile din jur (feedback client). */}
        <div className="max-w-5xl mx-auto bg-white/90 rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="text-center mb-10">
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-3">URMĂRESTE-NE</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Pe Instagram
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Fii la curent cu evenimentele noastre, poze din culise și povești din comunitate.</p>
          </div>

          {hasNoPosts ? (
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Instagram className="w-10 h-10 text-primary" />
              </div>
              <p className="text-muted-foreground mb-6">
                Urmareste-ne pentru ultimele noutati!
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-foreground font-semibold">
                <a href="https://www.instagram.com/oradeamusiclab/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5 mr-2" />
                  @oradeamusiclab
                </a>
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {posts === null
                  ? // Schelet simplu (3 pătrate care pulsează) cât se încarcă — nu apare
                    // fallback-ul de "fără postări" pentru o clipă, înainte să știm sigur.
                    Array.from({ length: POSTS_TO_SHOW }).map((_, i) => (
                      <div key={i} className="aspect-square rounded-xl bg-muted animate-pulse" />
                    ))
                  : posts.map((post) => (
                      <a
                        key={post.id}
                        href={post.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <img
                          src={post.media_url}
                          alt={post.caption ? post.caption.slice(0, 140) : "Postare Instagram Oradea Music Lab"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </a>
                    ))}
              </div>

              <div className="text-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-foreground font-semibold">
                  <a href="https://www.instagram.com/oradeamusiclab/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5 mr-2" />
                    Vezi toate postarile
                  </a>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default InstagramFeed;
