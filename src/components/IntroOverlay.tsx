import { useEffect, useRef, useState } from "react";
import logoIntroVideo from "@/assets/intro/logo-intro.mp4";

// Intro/loading animation cu logo-ul, la prima intrare pe site (Faza 15) — specificație din
// HOMEPAGE_REDESIGN_PLAN.md: scurt, skippabil, o singură dată per sesiune de navigare, respectă
// prefers-reduced-motion, nu blochează primul paint al conținutului real din spate (conținutul
// paginii se randează normal dedesubt, overlay-ul doar stă deasupra până dispare/e sărit).
const SESSION_KEY = "oml-intro-shown";

const IntroOverlay = () => {
  // Verificare sincronă la primul render (nu în useEffect) — altfel overlay-ul ar apărea o
  // clipă chiar și la a doua navigare din aceeași sesiune, înainte ca efectul să apuce să ruleze.
  const [visible, setVisible] = useState(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return false;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
      return true;
    } catch {
      // sessionStorage poate arunca în navigare privată foarte restrictivă — mai bine arătăm
      // intro-ul o dată în plus decât să stricăm încărcarea paginii.
      return true;
    }
  });
  const [dismissing, setDismissing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const dismiss = () => {
    if (dismissing) return;
    setDismissing(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignorăm — cel mult reapare la următoarea navigare, nu e grav
    }
    // Lăsăm timp tranziției de fade (vezi duration-500 mai jos) înainte să demontăm complet.
    window.setTimeout(() => setVisible(false), 500);
  };

  useEffect(() => {
    if (!visible) return;
    // Siguranță: dacă videoclipul nu se termină/nu pornește dintr-un motiv oarecare, tot
    // dispare după maximum ~5s — niciodată blocat pe ecran.
    const failSafe = window.setTimeout(dismiss, 5000);
    return () => window.clearTimeout(failSafe);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-hero-bg cursor-pointer transition-opacity duration-500 ${
        dismissing ? "opacity-0" : "opacity-100"
      }`}
      role="button"
      aria-label="Sari peste animația de intro"
    >
      <video
        ref={videoRef}
        src={logoIntroVideo}
        autoPlay
        muted
        playsInline
        onEnded={dismiss}
        className="w-full h-full object-cover"
        aria-hidden="true"
      />
      <span className="absolute bottom-6 right-6 text-white/40 text-xs tracking-wide">
        Apasă pentru a sări peste
      </span>
    </div>
  );
};

export default IntroOverlay;
