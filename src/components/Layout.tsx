import { useReducedMotion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import bgVideo from "@/assets/decor/team-bg.mp4";

interface LayoutProps {
  children: React.ReactNode;
}

// Fundal video generat (Higgsfield/Seedance), acum GLOBAL — pe toate paginile, nu doar pe una
// (feedback client, Faza 15). Redare normală (autoplay + loop), NU legată de scroll — varianta
// scroll-scrubbed (currentTime setat manual la fiecare scroll) era foarte laguită pe scroll
// (feedback client: "nu fa pe scrolat ca e foarte laguit"), așa că am renunțat la ea.
// position:fixed + z-index negativ — rămâne pe fundal, paginile/secțiunile trebuie să fie
// transparente/translucide ca să se vadă.
const Layout = ({ children }: LayoutProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col">
      <video
        src={bgVideo}
        autoPlay={!shouldReduceMotion}
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="fixed inset-0 -z-10 w-full h-full object-cover opacity-50 motion-reduce:hidden"
      />
      <Header />
      {/* FĂRĂ padding-top fix — header-ul e acum o "insulă" plutitoare, transparentă în afara
          cardului ei propriu (vezi Header.tsx), nu o bară opacă ce trebuia "evitată" cu spațiu
          gol dedesubt. Fiecare pagină își extinde propria secțiune de sus (video/poză de fundal)
          până la marginea reală a ecranului (`-mt-24 md:-mt-32`, vezi fiecare Hero) — header-ul
          plutește peste ea, nu mai există o dungă/gap vizibil unde fundalul se "rupe" brusc
          (feedback client: fundalul paginii se întrerupea sub marginea video-ului). */}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
