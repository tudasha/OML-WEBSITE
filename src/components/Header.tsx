import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoOml from "@/assets/logo-oml.png";

const navLinks = [
  { name: "Acasă", path: "/" },
  { name: "Evenimente", path: "/eveniment" },
  { name: "Despre Noi", path: "/despre" },
  { name: "Echipă", path: "/echipa" },
  { name: "Contact", path: "/contact" },
];

// Notă (Faza 14.1 → completare): header-ul complet transparent peste Hero (tipar comun pe
// site-uri imersive) NU e posibil încă — logo-ul PNG are fundal alb "copt" în imagine, ar
// arăta ca un pătrat alb plutind pe orice fundal închis. Rămâne pentru Faza 15, când se
// generează o variantă de logo pentru fundal închis/transparent.

// Header "insulă" plutitoare — Faza 15: redesenat ca să fie în armonie cu restul site-ului,
// care de la trecerea la fundalul ambiental global (vezi Layout.tsx) e dominat de carduri
// opace, rotunjite (`bg-white/90-95 rounded-2xl/3xl shadow-lg`), plutind peste animație, nu
// mai de o bară albă edge-to-edge lipită de marginea ecranului (stil generic de SaaS, ieșea
// din ton cu restul). Aceeași geometrie de card ca peste tot altundeva — nu o formă nouă
// (ex. pastilă/rounded-full) ca să nu introducă un al doilea limbaj vizual.
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Header devine mai "prezent" (umbră mai vizibilă, puțin mai compact) după ce se scrolează —
  // un semnal mic de "site viu", nu doar o bară statică (Faza 14).
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-3 md:top-4 inset-x-3 md:inset-x-6 lg:inset-x-10 z-50">
      <div
        className={cn(
          "mx-auto max-w-6xl bg-white/95 rounded-2xl border border-primary/10 shadow-md transition-shadow duration-300 overflow-hidden",
          isScrolled ? "shadow-xl" : "shadow-md"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-4 md:px-6 transition-[height] duration-300",
            isScrolled ? "h-14 md:h-16" : "h-16 md:h-20"
          )}
        >
          {/* Logo — puls subtil la idle + reacție la hover (Faza 8). Hover-ul e pe <Link>
              (element diferit de <img>), ca cele două animații de transform să nu se calce
              una pe alta pe același element. */}
          <Link to="/" className="flex items-center transition-transform duration-300 hover:scale-105">
            <img
              src={logoOml}
              alt="Oradea Music Lab"
              className="h-10 md:h-12 w-auto motion-safe:animate-logo-pulse"
            />
          </Link>

          {/* Desktop Navigation — indicator animat (layoutId) care alunecă între linkuri, nu
              doar apare/dispare instant (Faza 14, meniu). */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-primary/10 rounded-lg"
                      transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={cn("relative z-10", isActive ? "text-primary" : "text-foreground/70 hover:text-foreground")}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
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
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-foreground transition-transform hover:scale-105"
            >
              <Link to="/doneaza">
                Donează
              </Link>
            </Button>
            {/* text-foreground, nu text-white: alb pe portocaliu pică WCAG AA (~2.24:1) —
                text-foreground pe același fundal dă ~9.4:1, aceeași paletă (Faza 14). */}
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-foreground font-semibold transition-transform hover:scale-105"
            >
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

        {/* Mobile Menu — se deschide ÎN INTERIORUL aceluiași card rotunjit (nu mai e un panou
            separat, lipit edge-to-edge sub header) — linkurile apar eșalonat (stagger), nu toate
            deodată (Faza 14, meniu). */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
              className="lg:hidden border-t border-border overflow-hidden"
            >
              <motion.nav
                className="px-4 py-4 flex flex-col gap-2"
                initial="closed"
                animate="open"
                variants={{ open: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.05 } } }}
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.path}
                    variants={{
                      closed: { opacity: 0, x: shouldReduceMotion ? 0 : -12 },
                      open: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                        location.pathname === link.path
                          ? "text-primary bg-primary/10"
                          : "text-foreground/70 hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  variants={{
                    closed: { opacity: 0, x: shouldReduceMotion ? 0 : -12 },
                    open: { opacity: 1, x: 0 },
                  }}
                  className="flex items-center gap-4 pt-4 mt-2 border-t border-border"
                >
                  <a
                    href="https://www.instagram.com/oradeamusiclab/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>Instagram</span>
                  </a>
                  <Link
                    to="/doneaza"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Donează
                  </Link>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
