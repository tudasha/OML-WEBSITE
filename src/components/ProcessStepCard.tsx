import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Card cu icon, refolosit în două locuri de pe homepage care aveau markup aproape identic,
// dar duplicat: "Cum funcționează?" (variant="numbered", cu numărul mare din fundal) și
// "De ce suntem diferiți?" (variant="compact", rând orizontal icon+text). Vezi Faza 2 din
// HOMEPAGE_REDESIGN_PLAN.md. ScrollReveal + delay-ul de animație rămân la locul de folosire
// (în .map()), nu fac parte din componentă.
interface ProcessStepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "numbered" | "compact";
  /** Doar pentru variant="numbered" — numărul mare, semi-transparent, din fundal (ex. "01") */
  number?: string;
}

const ProcessStepCard = ({ icon: Icon, title, description, variant = "numbered", number }: ProcessStepCardProps) => {
  if (variant === "compact") {
    return (
      <div className="flex items-start gap-4 p-5 bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow h-full">
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
