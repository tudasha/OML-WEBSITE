import { cn } from "@/lib/utils";

// Kicker (text mic, uppercase) + titlu H2 — tiparul repetat în secțiunile de pe homepage.
// Nu impune propriul wrapper/spațiere: fiecare loc de folosire își păstrează div-ul și
// clasele de spațiere pe care le avea deja (kickerClassName/titleClassName acoperă micile
// diferențe, ex. mb-3 pe kicker în unele secțiuni și nu în altele). Vezi Faza 2 din
// HOMEPAGE_REDESIGN_PLAN.md.
interface SectionHeadingProps {
  kicker: string;
  title: string;
  kickerClassName?: string;
  titleClassName?: string;
}

const SectionHeading = ({ kicker, title, kickerClassName, titleClassName }: SectionHeadingProps) => (
  <>
    <span
      className={cn(
        "inline-block text-primary font-medium text-sm uppercase tracking-wider",
        kickerClassName
      )}
    >
      {kicker}
    </span>
    <h2 className={cn("text-3xl md:text-4xl font-display font-bold text-foreground", titleClassName)}>
      {title}
    </h2>
  </>
);

export default SectionHeading;
