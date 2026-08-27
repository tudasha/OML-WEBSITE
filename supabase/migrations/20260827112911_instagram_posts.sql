-- Faza 9 (HOMEPAGE_REDESIGN_PLAN.md): feed Instagram live-sincronizat, nu mai hardcodat în
-- InstagramFeed.tsx. Tabela e populată doar de funcția Edge sync-instagram (service role,
-- ocolește RLS) — clientul (site-ul) doar citește.

CREATE TABLE public.instagram_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  -- ID-ul postării din Instagram Graph API — cheie de upsert, ca sincronizarea repetată să nu
  -- creeze duplicate la fiecare rulare a cron-ului.
  media_id TEXT NOT NULL UNIQUE,
  media_url TEXT NOT NULL,
  permalink TEXT NOT NULL,
  caption TEXT,
  media_type TEXT NOT NULL, -- IMAGE | VIDEO | CAROUSEL_ALBUM (vezi Graph API)
  posted_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Interogările de pe homepage cer mereu cele mai recente N postări.
CREATE INDEX instagram_posts_posted_at_idx ON public.instagram_posts (posted_at DESC);

ALTER TABLE public.instagram_posts ENABLE ROW LEVEL SECURITY;

-- Citire publică — postările sunt oricum publice pe Instagram, se afișează direct pe homepage.
CREATE POLICY "Anyone can view instagram posts"
ON public.instagram_posts
FOR SELECT
TO public
USING (true);

-- Fără politică de INSERT/UPDATE/DELETE pentru public — doar funcția sync-instagram (rulează
-- cu service role key, care ocolește RLS complet) poate scrie.
