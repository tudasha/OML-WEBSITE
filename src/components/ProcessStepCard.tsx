import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Card cu icon, refolosit în mai multe locuri de pe homepage care aveau markup aproape
// identic, dar duplicat: "Cum funcționează?" (variant="numbered", cu numărul mare din
// fundal) și "De ce suntem diferiți?" (variant="compact", rând orizontal icon+text).
// `variant` controlează FORMA/layout-ul; `tone` controlează STILUL vizual, independent:
// - tone="solid" (implicit): cardul opac de dinainte, neschimbat.
// - tone="flat": stil ilustrație vectorială plată (opac, fără blur/transparență — client a
//   respins explicit glassmorphism, vrea ceva între morfism și stil Kurzgesagt), cu un accent
//   colorat subțire sus, pentru secțiunea fluidă/organică din Faza 4B (vezi
//   HOMEPAGE_REDESIGN_PLAN.md).
// ScrollReveal + delay-ul de animație rămân la locul de folosire (în .map()), nu fac parte
// din componentă.
interface ProcessStepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "numbered" | "compact";
  tone?: "solid" | "flat";
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
  const isFlat = tone === "flat";

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-start gap-4 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full",
          isFlat ? "bg-white border-2 border-primary/10" : "bg-background"
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

  if (isFlat) {
    // Varianta "numbered" cu tone="flat" nu mai folosește <Card> (are fundal fix prin
    // token-ul --card) — un div simplu, opac, cu o bandă de accent sus (motiv flat/ilustrativ).
    return (
      <div className="group relative overflow-hidden rounded-2xl border-2 border-primary/10 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full p-6 pt-8">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />
        {number && (
          <div className="absolute top-5 right-4 text-4xl font-display font-bold text-primary/10">
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
