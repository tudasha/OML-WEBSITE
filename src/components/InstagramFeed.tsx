import { useEffect } from "react";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

// Postarile Instagram de afisat
const instagramPosts = ["https://www.instagram.com/p/DUD3AQFgtkc/", "https://www.instagram.com/p/DUGe8Etgh_9/", "https://www.instagram.com/p/DTYOpbDDCt0/"];

// Extend Window interface for Instagram
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}
const InstagramFeed = () => {
  const hasNoPosts = instagramPosts.length === 0;
  useEffect(() => {
    // Load Instagram embed script
    const loadInstagramScript = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      } else {
        const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
        if (!existingScript) {
          const script = document.createElement("script");
          script.src = "https://www.instagram.com/embed.js";
          script.async = true;
          script.onload = () => {
            if (window.instgrm) {
              window.instgrm.Embeds.process();
            }
          };
          document.body.appendChild(script);
        }
      }
    };
    if (!hasNoPosts) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(loadInstagramScript, 100);
      return () => clearTimeout(timer);
    }
  }, [hasNoPosts]);
  return <section className="py-16 md:py-24 section-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-3">URMĂRESTE-NE</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Pe Instagram
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Fii la curent cu evenimentele noastre, poze din culise și povești din comunitate.</p>
        </div>

        {hasNoPosts ? <div className="text-center py-12">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Instagram className="w-10 h-10 text-primary" />
            </div>
            <p className="text-muted-foreground mb-6">
              Urmareste-ne pentru ultimele noutati!
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
              <a href="https://www.instagram.com/oradeamusiclab/" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 mr-2" />
                @oradeamusiclab
              </a>
            </Button>
          </div> : <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
              {instagramPosts.map((postUrl, index) => <div key={index} className="flex justify-center">
                  <blockquote className="instagram-media" data-instgrm-captioned data-instgrm-permalink={postUrl} data-instgrm-version="14" style={{
              background: "#FFF",
              border: 0,
              borderRadius: "12px",
              boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
              margin: "1px",
              maxWidth: "540px",
              minWidth: "300px",
              padding: 0,
              width: "100%"
            }} />
                </div>)}
            </div>
            
            <div className="text-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                <a href="https://www.instagram.com/oradeamusiclab/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5 mr-2" />
                  Vezi toate postarile
                </a>
              </Button>
            </div>
          </>}
      </div>
    </section>;
};
export default InstagramFeed;