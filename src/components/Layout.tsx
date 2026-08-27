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
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
