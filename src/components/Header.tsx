import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoOml from "@/assets/logo-oml.png";

const navLinks = [
  { name: "Acasă", path: "/" },
  { name: "Următorul Eveniment", path: "/eveniment" },
  { name: "Despre Noi", path: "/despre" },
  { name: "Echipă", path: "/echipa" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logoOml} 
              alt="Oradea Music Lab" 
              className="h-12 md:h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://www.instagram.com/oradeamusiclab/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <a href="https://donate.stripe.com/4gMdR2esj3js2SD8BO6oo00" target="_blank" rel="noopener noreferrer">
                Donează
              </a>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white">
              <Link to="/contact">Contactează-ne</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Închide meniul" : "Deschide meniul"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-white backdrop-blur-md border-b border-border shadow-lg transition-all duration-300",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                location.pathname === link.path
                  ? "text-primary bg-primary/10"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-4 pt-4 mt-2 border-t border-border">
            <a
              href="https://www.instagram.com/oradeamusiclab/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-2"
            >
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
            </a>
            <a
              href="https://donate.stripe.com/4gMdR2esj3js2SD8BO6oo00"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Donează
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
