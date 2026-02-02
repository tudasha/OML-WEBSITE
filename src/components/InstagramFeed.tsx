import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

// IMPORTANT: Adauga link-urile postarilor Instagram aici
// Exemplu: "https://www.instagram.com/p/ABC123/"
const instagramPosts = [
  // Adauga linkurile tale aici:
  // "https://www.instagram.com/p/LINK1/",
  // "https://www.instagram.com/p/LINK2/",
  // "https://www.instagram.com/p/LINK3/",
];

const InstagramFeed = () => {
  const hasNoPosts = instagramPosts.length === 0;

  return (
    <section className="py-16 md:py-24 section-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-3">
            Urmareste-ne
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Pe Instagram
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Fii la curent cu evenimentele noastre, poze din culise si povesti din comunitate.
          </p>
        </div>

        {hasNoPosts ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Instagram className="w-10 h-10 text-primary" />
            </div>
            <p className="text-muted-foreground mb-6">
              Urmareste-ne pentru ultimele noutati!
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
              <a
                href="https://www.instagram.com/oradeamusiclab/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5 mr-2" />
                @oradeamusiclab
              </a>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
              {instagramPosts.map((postUrl, index) => (
                <div key={index} className="flex justify-center">
                  <blockquote
                    className="instagram-media"
                    data-instgrm-captioned
                    data-instgrm-permalink={postUrl}
                    data-instgrm-version="14"
                    style={{
                      background: "#FFF",
                      border: 0,
                      borderRadius: "12px",
                      boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
                      margin: "1px",
                      maxWidth: "540px",
                      minWidth: "300px",
                      padding: 0,
                      width: "100%",
                    }}
                  />
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                <a
                  href="https://www.instagram.com/oradeamusiclab/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-5 h-5 mr-2" />
                  Vezi toate postarile
                </a>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default InstagramFeed;
