import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Event from "./pages/Event";
import About from "./pages/About";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import IntroOverlay from "./components/IntroOverlay";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Montat o singură dată la rădăcină (nu în Layout, care se remontează la fiecare
          navigare) — apare o singură dată per sesiune de navigare, vezi IntroOverlay.tsx. */}
      <IntroOverlay />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/eveniment" element={<Event />} />
          <Route path="/despre" element={<About />} />
          <Route path="/echipa" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doneaza" element={<Donate />} />
          <Route path="/inregistrare" element={<Register />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
