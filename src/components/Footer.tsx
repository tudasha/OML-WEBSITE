import { Link } from "react-router-dom";
import { Instagram, Mail, Heart } from "lucide-react";
import { BLOB_PATH } from "@/lib/blob-shape";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-hero-bg text-white overflow-hidden">
      {/* Decor organic flat, consistent cu restul site-ului (Faza 4B/14) — fără blur/glass */}
      <svg viewBox="0 0 200 200" className="absolute -bottom-24 -right-16 w-80 h-80 pointer-events-none motion-safe:animate-blob-drift" aria-hidden="true">
        <path className="fill-primary/10" d={BLOB_PATH} transform="translate(100 100) rotate(60)" />
      </svg>

      <div className="container mx-auto px-4 py-12 md:py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-3xl font-display font-bold text-white">
                O<span className="text-primary">M</span>L
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Un spațiu sigur unde tinerii își pot exprima talentele muzicale, învățând din 
              greșeli și din sfaturile celor cu experiență.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/oradeamusiclab/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="mailto:oradeamusiclab@gmail.com"
                className="text-white/60 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Navigare</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-white/70 hover:text-primary transition-colors text-sm">
                Acasă
              </Link>
              <Link to="/eveniment" className="text-white/70 hover:text-primary transition-colors text-sm">
                Următorul Eveniment
              </Link>
              <Link to="/despre" className="text-white/70 hover:text-primary transition-colors text-sm">
                Despre Noi
              </Link>
              <Link to="/echipa" className="text-white/70 hover:text-primary transition-colors text-sm">
                Echipa
              </Link>
              <Link to="/contact" className="text-white/70 hover:text-primary transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <a 
                href="mailto:oradeamusiclab@gmail.com"
                className="text-white/70 hover:text-primary transition-colors block"
              >
                oradeamusiclab@gmail.com
              </a>
              <a 
                href="https://www.instagram.com/oradeamusiclab/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-primary transition-colors block"
              >
                @oradeamusiclab
              </a>
              <p className="text-white/50">
                Oradea, România
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© {currentYear} Oradea Music Lab. Toate drepturile rezervate.</p>
          <p className="flex items-center gap-1">
            Făcut cu <Heart className="w-4 h-4 text-primary fill-primary" /> de tineri pentru tineri
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
