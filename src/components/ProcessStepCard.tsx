import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Card cu icon, refolosit în mai multe locuri de pe homepage care aveau markup aproape
// identic, dar duplicat: "Cum funcționează?" (variant="numbered", cu numărul mare din
// fundal) și "De ce suntem diferiți?" (variant="compact", rând orizontal icon+text).
// `variant` controlează FORMA/layout-ul; `tone` controlează STILUL vizual, independent:
// - tone="solid" (implicit): cardul opac de dinainte, neschimbat.
// - tone="glass": stil translucid (fundal alb semi-transparent + blur), pentru secțiunea
//   fluidă/organică din Faza 4B (vezi HOMEPAGE_REDESIGN_PLAN.md) — opacitatea e suficient de
//   mare (bg-white/80) ca să nu scadă contrastul textului sub pragul de accesibilitate.
// ScrollReveal + delay-ul de animație rămân la locul de folosire (în .map()), nu fac parte
// din componentă.
interface ProcessStepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "numbered" | "compact";
  tone?: "solid" | "glass";
  /** Doar pentru variant="numbered" — numărul mare, semi-transparent, din fundal (ex. "01") */
  number?: string;
}

const ProcessStepCard = ({
  icon: Icon,
  title,
  description,
  variant = "numbered",
  tone = "solid",
  number,
}: ProcessStepCardProps) => {
  const isGlass = tone === "glass";

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-start gap-4 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full",
          isGlass ? "bg-white/80 backdrop-blur-md border border-white/60" : "bg-background"
        )}
      >
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    );
  }

  if (isGlass) {
    // Varianta "numbered" cu tone="glass" nu mai folosește <Card> (are fundal opac fix prin
    // token-ul --card) — un div simplu, ca să controlăm transparența direct.
    return (
      <div className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full p-6 pt-8">
        {number && (
          <div className="absolute top-4 right-4 text-4xl font-display font-bold text-primary/10">
            {number}
          </div>
        )}
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-display font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    );
  }

  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
      <CardContent className="p-6 pt-8">
        {number && (
          <div className="absolute top-4 right-4 text-4xl font-display font-bold text-primary/10">
            {number}
          </div>
        )}
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-display font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ProcessStepCard;
