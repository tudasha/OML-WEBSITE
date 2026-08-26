import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BLOB_PATH } from "@/lib/blob-shape";

// Card cu icon, refolosit în mai multe locuri de pe homepage care aveau markup aproape
// identic, dar duplicat: "Cum funcționează?" (variant="numbered", cu numărul mare din
// fundal) și "De ce suntem diferiți?" (variant="compact", rând orizontal icon+text).
// `variant` controlează FORMA/layout-ul; `tone` controlează STILUL vizual, independent:
// - tone="solid" (implicit): cardul opac de dinainte, cu icon într-un pătrat rotunjit.
// - tone="flat": stil ilustrație vectorială plată (client a respins explicit glassmorphism —
//   vrea ceva între morfism și Kurzgesagt): card opac, iconul stă într-o formă "blob" flat în
//   loc de pătrat, pentru caracter ilustrativ, nu generic-SaaS. Vezi Faza 4B din
//   HOMEPAGE_REDESIGN_PLAN.md.
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
  /** Doar pentru tone="flat" — rotește forma blob din spatele iconului, ca fiecare card să
   * arate puțin diferit (nu toate iconițele identice). Valoare în grade, ex. index * 47. */
  blobRotate?: number;
}

const IconBlob = ({ icon: Icon, rotate = 0, size = "md" }: { icon: LucideIcon; rotate?: number; size?: "md" | "lg" }) => {
  const box = size === "lg" ? "w-14 h-14" : "w-12 h-12";
  const iconSize = size === "lg" ? "w-7 h-7" : "w-6 h-6";
  return (
    <div className={cn("relative shrink-0", box)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <path
          className="fill-primary/20 group-hover:fill-primary/30 transition-colors"
          d={BLOB_PATH}
          transform={`translate(100 100) rotate(${rotate})`}
        />
      </svg>
      <Icon className={cn("absolute inset-0 m-auto text-primary", iconSize)} />
    </div>
  );
};

const ProcessStepCard = ({
  icon: Icon,
  title,
  description,
  variant = "numbered",
  tone = "solid",
  number,
  blobRotate = 0,
}: ProcessStepCardProps) => {
  const isFlat = tone === "flat";

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "group flex items-start gap-4 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full",
          isFlat ? "bg-white border-2 border-primary/10" : "bg-background"
        )}
      >
        {isFlat ? (
          <IconBlob icon={Icon} rotate={blobRotate} />
        ) : (
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}
        <div>
          <h3 className="font-display font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    );
  }

  if (isFlat) {
    return (
      <div className="group relative overflow-hidden rounded-2xl border-2 border-primary/10 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full p-6 pt-8">
        {number && (
          <div className="absolute top-5 right-4 text-4xl font-display font-bold text-primary/10">
            {number}
          </div>
        )}
        <div className="mb-5">
          <IconBlob icon={Icon} rotate={blobRotate} size="lg" />
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
